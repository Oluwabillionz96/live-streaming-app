import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { ChevronRight, Send } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { ChatMessage } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";

const ChatPanel = ({
  isChatOpen,
  setIsChatOpen,
  messages,
  chatInput,
  setChatInput,
  handleSendMessage,
}: {
  isChatOpen: boolean;
  setIsChatOpen: Dispatch<SetStateAction<boolean>>;
  messages: ChatMessage[];
  chatInput: string;
  setChatInput: Dispatch<SetStateAction<string>>;
  handleSendMessage: () => void;
}) => {
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
      <ScrollArea className=" p-6 flex-1 overflow-y-scroll">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-4">
              <Avatar className="size-10 shrink-0">
                <AvatarImage src={msg.avatar} className="object-cover" />
                <AvatarFallback>{msg.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="truncate">{msg.username}</span>
                  <span className="text-xs text-(--color-text-tertiary) shrink-0">
                    {msg.timestamp}
                  </span>
                </div>
                <p className="text-sm text-(--color-text-secondary) wrap-break-word">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <div className="p-6 border-t border-(--color-border)">
        <div className="flex gap-3">
          <Input
            placeholder="Send a message..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="bg-(--color-surface-elevated) border-(--color-border) h-12"
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            className="bg-(--color-primary) hover:bg-(--color-primary-hover) shrink-0 size-12"
          >
            <Send className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
