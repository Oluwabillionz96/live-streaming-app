"use client";

import { useState } from "react";

import { Heart, Share2, ChevronLeft, MessageCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ChatPanel from "@/components/chat-panel";
import VideoPlayer from "@/components/video-player";
import { useParams } from "next/navigation";
import useStream from "@/hooks/useStream";

export default function WatchPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const badges = [" Gaming", "Tournament", "Pro Player", "Competitive"];
  const params = useParams();
  const { streamId } = Array.isArray(params) ? params[0] : params;

  const { stream } = useStream(streamId);

  return (
    <>
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isChatOpen ? "lg:mr-[450px]" : ""
        }`}
      >
        <VideoPlayer streamId={streamId} />

        {/* Stream Info */}
        <div className="bg-(--color-surface) border-b border-(--color-border) p-8">
          <div className="flex  flex-col md:flex-row items-start justify-between gap-8 md:gap-6 mb-6">
            <div className="flex-1">
              <h2 className="mb-4 text-xs">{stream?.title}</h2>
              <div className="flex items-center gap-4">
                <Avatar className="size-10 shrink-0">
                  <AvatarImage
                    src={
                      stream?.profiles.avatar_url
                        ? stream?.profiles.avatar_url
                        : undefined
                    }
                    alt={stream?.profiles.username}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-purple-900 font-bold text-xl">
                    {stream?.profiles.username.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4>{stream?.profiles.username}</h4>
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
            {stream?.description}
          </p>
        </div>
      </div>

      {/* Chat Panel */}
      <ChatPanel
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        streamId={streamId}
      />

      {/* Chat Toggle Button (when closed) */}
      {!isChatOpen && (
        <Button
          className="fixed right-6 bottom-6 lg:bottom-auto lg:top-32 bg-(--color-primary) hover:bg-(--color-primary-hover) shadow-lg z-50 h-12 px-6"
          onClick={() => setIsChatOpen(true)}
        >
          <span className="hidden md:flex">
            <ChevronLeft className="size-5 mr-2" />
            Open Chat
          </span>
          <MessageCircleIcon className="md:hidden" />
        </Button>
      )}
    </>
  );
}
