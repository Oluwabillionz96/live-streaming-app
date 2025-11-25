"use client";

import ImageWithFallback from "@/components/image-with-fallback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Eye, Lock, Radio, Upload } from "lucide-react";
import { useState } from "react";

export default function GoLivePage() {
  const [streamTitle, setStreamTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [thumbnail, setThumbnail] = useState("");

  const handleGoLive = () => {
    // Handle go live logic
    console.log("Going live with:", {
      streamTitle,
      description,
      category,
      isPublic,
      thumbnail,
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Top Bar */}
      <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-8 py-5">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            className="hover:bg-[var(--color-surface-hover)] size-12"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div className="flex items-center gap-4">
            <Radio className="size-7 text-[var(--color-primary)]" />
            <h1 className="text-xl">Go Live</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Setup Form */}
          <div className="space-y-8">
            <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
              <CardHeader className="pb-6">
                <CardTitle>Stream Details</CardTitle>
                <CardDescription className="text-[var(--color-text-secondary)]">
                  Configure your stream settings before going live
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Stream Title */}
                <div className="space-y-3">
                  <Label htmlFor="title">Stream Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a catchy stream title..."
                    value={streamTitle}
                    onChange={(e) => setStreamTitle(e.target.value)}
                    className="bg-[var(--color-surface-elevated)] border-[var(--color-border)] h-12"
                  />
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    {streamTitle.length}/100 characters
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="What's your stream about?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="bg-[var(--color-surface-elevated)] border-[var(--color-border)] resize-none"
                  />
                </div>

                {/* Category */}
                <div className="space-y-3">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-[var(--color-surface-elevated)] border-[var(--color-border)] h-12">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--color-surface-elevated)] border-[var(--color-border)]">
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="chatting">Just Chatting</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Thumbnail Upload */}
                <div className="space-y-3">
                  <Label>Stream Thumbnail</Label>
                  <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-10 text-center hover:border-[var(--color-border-strong)] transition-colors cursor-pointer">
                    <Upload className="size-14 mx-auto mb-4 text-[var(--color-text-tertiary)]" />
                    <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-[var(--color-text-tertiary)]">
                      PNG, JPG up to 10MB (1920x1080 recommended)
                    </p>
                  </div>
                </div>

                {/* Privacy Toggle */}
                <div className="flex items-center justify-between p-6 bg-[var(--color-surface-elevated)] rounded-lg">
                  <div className="flex items-center gap-4">
                    {isPublic ? (
                      <Eye className="size-6 text-[var(--color-success)]" />
                    ) : (
                      <Lock className="size-6 text-[var(--color-text-tertiary)]" />
                    )}
                    <div>
                      <Label htmlFor="privacy" className="cursor-pointer">
                        {isPublic ? "Public Stream" : "Private Stream"}
                      </Label>
                      <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                        {isPublic
                          ? "Anyone can watch your stream"
                          : "Only invited viewers can watch"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="privacy"
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Stream Key Card */}
            <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
              <CardHeader>
                <CardTitle>Stream Key</CardTitle>
                <CardDescription className="text-[var(--color-text-secondary)]">
                  Use this key in your streaming software
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    value="sk_live_xxxxxxxxxxxxxxxxxxxxxxxx"
                    readOnly
                    className="bg-[var(--color-surface-elevated)] border-[var(--color-border)] font-mono text-sm h-12"
                  />
                  <Button
                    variant="outline"
                    className="border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] h-12 px-6"
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-[var(--color-text-tertiary)] mt-3">
                  Never share your stream key with anyone
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-8">
            <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
              <CardHeader className="pb-6">
                <CardTitle>Stream Preview</CardTitle>
                <CardDescription className="text-[var(--color-text-secondary)]">
                  This is how your stream will appear to viewers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preview Thumbnail */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-[var(--color-surface-elevated)]">
                  {thumbnail ? (
                    <ImageWithFallback
                      src={thumbnail}
                      alt="Stream preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Radio className="size-16 mx-auto mb-3 text-[var(--color-text-tertiary)]" />
                        <p className="text-sm text-[var(--color-text-tertiary)]">
                          No thumbnail set
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className="live-badge px-4 py-2 uppercase tracking-wide">
                      Live
                    </Badge>
                  </div>
                  {!isPublic && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[var(--color-text-tertiary)] px-3 py-2">
                        <Lock className="size-3 mr-1" />
                        Private
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Preview Info */}
                <div>
                  <h3 className="mb-3 truncate">
                    {streamTitle || "Your stream title will appear here"}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    {category || "No category selected"}
                  </p>
                  {description && (
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Go Live Button */}
            <Card className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] border-0 text-white">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3">Ready to Go Live?</h3>
                    <p className="text-sm text-white/90 leading-relaxed">
                      Make sure you&apos;ve set up your streaming software and
                      tested your connection before going live.
                    </p>
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-white text-[var(--color-primary)] hover:bg-white/90 h-14"
                    onClick={handleGoLive}
                    disabled={!streamTitle || !category}
                  >
                    <Radio className="size-5 mr-2" />
                    Start Streaming
                  </Button>
                  {(!streamTitle || !category) && (
                    <p className="text-xs text-white/80 text-center">
                      Please fill in all required fields to go live
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
