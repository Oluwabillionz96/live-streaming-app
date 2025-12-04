"use client";
import EmptyStreamState from "@/components/empty-stream-state";
import StreamCard from "@/components/stream-card";
import Tabs from "@/components/tabs";
import useStream from "@/hooks/useStream";
import { homeTabValues, mockStreams } from "@/lib/utils";
import { Calendar, Clock, Wifi } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"live" | "past" | "upcoming">(
    "live"
  );
  const { streams } = useStream();

  console.log(streams);

  return (
    <>
      <div className="mb-8">
        <Tabs
          tabValues={homeTabValues}
          tab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      {streams[`${activeTab}Streams`].length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {streams[`${activeTab}Streams`].map((stream) => (
            <Link href={`/watch/${stream.id}`} key={stream.id}>
              <StreamCard {...stream} />
            </Link>
          ))}
        </div>
      ) : (
        <>
          {activeTab === "live" ? (
            <EmptyStreamState
              streamCountInfo="0 streams in all"
              heading="No Live Streams Right Now"
              info="There are no active streams at the moment. Check back soon or be the first to go live!"
            >
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
                <Wifi className="w-12 h-12 text-gray-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-xl">✕</span>
              </div>
            </EmptyStreamState>
          ) : activeTab === "past" ? (
            <EmptyStreamState
              streamCountInfo="0 past streams"
              heading="No Past Streams"
              info=" You haven't streamed yet. Your past broadcasts will appear here once you've gone live."
            >
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
                <Clock className="w-12 h-12 text-gray-600" />
              </div>
            </EmptyStreamState>
          ) : activeTab === "upcoming" ? (
            <EmptyStreamState
              streamCountInfo="0 scheduled streams"
              heading="No Upcoming Streams"
              info="  There are no scheduled streams coming up. Schedule your next stream to let your audience know when you'll be live!"
            >
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
                <Calendar className="w-12 h-12 text-gray-600" />
              </div>
            </EmptyStreamState>
          ) : null}
        </>
      )}
    </>
  );
}
