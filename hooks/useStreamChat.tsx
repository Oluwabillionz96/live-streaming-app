// hooks/useStreamChat.ts
import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase-client";
import { RealtimeChannel } from "@supabase/supabase-js";
import { StreamMessage } from "@/lib/types";
import { getStreamMessages } from "@/lib/utils";

export const useStreamChat = (streamId: string) => {
  const [messages, setMessages] = useState<StreamMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const isInitialLoadRef = useRef(true);

  // Load initial messages using your existing function
  useEffect(() => {
    if (!streamId || !isInitialLoadRef.current) return;
    isInitialLoadRef.current = false;

    const loadMessages = async () => {
      try {
        setIsLoading(true);
        const data = await getStreamMessages(streamId);
        setMessages(data);
        setError(null);
      } catch (err) {
        console.error("Error loading messages:", err);
        setError("Failed to load messages");
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [streamId]);

  // Subscribe to new messages
  useEffect(() => {
    if (!streamId) return;

    // Create a channel for chat messages
    const channel = supabase.channel(`chat_${streamId}`, {
      config: {
        broadcast: { self: false }, // Don't send to self
      },
    });

    // Listen for new messages via broadcast
    channel.on(
      "broadcast",
      { event: "new-message" },
      (payload: { payload: StreamMessage }) => {
        const newMessage = payload.payload;
        // Only add if we don't already have this message
        setMessages((prev) => {
          if (prev.some((msg) => msg.id === newMessage.id)) return prev;
          return [...prev, newMessage];
        });
      }
    );

    // Also listen to PostgreSQL changes as backup
    channel.on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `stream_id=eq.${streamId}`,
      },
      async (payload) => {
        try {
          // Fetch the full message with profile data using your function
          const allMessages = await getStreamMessages(streamId);
          setMessages(allMessages);
        } catch (err) {
          console.error("Error fetching new message:", err);
        }
      }
    );

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        console.log("Connected to chat channel for stream:", streamId);
      }
    });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
    };
  }, [streamId]);

  // Send a message
  const sendMessage = useCallback(
    async (content: string, userId: string) => {
      if (!content.trim() || !streamId || !userId) {
        throw new Error("Missing required fields");
      }

      try {
        // Insert message to database
        const { data, error } = await supabase
          .from("messages")
          .insert({
            stream_id: streamId,
            user_id: userId,
            content: content.trim(),
          })
          .select("*, profiles(username, avatar_url)")
          .single();

        if (error) throw error;

        // Broadcast the new message to all connected clients (except self)
        if (channelRef.current && data) {
          channelRef.current.send({
            type: "broadcast",
            event: "new-message",
            payload: data,
          });
        }

        // Add to local state immediately (optimistic update)
        setMessages((prev) => [...prev, data]);

        return data;
      } catch (err) {
        console.error("Error sending message:", err);
        throw err;
      }
    },
    [streamId]
  );

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
};
