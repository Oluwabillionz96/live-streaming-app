// import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Eye, Users } from "lucide-react";
import ImageWithFallback from "./image-with-fallback";

interface StreamCardProps {
  thumbnail: string;
  title: string;
  creatorName: string;
  creatorAvatar: string;
  category: string;
  viewers: number;
  isLive?: boolean;
  onClick?: () => void;
}

export default function StreamCard({
  thumbnail,
  title,
  creatorName,
  creatorAvatar,
  category,
  viewers,
  isLive = true,
  onClick,
}: StreamCardProps) {
  return (
    <div
      className="group cursor-pointer transition-all duration-200 hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative aspect-video rounded-lg overflow-hidden bg-[var(--color-surface)]">
        <ImageWithFallback
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isLive && (
          <div className="absolute top-3 left-3">
            <Badge className="live-badge px-2 py-1 uppercase tracking-wide">
              Live
            </Badge>
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
          <Users className="size-3" />
          <span className="text-xs">{viewers.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-3 flex gap-3">
        <Avatar className="size-10 flex-shrink-0">
          <AvatarImage src={creatorAvatar} alt={creatorName} />
          <AvatarFallback>{creatorName[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="text-[var(--color-text-primary)] truncate group-hover:text-[var(--color-primary-light)] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] truncate">
            {creatorName}
          </p>
          <p className="text-sm text-[var(--color-text-tertiary)]">
            {category}
          </p>
        </div>
      </div>
    </div>
  );
}
