import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ImageWithFallback from "./image-with-fallback";
import { Users, Video } from "lucide-react";
import { Stream } from "@/lib/types";

export default function StreamCard({
  thumbnail_url,
  title,
  category,
  status,
  profiles,
}: Stream) {
  return (
    <div className="group cursor-pointer transition-all duration-200 hover:scale-[1.02]">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-(--color-surface)">
        {thumbnail_url ? (
          <ImageWithFallback
            src={thumbnail_url}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          // Default thumbnail when no image is provided
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-purple-900 to-gray-900">
            <Video className="w-16 h-16 text-purple-400 opacity-50" />
          </div>
        )}

        {status === "live" && (
          <div className="absolute top-3 left-3">
            <Badge className="live-badge px-2 py-1 uppercase tracking-wide">
              Live
            </Badge>
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
          <Users className="size-3" />
        </div>
      </div>

      <div className="mt-3 flex gap-3">
        <Avatar className="size-10 shrink-0">
          <AvatarImage
            src={profiles.avatar_url ? profiles.avatar_url : undefined}
            alt={profiles.username}
            className="object-cover"
          />
          <AvatarFallback className="text-purple-900">
            {profiles.username.trim()[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="text-(--color-text-primary) truncate group-hover:text-(--color-primary-light) transition-colors">
            {title}
          </h3>
          <p className="text-sm text-(--color-text-secondary) truncate">
            {profiles.username}
          </p>
          <p className="text-sm text-(--color-text-tertiary)">{category}</p>
        </div>
      </div>
    </div>
  );
}
