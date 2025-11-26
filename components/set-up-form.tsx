import React, { Dispatch, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Eye, Lock, Upload } from "lucide-react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

const categories = [
  "Gaming",
  "Music",
  "Sports",
  "Creative",
  "Just Chatting",
  "Educational",
];

const SetUpForm = ({
  streamTitle,
  setStreamTitle,
  description,
  setDescription,
  category,
  setCategory,
  isPublic,
  setIsPublic,
}: {
  streamTitle: string;
  setStreamTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  isPublic: boolean;
  setIsPublic: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="space-y-8">
      <Card className="bg-(--color-surface) border-(--color-border)">
        <CardHeader className="pb-6">
          <CardTitle className="text-(--color-text-secondary)">
            Stream Details
          </CardTitle>
          <CardDescription className="text-(--color-text-secondary)">
            Configure your stream settings before going live
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stream Title */}
          <div className="space-y-3">
            <Label htmlFor="title" className="text-(--color-text-secondary)">
              Stream Title
            </Label>
            <Input
              id="title"
              placeholder="Enter a catchy stream title..."
              value={streamTitle}
              onChange={(e) => setStreamTitle(e.target.value)}
              className="bg-(--color-surface-elevated) border-(--color-border) h-12"
            />
            <p className="text-xs text-(--color-text-tertiary)">
              {streamTitle.length}/100 characters
            </p>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label
              htmlFor="description"
              className="text-(--color-text-secondary)"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="What's your stream about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="bg-(--color-surface-elevated) border-(--color-border) resize-none"
            />
          </div>

          {/* Category */}
          <div className="space-y-3">
            <Label htmlFor="category" className="text-(--color-text-secondary)">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-(--color-surface-elevated) border-(--color-border) h-12">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-(--color-surface-elevated) border-(--color-border)">
                {categories.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item.toLocaleLowerCase()}
                    className="text-(--color-text-secondary)"
                  >
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-3">
            <Label className="text-(--color-text-secondary)">
              Stream Thumbnail
            </Label>
            <Input type="file" className="hidden" />
            <div className="border-2 border-dashed border-(--color-border) rounded-lg p-10 text-center hover:border-(--color-border-strong) transition-colors cursor-pointer">
              <Upload className="size-14 mx-auto mb-4 text-(--color-text-tertiary)" />
              <p className="text-sm text-(--color-text-secondary) mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-(--color-text-tertiary)">
                PNG, JPG up to 10MB (1920x1080 recommended)
              </p>
            </div>
          </div>

          {/* Privacy Toggle */}
          <div className="flex items-center justify-between p-6 bg-(--color-surface-elevated) rounded-lg">
            <div className="flex items-center gap-4">
              {isPublic ? (
                <Eye className="size-6 text-(--color-success)" />
              ) : (
                <Lock className="size-6 text-(--color-text-tertiary)" />
              )}
              <div>
                <Label
                  htmlFor="privacy"
                  className="cursor-pointer text-(--color-text-secondary)"
                >
                  {isPublic ? "Public Stream" : "Private Stream"}
                </Label>
                <p className="text-xs text-(--color-text-tertiary) mt-1">
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
      <Card className="bg-(--color-surface) border-(--color-border)">
        <CardHeader>
          <CardTitle className="text-(--color-text-secondary)">
            Stream Key
          </CardTitle>
          <CardDescription className="text-(--color-text-secondary)">
            Use this key in your streaming software
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              value="sk_live_xxxxxxxxxxxxxxxxxxxxxxxx"
              readOnly
              className="bg-(--color-surface-elevated) border-(--color-border) text-(--color-text-secondary) font-mono text-sm h-12"
            />
            <Button
              variant={"link"}
              className="border-(--color-border) hover:bg-(--color-surface-hover) h-12 px-6"
            >
              Copy
            </Button>
          </div>
          <p className="text-xs text-(--color-text-tertiary) mt-3">
            Never share your stream key with anyone
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetUpForm;
