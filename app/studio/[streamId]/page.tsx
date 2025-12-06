"use client";

import { useState, useEffect, useRef } from "react";
import { Users, Camera, MessageCircleIcon } from "lucide-react";
import StudioHeader from "@/components/studio-header";
import ChatPanel from "@/components/chat-panel";
import StreamInfo from "@/components/stream-info";
import { useParams, useRouter } from "next/navigation";
import useAuthStore from "@/lib/store/auth-store";
import { endLiveStream } from "@/lib/utils";
import useStream from "@/hooks/useStream";
import { useSimplePeerBroadcaster } from "@/hooks/useSimplePeerBroadcaster";

export default function LiveStreamPage() {
  // const [viewerCount, setViewerCount] = useState(0);
  const [streamDuration, setStreamDuration] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const user = useAuthStore((state) => state.user);

  const session = useAuthStore((state) => state.session);
  const router = useRouter();

  if (session === null) <>Loading...</>;

  const params = useParams();
  const { streamId } = Array.isArray(params) ? params[0] : params;

  const { stream } = useStream(streamId);
  const { isBroadcasting, startBroadcasting, stopBroadcasting, viewerCount } =
    useSimplePeerBroadcaster(streamId, localStream, user?.id || "");
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

        setLocalStream(stream);
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

  // STEP 4.5: Stream duration timer (simplest)
  useEffect(() => {
    if (!isBroadcasting) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      setStreamDuration(elapsedSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [isBroadcasting]);

  const endStream = async () => {
    try {
      stopBroadcasting();
      await endLiveStream(streamId);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      console.log("Stream ended");
      router.push("/dashboard/overview");
    } catch (error) {
      console.error("Failed to end stream:", error);
      alert("Failed to end stream. Please try again.");
    }
  };

  // STEP 4.3: Auto-start broadcasting when ready
  useEffect(() => {
    // Check if we should start broadcasting
    if (localStream && stream?.status === "live" && !isBroadcasting) {
      console.log("Auto-starting WebRTC broadcast...");
      startBroadcasting();
    }
  }, [localStream, stream?.status, isBroadcasting, startBroadcasting]);

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <StudioHeader
        isStreaming={isBroadcasting}
        streamDuration={streamDuration}
        endStream={endStream}
        viewerCount={viewerCount}
      />

      <div
        className={`max-w-[1920px] mt-28 md:mt-[10%] lg:mt-[5%] mx-auto p-6 transition-all duration-300 ${
          isChatOpen ? "lg:mr-[450px]" : ""
        }`}
      >
        <div className="space-y-4">
          <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
            {stream?.status === "past" ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <Camera className="w-24 h-24 text-gray-700 mb-4" />
                <p className="text-gray-500 text-lg">Stream has ended</p>
                {/* <p className="text-gray-600 text-sm mt-2 text-center">
                  Click &quot;Start Stream&quot; to begin broadcasting
                </p> */}
              </div>
            ) : true ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <Camera className="w-24 h-24 text-gray-700 mb-4" />
                <p className="text-gray-500 text-lg">Camera is off</p>
                <p className="text-gray-600 text-sm mt-2 text-center">
                  Click the camera button to turn it on
                </p>
              </div>
            )}

            {isBroadcasting && (
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-3 bg-black/70 backdrop-blur px-4 py-2 rounded-lg">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold">LIVE</span>
                  <span className="text-sm text-gray-300">
                    {Math.floor(streamDuration / 60)}:
                    {(streamDuration % 60).toString().padStart(2, "0")}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-black/70 backdrop-blur px-4 py-2 rounded-lg">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {viewerCount} viewers
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* 
          <StreamControls
            toggleCamera={toggleCamera}
            toggleMic={toggleMic}
            isCameraOn={isCameraOn}
            isMicOn={isMicOn}
            showSettings={showSettings}
            setSelectedCamera={setSelectedCamera}
            setSelectedMic={setSelectedMic}
            setShowSettings={setShowSettings}
            startStream={() => {}}
            selectedCamera={selectedCamera}
            selectedMic={selectedMic}
            isStreaming={isStreaming}
          /> */}

          <StreamInfo
            title={stream?.title ?? ""}
            category={stream?.category ?? ""}
            isStreaming={isBroadcasting}
            isPublic={stream?.is_public}
          />

          {isBroadcasting && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Users className="w-4 h-4" />
                  <span className="text-xs">Current Viewers</span>
                </div>
                <p className="text-2xl font-bold">
                  {Math.max(viewerCount, 15)}
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <span className="text-xs">Messages</span>
                </div>
                <p className="text-2xl font-bold">{messages.length}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Panel - Using your existing component structure */}
      <ChatPanel
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        setChatInput={setChatInput}
        messages={messages}
        chatInput={chatInput}
        handleSendMessage={() => {}}
      />

      {/* Chat Toggle Button */}
      {!isChatOpen && (
        <button
          className="fixed right-6 bottom-6 lg:bottom-auto lg:top-32 bg-blue-600 hover:bg-blue-700 shadow-lg z-100 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
          onClick={() => setIsChatOpen(true)}
        >
          <span className="hidden md:flex items-center gap-2">
            <MessageCircleIcon className="w-5 h-5" />
            Open Chat
          </span>
          <MessageCircleIcon className="md:hidden w-5 h-5" />
        </button>
      )}
    </div>
  );
}
