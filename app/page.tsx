"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StreamCard from "@/components/stream-card";
import { mockStreams } from "@/lib/utils";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-color-background">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 w-full bg-background z-50">
        <nav className="top-0 z-50 bg-(--color-surface) border-b border-(--color-border) ">
          <div className="max-w-[1920px] w-full mx-auto px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-linear-to-br from-(--color-primary) to-(--color-accent) flex items-center justify-center">
                <div className="size-6 rounded bg-(--color-surface)" />
              </div>
              <h1 className="text-xl">StreamHub</h1>
            </div>

            <div className="flex items-center gap-4">
              <Link href={"/go-live"}>
                <Button
                  variant="default"
                  className="bg-(--color-primary) hover:bg-(--color-primary-hover) hover:cursor-pointer h-12 px-6"
                >
                  Go Live
                </Button>
              </Link>
              <Avatar className="size-12 cursor-pointer hover:ring-2 ring-(--color-primary) transition-all">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                  className="object-bottom"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-[1920px] mx-auto px-8 py-12 mt-[5%]">
        <div className="mb-8">
          <h2 className="mb-2">Live Now</h2>
          <p className="text-(--color-text-secondary)">
            {mockStreams.length} streams in all
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {mockStreams.map((stream) => (
            <Link href={`/watch/${stream.id}`} key={stream.id}>
              <StreamCard {...stream} onClick={() => {}} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
