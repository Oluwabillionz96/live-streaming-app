"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Radio } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const GoLiveLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
     <div className="min-h-screen bg-(--color-background)">
      <header className="bg-(--color-surface) border-b border-(--color-border) px-8 py-5">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="hover:bg-(--color-surface-hover) hover:text-white size-12"
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div className="flex items-center gap-4">
            <Radio className="size-7 text-(--color-primary)" />
            <h1 className="text-xl">Go Live</h1>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
};

export default GoLiveLayout;
