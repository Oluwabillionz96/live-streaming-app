// hooks/useSimplePeerBroadcaster.ts
import { useState, useEffect, useCallback, useRef } from "react";
import SimplePeer from "simple-peer";
import { supabase } from "@/lib/supabase-client";

// Define types for our signaling messages
type SignalData = SimplePeer.SignalData;

interface SignalMessage {
  to: string;
  from: string;
  signal: SignalData;
}

interface JoinRequestMessage {
  viewerId: string;
}

interface ChannelMessage {
  type: "broadcast";
  event: string;
  payload: SignalMessage | JoinRequestMessage;
}

export const useSimplePeerBroadcaster = (
  streamId: string,
  localStream: MediaStream | null,
  userId: string
) => {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const peerConnectionsRef = useRef<Map<string, SimplePeer.Instance>>(
    new Map()
  );
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  // Function to create a peer connection for a viewer
  const createPeerForViewer = useCallback(
    (viewerId: string) => {
      if (!localStream) {
        console.error("Cannot create peer: no local stream");
        return;
      }

      // Check if we already have a connection for this viewer
      if (peerConnectionsRef.current.has(viewerId)) {
        console.log("Already connected to viewer:", viewerId);
        return;
      }

      console.log("Creating new peer connection for viewer:", viewerId);

      // Create a new SimplePeer instance as the broadcaster (initiator)
      const peer = new SimplePeer({
        initiator: true, // We initiate the connection
        trickle: true, // Send ICE candidates as they're gathered
        stream: localStream, // Send our camera/audio stream
      });

      // When SimplePeer generates signaling data (offer or ICE candidates)
      peer.on("signal", (signalData: SignalData) => {
        console.log("Generated signal for viewer:", viewerId);

        if (channelRef.current) {
          const signalMessage: SignalMessage = {
            to: viewerId,
            from: userId,
            signal: signalData,
          };

          // Send the signal to the viewer via Supabase
          channelRef.current.send({
            type: "broadcast",
            event: "broadcaster-signal",
            payload: signalMessage,
          });
        }
      });

      // When we receive a signal from the viewer (answer or ICE candidates)
      peer.on("signal", () => {
        // This is where we would handle incoming signals if needed
        // For broadcaster, we mostly send signals, not receive
      });

      // When the connection is established
      peer.on("connect", () => {
        console.log("Successfully connected to viewer:", viewerId);
        setViewerCount((prev) => prev + 1);
      });

      // Handle errors
      peer.on("error", (error: Error) => {
        console.error(
          "Peer connection error with viewer",
          viewerId,
          ":",
          error
        );
        peer.destroy();
        peerConnectionsRef.current.delete(viewerId);
        setViewerCount((prev) => prev - 1);
      });

      // When connection closes
      peer.on("close", () => {
        console.log("Connection closed with viewer:", viewerId);
        peerConnectionsRef.current.delete(viewerId);
        setViewerCount((prev) => prev - 1);
      });

      // Store the peer connection
      peerConnectionsRef.current.set(viewerId, peer);
    },
    [localStream, userId]
  );

  // Set up Supabase channel for signaling
  useEffect(() => {
    if (!streamId || !userId || !localStream) return;

    // Create a channel for this specific stream
    const channel = supabase.channel(`stream_${streamId}`);

    // Listen for viewers who want to join
    channel.on(
      "broadcast",
      { event: "viewer-join" },
      (payload: ChannelMessage) => {
        const joinRequest = payload.payload as JoinRequestMessage;
        const viewerId = joinRequest.viewerId;

        console.log("Viewer wants to join:", viewerId);

        // Don't connect to ourselves
        if (viewerId === userId) return;

        // Only create connection if we're broadcasting
        if (isBroadcasting) {
          createPeerForViewer(viewerId);
        }
      }
    );

    // Listen for signals from viewers (answers to our offers)
    channel.on(
      "broadcast",
      { event: "viewer-signal" },
      (payload: ChannelMessage) => {
        const signalMessage = payload.payload as SignalMessage;

        // Make sure this signal is meant for us
        if (signalMessage.to !== userId) return;

        const viewerId = signalMessage.from;
        const peer = peerConnectionsRef.current.get(viewerId);

        if (peer) {
          console.log("Received signal from viewer:", viewerId);
          peer.signal(signalMessage.signal);
        }
      }
    );

    // Subscribe to the channel
    channel.subscribe((status: string) => {
      if (status === "SUBSCRIBED") {
        console.log("Connected to stream channel:", streamId);
      }
    });

    // Store channel reference
    channelRef.current = channel;

    // Cleanup function
    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }

      // Destroy all peer connections
      peerConnectionsRef.current.forEach((peer) => peer.destroy());
      peerConnectionsRef.current.clear();
    };
  }, [streamId, userId, localStream, isBroadcasting, createPeerForViewer]);

  // Function to start broadcasting
  const startBroadcasting = useCallback(() => {
    if (!localStream) {
      console.error("Cannot start broadcast: no local stream");
      return false;
    }

    if (!channelRef.current) {
      console.error(
        "Cannot start broadcast: not connected to signaling channel"
      );
      return false;
    }

    console.log("Starting broadcast...");
    setIsBroadcasting(true);

    // Announce that we're broadcasting
    channelRef.current.send({
      type: "broadcast",
      event: "broadcast-started",
      payload: {
        broadcasterId: userId,
        streamId,
      },
    });

    return true;
  }, [localStream, userId, streamId]);

  // Function to stop broadcasting
  const stopBroadcasting = useCallback(() => {
    console.log("Stopping broadcast...");

    // Destroy all peer connections
    peerConnectionsRef.current.forEach((peer) => peer.destroy());
    peerConnectionsRef.current.clear();

    // Announce that we've stopped
    if (channelRef.current) {
      channelRef.current.send({
        type: "broadcast",
        event: "broadcast-ended",
        payload: { streamId },
      });
    }

    setIsBroadcasting(false);
    setViewerCount(0);
  }, [streamId]);

  return {
    isBroadcasting,
    startBroadcasting,
    stopBroadcasting,
    viewerCount,
  };
};
