import { Video } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const EmptyStreamState = ({
  children,
  streamCountInfo,
  heading,
  info,
}: {
  children: ReactNode;
  streamCountInfo: string;
  heading: string;
  info: string;
}) => {
  return (
    <div>
      <p className="text-gray-400 text-lg mb-8">{streamCountInfo}</p>
      <div className="flex flex-col items-center justify-center md:py-12 lg:py-24 py-6">
        <div className="relative mb-6">{children}</div>

        <h3 className="text-2xl font-bold mb-3">{heading}</h3>
        <p className="text-gray-400 text-center max-w-md mb-8">{info}</p>

        <Link href={"/go-live"}>
          <Button className="px-8 cursor-pointer py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors flex items-center gap-2">
            <Video className="w-5 h-5" />
            Start Streaming
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyStreamState;
