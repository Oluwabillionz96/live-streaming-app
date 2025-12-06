// components/video-player.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, Radio, AlertCircle, Loader2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { useSimplePeerViewer } from "@/hooks/useSimplePeerViewer";
import useAuthStore from "@/lib/store/auth-store";

interface VideoPlayerProps {
  streamId: string;
}

export default function VideoPlayer({ streamId }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<import("plyr").default | null>(null);
  const [viewers, setViewers] = useState(1247);
  const [isLive, setIsLive] = useState(false);
  const user = useAuthStore((state) => state.user);

  const { remoteStream, isConnected, isLoading, error, reconnect } =
    useSimplePeerViewer(streamId, user?.id || "");

  // Update video element when stream changes
  useEffect(() => {
    if (videoRef.current && remoteStream) {
      videoRef.current.srcObject = remoteStream;
      console.log("Video stream set");
      setIsLive(true);
    }
  }, [remoteStream]);

  // Initialize Plyr when stream is ready
  useEffect(() => {
    if (!remoteStream || !videoRef.current) return;

    const loadPlyr = async () => {
      const Plyr = (await import("plyr")).default;

      if (videoRef.current && !playerRef.current) {
        playerRef.current = new Plyr(videoRef.current, {
          controls: [
            "play-large",
            "play",
            // "progress",
            "current-time",
            "mute",
            "fullscreen",
          ],
          settings: ["quality", "speed"],
          quality: {
            default: 1080,
            options: [1080, 720, 480, 360, 240],
          },
          speed: {
            selected: 1,
            options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
          },
          ratio: "16:9",
          invertTime: false,
          toggleInvert: true,
          autoplay: true, // Auto play when stream is ready
          clickToPlay: true,
          hideControls: false,
          resetOnEnd: false,
          keyboard: { focused: true, global: true },
        });

        // Event listeners
        playerRef.current.on("ready", () => {
          console.log("Plyr player is ready with WebRTC stream");
        });

        playerRef.current.on("play", () => {
          console.log("Video playing");
        });

        playerRef.current.on("pause", () => {
          console.log("Video paused");
        });
      }
    };

    loadPlyr();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [remoteStream]);

  // Simulate viewer count changes
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setViewers((prev) => {
        const change = Math.floor(Math.random() * 10) - 4;
        const newCount = prev + change;
        return newCount < 1000 ? 1000 : newCount; // Minimum 1000 viewers
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Video Container */}
      <div className="relative bg-[#18181f] rounded-xl overflow-hidden border border-[#2d2d38]">
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#18181f] z-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
              <p className="text-white">Connecting to stream...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#18181f] z-20">
            <div className="text-center p-6">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={reconnect}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
              >
                Reconnect
              </button>
            </div>
          </div>
        )}

        {/* Live Badge */}
        {isLive && (
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#ef4444] px-3 py-1.5 rounded-lg shadow-lg">
            <Badge className="live-badge px-2 py-1 uppercase tracking-wide">
              <span className="hidden md:flex items-center gap-2">
                <div className="size-2 rounded-full bg-white animate-pulse" />
                Live
              </span>
              <Radio className="md:hidden" />
            </Badge>
          </div>
        )}

        {/* Viewer Count */}
        {isConnected && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
            <Eye className="size-4 text-white" />
            <span className="text-white text-sm font-semibold">
              {viewers.toLocaleString()}
            </span>
          </div>
        )}

        {/* Video Player */}
        <video
          ref={videoRef}
          className="w-full aspect-video"
          playsInline
          autoPlay
          controls
          muted={false}
          poster={
            !remoteStream
              ? "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80"
              : undefined
          }
        >
          Your browser does not support the video tag.
        </video>

        {/* No Stream State */}
        {!remoteStream && !isLoading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#18181f]">
            <div className="text-center">
              <Radio className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Waiting for stream to start...</p>
            </div>
          </div>
        )}
      </div>

      {/* Plyr CSS */}
      <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />

      <style jsx global>{`
        /* Custom Plyr Theme */
        .plyr {
          --plyr-color-main: #8b5cf6;
          --plyr-video-background: #18181f;
          --plyr-menu-background: #212129;
          --plyr-menu-color: #f5f5f7;
          --plyr-video-control-background-hover: #2a2a33;
        }

        .plyr__control--overlaid {
          background: #8b5cf6;
        }

        .plyr__control--overlaid:hover {
          background: #7c3aed;
        }

        .plyr__menu__container {
          background: #212129;
          border: 1px solid #2d2d38;
          border-radius: 0.5rem;
        }

        .plyr__control[data-plyr="settings"] {
          color: #f5f5f7;
        }

        .plyr__progress__buffer {
          background: #2a2a33;
        }

        .plyr--video .plyr__controls {
          background: linear-gradient(transparent, rgba(10, 10, 15, 0.8));
        }
      `}</style>
    </div>
  );
}
