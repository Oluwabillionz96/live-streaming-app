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
import {
  Control,
  Controller,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import z from "zod";
import { StreamSetupSchema } from "@/lib/zod-schema";
import { Field, FieldError, FieldLabel } from "./ui/field";
import Image from "next/image";
import useStreamStore from "@/lib/store/stream-store";
import { redirect } from "next/navigation";
import useAuthStore from "@/lib/store/auth-store";
import { StreamAction } from "@/lib/utils";

const categories = [
  "Gaming",
  "Music",
  "Sports",
  "Creative",
  "Just Chatting",
  "Educational",
];

const SetUpForm = ({
  control,
  handleSubmit,
  isSave,
}: {
  control: Control<z.infer<typeof StreamSetupSchema>>;
  handleSubmit: UseFormHandleSubmit<z.infer<typeof StreamSetupSchema>>;
  isSave: boolean;
}) => {
  const setStreamInfo = useStreamStore((state) => state.setStreamInfo);
  const setCanStream = useStreamStore((state) => state.setCanStream);
  const user = useAuthStore((state) => state.user);

  async function handleSave(streamData: z.infer<typeof StreamSetupSchema>) {
    const data = await StreamAction(streamData, user?.id ?? "", "upcoming");
    console.log({ data });
  }

  async function startStream(streamData: z.infer<typeof StreamSetupSchema>) {
    const data = await StreamAction(streamData, user?.id ?? "", "live");
    return data;
  }

  const onSubmit: SubmitHandler<z.infer<typeof StreamSetupSchema>> = async (
    data
  ) => {
    if (isSave) {
      await handleSave(data);
      redirect("/dashboard/streams");
    }

    const streamData = await startStream(data);
    redirect(`/studio/${streamData.id}`);
  };
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
        <CardContent>
          {/* Stream Title */}
          <form
            className="space-y-6"
            id="stream_setup_form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel
                    htmlFor="title"
                    className="text-(--color-text-secondary)"
                  >
                    Stream Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={fieldState.invalid}
                    className="bg-(--color-surface-elevated) border-(--color-border) h-12 text-[#a1a1aa]"
                    autoFocus
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel
                    htmlFor="description"
                    className="text-(--color-text-secondary)"
                  >
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    className="bg-(--color-surface-elevated) border-(--color-border)  text-[#a1a1aa] resize-none"
                    rows={5}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={control}
              name="category"
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <Label
                    htmlFor="category"
                    className="text-(--color-text-secondary)"
                  >
                    Category
                  </Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="category"
                      className="bg-(--color-surface-elevated) border-(--color-border) h-12"
                    >
                      <SelectValue
                        placeholder="Select a category"
                        className="text-[#a1a1aa]"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-(--color-surface-elevated) border-(--color-border)">
                      {categories.map((item, index) => (
                        <SelectItem
                          key={index}
                          value={item.toLowerCase()}
                          className="text-(--color-text-secondary)"
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <p className="text-sm text-destructive">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="thumbnail"
              render={({
                field: { onChange, value, ...field },
                fieldState,
              }) => (
                <div className="space-y-3">
                  <Label className="text-(--color-text-secondary)">
                    Stream Thumbnail
                  </Label>
                  <Input
                    {...field}
                    type="file"
                    className="hidden"
                    id="thumbnail-upload"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="block border-2 border-dashed border-(--color-border) rounded-lg p-10 text-center hover:border-(--color-border-strong) transition-colors cursor-pointer"
                  >
                    {value ? (
                      <div className="space-y-2">
                        <Image
                          src={URL.createObjectURL(value)}
                          alt="Thumbnail preview"
                          width={1920}
                          height={1080}
                          className="max-h-48 mx-auto rounded-lg object-cover w-auto"
                          unoptimized
                        />
                        <p className="text-sm text-(--color-text-secondary)">
                          {value.name}
                        </p>
                        <p className="text-xs text-(--color-text-tertiary)">
                          Click to change
                        </p>
                      </div>
                    ) : (
                      <>
                        <Upload className="size-14 mx-auto mb-4 text-(--color-text-tertiary)" />
                        <p className="text-sm text-(--color-text-secondary) mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-(--color-text-tertiary)">
                          PNG, JPG up to 10MB (1920x1080 recommended)
                        </p>
                      </>
                    )}
                  </label>
                  {fieldState.error && (
                    <p className="text-sm text-destructive">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="isPublic"
              render={({ field }) => (
                <div className="flex items-center justify-between p-6 bg-(--color-surface-elevated) rounded-lg">
                  <div className="flex items-center gap-4">
                    {field.value ? (
                      <Eye className="size-6 text-(--color-success)" />
                    ) : (
                      <Lock className="size-6 text-(--color-text-tertiary)" />
                    )}
                    <div>
                      <Label
                        htmlFor="privacy"
                        className="cursor-pointer text-(--color-text-secondary)"
                      >
                        {field.value ? "Public Stream" : "Private Stream"}
                      </Label>
                      <p className="text-xs text-(--color-text-tertiary) mt-1">
                        {field.value
                          ? "Anyone can watch your stream"
                          : "Only invited viewers can watch"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="privacy"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />
          </form>
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
