import { Stream } from "@/lib/types";
import { getStreams } from "@/lib/utils";
import { useEffect, useState } from "react";

const useStream = () => {
  const [streams, setStreams] = useState<{
    liveStreams: Stream[];
    upcomingStreams: Stream[];
    pastStreams: Stream[];
  }>({ liveStreams: [], upcomingStreams: [], pastStreams: [] });

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      const streams = await getStreams();
      if (!ignore) setStreams(streams);
    };

    load();

    return () => {
      ignore = true;
    };
  }, []);

  return { streams };
};

export default useStream;
