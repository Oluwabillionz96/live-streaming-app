
"use client";

import { useState, useRef, FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => Promise<void>;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const content = inputValue.trim();
    if (!content || isSending || disabled) return;

    try {
      setIsSending(true);
      await onSendMessage(content);
      setInputValue(""); // Clear only after successful send
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex gap-3">
      <Input
        placeholder="Send a message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
          }
        }}
        disabled={isSending || disabled}
        className="bg-(--color-surface-elevated) border-(--color-border) h-12 flex-1"
      />
      <Button
        type="submit"
        size="icon"
        disabled={!inputValue.trim() || isSending || disabled}
        className="bg-(--color-primary) hover:bg-(--color-primary-hover) shrink-0 size-12 disabled:opacity-50"
      >
        {isSending ? (
          <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Send className="size-5" />
        )}
      </Button>
    </form>
  );
};
