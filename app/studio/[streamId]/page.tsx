"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Users, Camera, MessageCircleIcon } from "lucide-react";
import StudioHeader from "@/components/studio-header";
import ChatPanel from "@/components/chat-panel";
import useStreamStore from "@/lib/store/stream-store";
import StreamInfo from "@/components/stream-info";
import StreamControls from "@/components/stream-controls";
import { redirect, useParams, useRouter } from "next/navigation";
import useAuthStore from "@/lib/store/auth-store";
import { StreamAction } from "@/lib/utils";
import useStream from "@/hooks/useStream";

export default function LiveStreamPage() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [streamDuration, setStreamDuration] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState("default");
  const [selectedMic, setSelectedMic] = useState("default");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const user = useAuthStore((state) => state.user);

  const streamState = useStreamStore();
  const session = useAuthStore((state) => state.session);
  const router = useRouter();

  if (session === null) <>Loading...</>;

  const params = useParams();
  const { streamId } = Array.isArray(params) ? params[0] : params;

  const { stream } = useStream(streamId);

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
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <StudioHeader
        isStreaming={isStreaming}
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

            {isStreaming && (
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-3 bg-black/70 backdrop-blur px-4 py-2 rounded-lg">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold">Broadcasting</span>
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
            isStreaming={stream?.status === "live"}
            isPublic={stream?.is_public}
          />

          {isStreaming && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Users className="w-4 h-4" />
                  <span className="text-xs">Peak Viewers</span>
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
