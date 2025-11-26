"use client";

import ImageWithFallback from "@/components/image-with-fallback";
import PreviewPanel from "@/components/preview-panel";
import SetUpForm from "@/components/set-up-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Lock, Radio } from "lucide-react";
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
    <div className="max-w-7xl mx-auto md:p-8 p-4 lg:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-12">
        <SetUpForm
          streamTitle={streamTitle}
          setStreamTitle={setStreamTitle}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          description={description}
          setDescription={setDescription}
          category={category}
          setCategory={setCategory}
        />

        {/* Preview Panel */}

        <PreviewPanel
          description={description}
          thumbnail={thumbnail}
          isPublic={isPublic}
          streamTitle={streamTitle}
          category={category}
          handleGoLive={handleGoLive}
        />
      </div>
    </div>
  );
}
