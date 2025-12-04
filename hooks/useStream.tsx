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
    };

    load();

    return () => {
      ignore = true;
    };
  }, []);

  return { streams, messages, stream };
};

export default useStream;
