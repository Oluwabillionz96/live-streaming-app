// components/chat-panel.tsx
"use client";

import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { StreamMessage } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useAuthStore from "@/lib/store/auth-store";
import { formatDate } from "@/lib/utils";
import { useStreamChat } from "@/hooks/useStreamChat";
import { ChatInput } from "./chat-input";

const ChatPanel = ({
  isChatOpen,
  setIsChatOpen,
  streamId,
}: {
  isChatOpen: boolean;
  setIsChatOpen: Dispatch<SetStateAction<boolean>>;
  streamId: string;
}) => {
  const user = useAuthStore((state) => state.user);

  const { messages, isLoading, error, sendMessage } = useStreamChat(streamId);

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!user || !streamId) {
        throw new Error("User or stream ID not available");
      }
      return await sendMessage(content, user.id);
    },
    [streamId, user, sendMessage]
  );

  return (
    <div
      className={`fixed lg:fixed right-0 top-[81px] h-[calc(100vh-81px)] w-full lg:w-[450px] bg-(--color-surface) border-l border-(--color-border) flex flex-col transition-transform duration-300 ${
        isChatOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Chat Header */}
      <div className="p-6 border-b border-(--color-border) flex items-center justify-between">
        <h4>Live Chat</h4>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsChatOpen(false)}
          className="hover:bg-(--color-surface-hover) size-10"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="p-6 flex-1 overflow-y-scroll">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-(--color-text-tertiary)">Loading messages...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-4">
                <Avatar className="size-10 shrink-0">
                  <AvatarImage
                    src={msg.profiles?.avatar_url || undefined}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-purple-900 font-bold text-xl">
                    {msg.profiles?.username?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="truncate font-medium">
                      {user?.id === msg.user_id
                        ? "You"
                        : msg.profiles?.username || "Anonymous"}
                    </span>
                    <span className="text-xs text-(--color-text-tertiary) shrink-0">
                      {formatDate(msg.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-(--color-text-secondary) break-words">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="text-center text-(--color-text-tertiary) py-8">
                No messages yet. Be the first to chat!
              </p>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Chat Input */}
      <div className="p-6 border-t border-(--color-border)">
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading || !user}
        />
      </div>
    </div>
  );
};

export default ChatPanel;
