"use client";
import StreamCard from "@/components/stream-card";
import { mockStreams } from "@/lib/utils";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {" "}
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
    </>
  );
}
