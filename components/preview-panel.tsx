import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ImageWithFallback from "./image-with-fallback";
import { BookmarkCheckIcon, Lock, Radio } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import z from "zod";
import { StreamSetupSchema } from "@/lib/zod-schema";
import { Dispatch, SetStateAction } from "react";

const PreviewPanel = ({
  setupFormValues,
  setIsSave,
}: {
  setupFormValues: z.infer<typeof StreamSetupSchema>;
  setIsSave: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    description,
    thumbnail,
    isPublic,
    title: streamTitle,
    category,
  } = setupFormValues;

  return (
    <div className="space-y-8">
      <Card className="bg-(--color-surface) border-(--color-border)">
        <CardHeader className="pb-6">
          <CardTitle className="text-(--color-text-secondary)">
            Stream Preview
          </CardTitle>
          <CardDescription className="text-(--color-text-secondary)">
            This is how your stream will appear to viewers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview Thumbnail */}
          <div className="relative aspect-video rounded-lg overflow-hidden bg-(--color-surface-elevated)">
            {thumbnail ? (
              <ImageWithFallback
                src={URL.createObjectURL(thumbnail)}
                alt="Stream preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Radio className="size-16 mx-auto mb-3 text-(--color-text-tertiary)" />
                  <p className="text-sm text-(--color-text-tertiary)">
                    No thumbnail set
                  </p>
                </div>
              </div>
            )}
            {/* <div className="absolute top-4 left-4">
              <Badge className="live-badge px-4 py-2 uppercase tracking-wide">
                Live
              </Badge>
            </div> */}
            {!isPublic && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-(--color-text-tertiary) px-3 py-2">
                  <Lock className="size-3 mr-1" />
                  Private
                </Badge>
              </div>
            )}
          </div>

          {/* Preview Info */}
          <div>
            <h3 className="mb-3 truncate text-(--color-text-secondary)">
              {streamTitle || "Your stream title will appear here"}
            </h3>
            <p className="text-sm text-(--color-text-secondary) mb-4">
              {category || "No category selected"}
            </p>
            {description && (
              <p className="text-sm text-(--color-text-secondary) line-clamp-3 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Go Live Button */}
      <Card className="bg-linear-to-br from-(--color-primary) to-(--color-accent) border-0 text-white">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div>
              <h3 className="mb-3">Ready to Go Live?</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                Make sure you&apos;ve set up your streaming software and tested
                your connection before going live.
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:flex-row">
              <Button
                size="lg"
                onClick={() => setIsSave(false)}
                className="w-full lg:w-fit flex-1 bg-white text-(--color-primary) hover:bg-white/90 h-14 py-3  lg:py-0 cursor-pointer"
                form="stream_setup_form"
              >
                <Radio className="size-5 mr-2" />
                Start Stream
              </Button>
              <Button
                size="lg"
                form="stream_setup_form"
                onClick={() => setIsSave(true)}
                className="w-full lg:w-fit flex-1 bg-white text-(--color-primary) hover:bg-white/90 h-14 py-3 lg:py-0 cursor-pointer"
              >
                <BookmarkCheckIcon />
                Save Stream
              </Button>
            </div>
            {(!streamTitle || !category) && (
              <p className="text-xs text-white/80 text-center">
                Please fill in all required fields to go live
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewPanel;
