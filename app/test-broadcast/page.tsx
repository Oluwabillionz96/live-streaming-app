"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SimpleBroadcast() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const router = useRouter();

  // Start camera on mount
  useEffect(() => {
    let mounted = true;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
          },
        });

        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        streamRef.current = stream;
        console.log("Camera started");
      } catch (err: unknown) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // End stream and redirect
  const endStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    console.log("Stream ended");
    router.push("/dashboard/overview");
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl space-y-6">
        {/* Video */}
        <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden border-2 border-gray-800">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>

        {/* End Stream Button */}
        <div className="flex justify-center">
          <button
            onClick={endStream}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-lg transition-colors"
          >
            End Stream
          </button>
        </div>
      </div>
    </div>
  );
}
