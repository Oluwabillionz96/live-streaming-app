import React from "react";

const StreamInfo = ({
  title,
  category,
  isStreaming,
  isPublic,
}: {
  title: string;
  category: string;
  isStreaming: boolean;
  isPublic: boolean | undefined;
}) => {
  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-xl font-bold mb-4">Stream Information</h2>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-400">Title</label>
          <p className="text-white mt-1">{title}</p>
        </div>
        <div>
          <label className="text-sm text-gray-400">Category</label>
          <p className="text-white mt-1">{category}</p>
        </div>
        <div>
          <label className="text-sm text-gray-400">Status</label>
          <p className="text-white mt-1 flex items-center gap-2">
            {isStreaming ? (
              <>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {isPublic ? "Public" : "Private"} - Live
              </>
            ) : (
              <>
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                Offline
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StreamInfo;
