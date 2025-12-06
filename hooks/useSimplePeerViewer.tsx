// hooks/useSimplePeerViewer.ts
import { useState, useEffect, useCallback, useRef } from "react";
import SimplePeer from "simple-peer";
import { supabase } from "@/lib/supabase-client";
import { RealtimeChannel } from "@supabase/supabase-js";

interface SignalPayload {
  to: string;
  from: string;
  signal: SimplePeer.SignalData;
}

interface BroadcastEventPayload {
  payload: SignalPayload;
}

export const useSimplePeerViewer = (streamId: string, userId: string) => {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const peerRef = useRef<SimplePeer.Instance | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  // Disconnect function - declared first
  const disconnect = useCallback(() => {
    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }
    if (channelRef.current) {
      channelRef.current.unsubscribe();
      channelRef.current = null;
    }
    setRemoteStream(null);
    setIsConnected(false);
    setIsLoading(false);
  }, []);

  // Reconnect function
  const reconnect = useCallback(() => {
    disconnect();
    // Reconnection will be handled by the main useEffect
  }, [disconnect]);

  // Initialize connection
  useEffect(() => {
    if (!streamId || !userId) return;

    console.log("Viewer initializing for stream:", streamId);

    const channel = supabase.channel(`stream_${streamId}`);

    // Listen for broadcaster signals
    channel.on(
      "broadcast",
      { event: "broadcaster-signal" },
      (payload: BroadcastEventPayload) => {
        const signalPayload = payload.payload;

        // Only process signals meant for this viewer
        if (signalPayload.to !== userId) return;

        console.log("Viewer received signal from broadcaster");

      if (!peerRef.current) {
        // Create peer connection if it doesn't exist
        const peer = new SimplePeer({
          initiator: false, // Viewer is not initiator
          trickle: true,
          config: {
            iceServers: [
              { urls: "stun:stun.l.google.com:19302" },
              { urls: "stun:global.stun.twilio.com:3478" },
            ],
          },
        });

        peerRef.current = peer;

        // Handle incoming stream
        peer.on("stream", (stream) => {
          console.log("Received broadcast stream");
          setRemoteStream(stream);
          setIsConnected(true);
          setIsLoading(false);
          setError(null);
        });

        // Handle viewer signals to send back to broadcaster
        peer.on("signal", (signalData) => {
          console.log("Viewer sending signal to broadcaster");

          if (channelRef.current) {
            channelRef.current.send({
              type: "broadcast",
              event: "viewer-signal",
              payload: {
                to: signalPayload.from, // Send back to broadcaster
                from: userId,
                signal: signalData,
                streamId,
              },
            });
          }
        });

        // Handle connection
        peer.on("connect", () => {
          console.log("Connected to broadcaster");
          setIsConnected(true);
          setIsLoading(false);
        });

        // Handle errors
        peer.on("error", (err) => {
          console.error("Viewer peer error:", err);
          setError(err.message);
          setIsConnected(false);
          setIsLoading(false);
        });
      }

      // Now signal with the broadcaster's signal
      if (peerRef.current) {
        peerRef.current.signal(signalPayload.signal);
      }
      }
    );

    // Listen for broadcast started
    channel.on("broadcast", { event: "broadcast-started" }, () => {
      console.log("Broadcast started");
      setIsLoading(true);
      setError(null);
    });

    // Listen for broadcast ended
    channel.on("broadcast", { event: "broadcast-ended" }, () => {
      console.log("Broadcast ended");
      disconnect();
      setError("Stream has ended");
    });

    // Subscribe to channel
  channel.subscribe(async (status: string) => {
    if (status === "SUBSCRIBED") {
      console.log("Viewer subscribed to stream channel");

      // Announce to broadcaster that viewer wants to join
      await channel.send({
        type: "broadcast",
        event: "viewer-join",
        payload: {
          streamId,
          viewerId: userId,
        },
      });

      console.log("Viewer announced join to broadcaster");
    }
  });

    channelRef.current = channel;

    // Cleanup function
    return () => {
      disconnect();
    };
  }, [streamId, userId, disconnect]);

  return {
    remoteStream,
    isConnected,
    isLoading,
    error,
    disconnect,
    reconnect,
  };
};
