import { Stream, StreamMessage } from "@/lib/types";
import { getStreamById, getStreamMessages, getStreams } from "@/lib/utils";
import { useEffect, useState } from "react";

const useStream = (streamId?: string) => {
  const [streams, setStreams] = useState<{
    liveStreams: Stream[];
    upcomingStreams: Stream[];
    pastStreams: Stream[];
  }>({ liveStreams: [], upcomingStreams: [], pastStreams: [] });

  const [messages, setMessages] = useState<StreamMessage[]>([]);
  const [stream, setStream] = useState<Stream>();
  useEffect(() => {
    let ignore = false;

    const load = async () => {
      if (streamId) {
        const [streams, messages, stream] = await Promise.all([
          getStreams(),
          getStreamMessages(streamId ?? ""),
          getStreamById(streamId ?? ""),
        ]);

        if (!ignore) {
          setStreams(streams);
          setMessages(messages);
          setStream(stream);
        }

        return;
      }
      const streams = await getStreams();

      if (!ignore) {
        setStreams(streams);
      }

      return;
    };

    load();

    return () => {
      ignore = true;
    };
  }, [streamId]);

  return { streams, messages, stream };
};

export default useStream;
