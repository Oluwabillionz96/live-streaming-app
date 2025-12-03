"use client";

import PreviewPanel from "@/components/preview-panel";
import SetUpForm from "@/components/set-up-form";
import { StreamSetupSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export default function GoLivePage() {
  const { control, handleSubmit, watch } = useForm<
    z.infer<typeof StreamSetupSchema>
  >({
    resolver: zodResolver(StreamSetupSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      isPublic: true,
    },
  });

  const setupFormValues: z.infer<typeof StreamSetupSchema> = watch();

  return (
    <div className="max-w-7xl mx-auto md:p-8 p-4 lg:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-12">
        <SetUpForm control={control} handleSubmit={handleSubmit} />

        {/* Preview Panel */}

        <PreviewPanel setupFormValues={setupFormValues} />
      </div>
    </div>
  );
}
