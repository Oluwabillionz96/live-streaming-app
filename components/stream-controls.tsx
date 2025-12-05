import {
  BookmarkCheck,
  Mic,
  MicOff,
  Radio,
  Settings,
  Video,
  VideoOff,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const StreamControls = ({
  toggleCamera,
  isCameraOn,
  toggleMic,
  isMicOn,
  setShowSettings,
  showSettings,
  isStreaming,
  startStream,
  selectedCamera,
  setSelectedCamera,
  selectedMic,
  setSelectedMic,
}: {
  toggleCamera: () => void;
  isCameraOn: boolean;
  toggleMic: () => void;
  isMicOn: boolean;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
  showSettings: boolean;
  isStreaming: boolean;
  startStream: () => void;
  selectedCamera: string;
  setSelectedCamera: Dispatch<SetStateAction<string>>;
  selectedMic: string;
  setSelectedMic: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="bg-gray-900 rounded-xl border md:p-6 p-4 border-gray-800">
      <div className={`flex items-center justify-center gap-4`}>
        <div className="flex items-center justify-center gap-4">
          {isStreaming && (
            <>
              {" "}
              <button
                onClick={() => {
                  toggleCamera();
                }}
                className={`p-4 rounded-xl transition-all ${
                  isCameraOn
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {isCameraOn ? (
                  <Video className="w-6 h-6" />
                ) : (
                  <VideoOff className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={toggleMic}
                className={`p-4 rounded-xl transition-all ${
                  isMicOn
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {isMicOn ? (
                  <Mic className="w-6 h-6" />
                ) : (
                  <MicOff className="w-6 h-6" />
                )}
              </button>
            </>
          )}

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <Settings />
          </button>
        </div>

        {!isStreaming && (
          <>
            <button
              onClick={() => {
                startStream();
              }}
              className="px-8 py-4 bg-gradient-to-r flex-1  from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-500/50"
            >
              <Radio className="w-5 h-5 inline mr-2" />
              Start <span className="hidden md:inline">Streaming</span>
            </button>
            {/* <button
              onClick={() => {
                startStream();
              }}
              className="p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <BookmarkCheck className="w-5 h-5 inline mr-2" />
              <span className="hidden md:inline">Save as Drafts</span>
            </button> */}
          </>
        )}
      </div>

      {showSettings && (
        <div className="mt-6 pt-6 border-t border-gray-800 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Camera</label>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="default">Default Camera</option>
              <option value="front">Front Camera</option>
              <option value="back">Back Camera</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Microphone
            </label>
            <select
              value={selectedMic}
              onChange={(e) => setSelectedMic(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="default">Default Microphone</option>
              <option value="external">External Microphone</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamControls;
