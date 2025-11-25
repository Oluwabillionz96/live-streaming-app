"use client";

import { useState } from "react";

import {
  Search,
  Bell,
  Menu,
  Gamepad2,
  Music,
  Trophy,
  Palette,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StreamCard from "@/components/stream-card";
import { mockStreams } from "@/lib/utils";

const categories = [
  { name: "All", icon: Menu },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Music", icon: Music },
  { name: "Sports", icon: Trophy },
  { name: "Creative", icon: Palette },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredStreams =
    selectedCategory === "All"
      ? mockStreams
      : mockStreams.filter((stream) => stream.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-[1920px] mx-auto px-8 py-5 flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
              <div className="size-6 rounded bg-[var(--color-surface)]" />
            </div>
            <h1 className="text-xl">StreamHub</h1>
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[var(--color-text-tertiary)]" />
              <Input
                placeholder="Search streams, categories, creators..."
                className="pl-12 bg-[var(--color-surface-elevated)] border-[var(--color-border)] h-12"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-[var(--color-surface-hover)] size-12"
            >
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 size-2 bg-[var(--color-error)] rounded-full" />
            </Button>

            <Button
              variant="default"
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] h-12 px-6"
              onClick={() => {}}
            >
              Go Live
            </Button>

            <Avatar className="size-12 cursor-pointer hover:ring-2 ring-[var(--color-primary)] transition-all">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      {/* Category Filter */}
      <div className="sticky top-[81px] z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="max-w-[1920px] mx-auto px-8 py-5 flex gap-4 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;
            return (
              <Button
                key={category.name}
                variant={isSelected ? "default" : "ghost"}
                className={`flex-shrink-0 gap-2 h-11 px-6 ${
                  isSelected
                    ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
                    : "hover:bg-[var(--color-surface-hover)]"
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <Icon className="size-4" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1920px] mx-auto px-8 py-12">
        <div className="mb-8">
          <h2 className="mb-2">Live Now</h2>
          <p className="text-[var(--color-text-secondary)]">
            {filteredStreams.length} streams in {selectedCategory}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredStreams.map((stream) => (
            <StreamCard key={stream.id} {...stream} onClick={() => {}} />
          ))}
        </div>
      </main>
    </div>
  );
}
