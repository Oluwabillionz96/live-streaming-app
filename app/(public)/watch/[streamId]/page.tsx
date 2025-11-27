"use client";

import { useState } from "react";

import { Heart, Users, Share2, ChevronLeft, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/image-with-fallback";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessage } from "@/lib/types";
import { mockMessages } from "@/lib/utils";
import ChatPanel from "@/components/chat-panel";

export default function WatchPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const badges = [" Gaming", "Tournament", "Pro Player", "Competitive"];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const newMessage: ChatMessage = {
      id: messages.length + 1,
      username: "You",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
      message: chatInput,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setChatInput("");
  };

  return (
    <>
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isChatOpen ? "lg:mr-[450px]" : ""
        }`}
      >
        {/* Video Player */}
        <div className="relative bg-black aspect-video lg:aspect-auto lg:flex-1">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&q=80"
            alt="Stream"
            className="w-full h-full object-contain"
          />
          <div className="absolute top-6 left-6">
            <Badge className="live-badge px-4 py-2 uppercase tracking-wide">
              <span className="hidden md:inline">Live</span>
              <Radio className="md:hidden" />
            </Badge>
          </div>
          <div className="absolute top-6 right-6 flex gap-3">
            <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
              <Users className="size-5 text-(--color-live)" />
              <span>12,453</span>
            </div>
          </div>
        </div>

        {/* Stream Info */}
        <div className="bg-(--color-surface) border-b border-(--color-border) p-8">
          <div className="flex  flex-col md:flex-row items-start justify-between gap-8 md:gap-6 mb-6">
            <div className="flex-1">
              <h2 className="mb-4 text-xs">
                Pro Tournament Finals - Epic Gameplay
              </h2>
              <div className="flex items-center gap-4">
                <Avatar className="size-14">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
                    className="object-cover"
                  />
                  <AvatarFallback>PG</AvatarFallback>
                </Avatar>
                <div>
                  <h4>ProGamer_X</h4>
                  <p className="text-sm text-(--color-text-secondary)">
                    45.2K followers
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-fit">
              <Button
                variant={isFollowing ? "outline" : "default"}
                className={
                  isFollowing
                    ? "border-(--color-border) hover:bg-(--color-surface-hover) "
                    : "bg-(--color-primary) hover:bg-(--color-primary-hover) h-12 px-6 flex-1"
                }
                onClick={() => setIsFollowing(!isFollowing)}
              >
                <Heart
                  className={`size-4 mr-2 ${isFollowing ? "fill-current" : ""}`}
                />
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-(--color-border) hover:bg-(--color-surface-hover) size-12"
              >
                <Share2 className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {badges.map((item, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-(--color-surface-elevated) px-4 py-2 text-white"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-(--color-surface) p-8 flex-1 overflow-auto">
          <h4 className="mb-3">About this stream</h4>
          <p className="text-(--color-text-secondary) leading-relaxed">
            Welcome to the grand finals! Today we&apos;re competing for the
            championship title in one of the most anticipated tournaments of the
            year. Stick around for incredible plays, expert commentary, and a
            chance to win exclusive giveaways. Don&apos;t forget to follow and
            turn on notifications!
          </p>
        </div>
      </div>

      {/* Chat Panel */}
      <ChatPanel
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        messages={messages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        handleSendMessage={handleSendMessage}
      />

      {/* Chat Toggle Button (when closed) */}
      {!isChatOpen && (
        <Button
          className="fixed right-6 bottom-6 lg:bottom-auto lg:top-32 bg-(--color-primary) hover:bg-(--color-primary-hover) shadow-lg z-50 h-12 px-6"
          onClick={() => setIsChatOpen(true)}
        >
          <ChevronLeft className="size-5 mr-2" />
          Open Chat
        </Button>
      )}
    </>
  );
}
