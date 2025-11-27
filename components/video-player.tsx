"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, Radio } from "lucide-react";
import { Badge } from "./ui/badge";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const playerRef = useRef<null | Plyr>(null);
  const [isLive, setIsLive] = useState(true);
  const [viewers, setViewers] = useState(1247);

  useEffect(() => {
    // Dynamically import Plyr
    const loadPlyr = async () => {
      const Plyr = (await import("plyr")).default;

      if (videoRef.current && !playerRef.current) {
        playerRef.current = new Plyr(videoRef.current, {
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            // // "volume",
            // "settings",
            // "pip",
            // "airplay",
            "fullscreen",
          ],
          settings: ["quality", "speed"],
          quality: {
            default: 1080,
            options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
          },
          speed: {
            selected: 1,
            options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
          },
          ratio: "16:9",
          invertTime: false,
          toggleInvert: true,
          autoplay: false,
          clickToPlay: true,
          hideControls: true,
          resetOnEnd: false,
          keyboard: { focused: true, global: true },
        });

        // Event listeners
        // playerRef.current.on("ready", () => {
        //   console.log("Player is ready");
        // });

        // playerRef.current.on("play", () => {
        //   console.log("Video playing");
        // });

        // playerRef.current.on("pause", () => {
        //   console.log("Video paused");
        // });
      }
    };

    loadPlyr();

    // Simulate viewer count changes
    const interval = setInterval(() => {
      setViewers((prev) => prev + Math.floor(Math.random() * 10) - 4);
    }, 5000);

    return () => {
      clearInterval(interval);
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Video Container */}
      <div className="relative bg-[#18181f] rounded-xl overflow-hidden border border-[#2d2d38]">
        {/* Live Badge */}
        {isLive && (
          <>
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#ef4444] px-3 py-1.5 rounded-lg shadow-lg">
              <Badge className="live-badge px-2 py-1 uppercase tracking-wide">
                <span className="hidden md:flex items-center gap-2">
                  <div className="size-2 rounded-full bg-white animate-pulse" />
                  Live
                </span>
                <Radio className="md:hidden" />
              </Badge>
            </div>
          </>
        )}

        {/* Viewer Count */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <Eye className="size-4 text-white" />
          <span className="text-white text-sm font-semibold">
            {viewers.toLocaleString()}
          </span>
        </div>

        {/* Plyr Video Player */}
        <video
          ref={videoRef}
          className="w-full aspect-video"
          playsInline
          controls
          poster="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
            // size="1080"
          />
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
            // size="720"
          />
        </video>
      </div>

      {/* Plyr CSS - Inject into head */}
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
