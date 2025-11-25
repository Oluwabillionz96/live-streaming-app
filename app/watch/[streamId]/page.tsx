"use client";

import { useState } from "react";

import {
  ArrowLeft,
  Heart,
  Users,
  Share2,
  Settings,
  Send,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/image-with-fallback";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  id: number;
  username: string;
  avatar: string;
  message: string;
  timestamp: string;
}

const mockMessages: ChatMessage[] = [
  {
    id: 1,
    username: "GamerFan123",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    message: "This is amazing! 🔥",
    timestamp: "2:34 PM",
  },
  {
    id: 2,
    username: "StreamLover",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    message: "Great content as always!",
    timestamp: "2:35 PM",
  },
  {
    id: 3,
    username: "ProPlayer_X",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    message: "How did you pull that off?",
    timestamp: "2:36 PM",
  },
  {
    id: 4,
    username: "ChatMaster",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    message: "New follower here! Love the stream",
    timestamp: "2:37 PM",
  },
  {
    id: 5,
    username: "EliteGamer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    message: "Can you show that strategy again?",
    timestamp: "2:38 PM",
  },
];

export default function WatchPage() {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(mockMessages);

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
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Top Bar */}
      <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-8 py-5">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            className="hover:bg-[var(--color-surface-hover)] size-12"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
              <div className="size-6 rounded bg-[var(--color-surface)]" />
            </div>
            <span>StreamHub</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-81px)]">
        {/* Main Content Area */}
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
                Live
              </Badge>
            </div>
            <div className="absolute top-6 right-6 flex gap-3">
              <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
                <Users className="size-5 text-[var(--color-live)]" />
                <span>12,453</span>
              </div>
            </div>
          </div>

          {/* Stream Info */}
          <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] p-8">
            <div className="flex items-start justify-between gap-6 mb-6">
              <div className="flex-1">
                <h2 className="mb-4">Pro Tournament Finals - Epic Gameplay</h2>
                <div className="flex items-center gap-4">
                  <Avatar className="size-14">
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80" />
                    <AvatarFallback>PG</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4>ProGamer_X</h4>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      45.2K followers
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant={isFollowing ? "outline" : "default"}
                  className={
                    isFollowing
                      ? "border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] h-12 px-6"
                      : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] h-12 px-6"
                  }
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <Heart
                    className={`size-4 mr-2 ${
                      isFollowing ? "fill-current" : ""
                    }`}
                  />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] size-12"
                >
                  <Share2 className="size-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge
                variant="secondary"
                className="bg-[var(--color-surface-elevated)] px-4 py-2"
              >
                Gaming
              </Badge>
              <Badge
                variant="secondary"
                className="bg-[var(--color-surface-elevated)] px-4 py-2"
              >
                Tournament
              </Badge>
              <Badge
                variant="secondary"
                className="bg-[var(--color-surface-elevated)] px-4 py-2"
              >
                Pro Player
              </Badge>
              <Badge
                variant="secondary"
                className="bg-[var(--color-surface-elevated)] px-4 py-2"
              >
                Competitive
              </Badge>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[var(--color-surface)] p-8 flex-1 overflow-auto">
            <h4 className="mb-3">About this stream</h4>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Welcome to the grand finals! Today we&apos;re competing for the
              championship title in one of the most anticipated tournaments of
              the year. Stick around for incredible plays, expert commentary,
              and a chance to win exclusive giveaways. Don&apos;t forget to
              follow and turn on notifications!
            </p>
          </div>
        </div>

        {/* Chat Panel */}
        <div
          className={`fixed lg:fixed right-0 top-[81px] h-[calc(100vh-81px)] w-full lg:w-[450px] bg-[var(--color-surface)] border-l border-[var(--color-border)] flex flex-col transition-transform duration-300 ${
            isChatOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Chat Header */}
          <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
            <h4>Live Chat</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsChatOpen(false)}
              className="hover:bg-[var(--color-surface-hover)] size-10"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className="flex gap-4">
                  <Avatar className="size-10 flex-shrink-0">
                    <AvatarImage src={msg.avatar} />
                    <AvatarFallback>{msg.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="truncate">{msg.username}</span>
                      <span className="text-xs text-[var(--color-text-tertiary)] flex-shrink-0">
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] break-words">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Chat Input */}
          <div className="p-6 border-t border-[var(--color-border)]">
            <div className="flex gap-3">
              <Input
                placeholder="Send a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="bg-[var(--color-surface-elevated)] border-[var(--color-border)] h-12"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] flex-shrink-0 size-12"
              >
                <Send className="size-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Toggle Button (when closed) */}
        {!isChatOpen && (
          <Button
            className="fixed right-6 bottom-6 lg:bottom-auto lg:top-32 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-lg z-50 h-12 px-6"
            onClick={() => setIsChatOpen(true)}
          >
            <ChevronLeft className="size-5 mr-2" />
            Open Chat
          </Button>
        )}
      </div>
    </div>
  );
}
