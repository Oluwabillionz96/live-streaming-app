"use client";
import StreamCard from "@/components/stream-card";
import Tabs from "@/components/tabs";
import useStream from "@/hooks/useStream";
import { homeTabValues, mockStreams } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"live" | "past" | "upcoming">(
    "live"
  );
  const { streams } = useStream();

  return (
    <>
      <div className="mb-8">
        <Tabs
          tabValues={homeTabValues}
          tab={activeTab}
          setActiveTab={setActiveTab}
        />
        <p className="text-(--color-text-secondary)">
          {streams[`${activeTab}Streams`].length} streams in all
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {mockStreams.map((stream) => (
          <Link href={`/watch/${stream.id}`} key={stream.id}>
            <StreamCard {...stream} onClick={() => {}} />
          </Link>
        ))}
      </div>
    </>
  );
}
