import { formatDuration } from "@/lib/utils";
import { Radio, Users } from "lucide-react";
import React from "react";

const StudioHeader = ({
  isStreaming,
  viewerCount,
  streamDuration,
  endStream,
}: {
  isStreaming: boolean;
  viewerCount: number;
  streamDuration: number;
  endStream: () => void;
}) => {
  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1920px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-lg bg-linear-to-br from-(--color-primary) to-(--color-accent) flex items-center justify-center">
            <div className="size-6 rounded bg-(--color-surface)" />
          </div>
          <h1 className="text-2xl hidden md:block font-bold">Live Studio</h1>
          {isStreaming && (
            <div className="md:flex items-center hidden  gap-2 px-4 py-2 bg-red-600 rounded-full animate-pulse">
              <Radio className="w-4 h-4" />
              <span className="text-sm font-semibold">LIVE</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          {isStreaming && (
            <>
              <div className="md:flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hidden">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="font-semibold">{viewerCount}</span>
                <span className="text-gray-400 text-sm">viewers</span>
              </div>
              <div className="md:flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hidden">
                <span className="text-gray-400 text-sm">Duration:</span>
                <span className="font-mono font-semibold">
                  {formatDuration(streamDuration)}
                </span>
              </div>
            </>
          )}
          <button
            onClick={endStream}
            disabled={!isStreaming}
            className="px-6 py-2 bg-red-600  hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
          >
            End Stream
          </button>
        </div>
      </div>
    </header>
  );
};

export default StudioHeader;
