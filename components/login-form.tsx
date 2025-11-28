import React, { Dispatch, FormEvent, SetStateAction } from "react";
import { Label } from "./ui/label";
import { Lock, Mail } from "lucide-react";
import { Input } from "./ui/input";
import * as z from "zod";
import { Login } from "@/lib/zod-schema";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { loginFields } from "@/lib/auth-utils";

const LoginForm = () => {
  type LoginDetail = z.infer<typeof Login>;
  const { control, handleSubmit } = useForm<LoginDetail>({
    resolver: zodResolver(Login),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(data: LoginDetail) {
    console.log({ data });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        {loginFields.map((item, index) => (
          <Controller
            name={item.name}
            key={index}
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor={item.id} className="text-[#e4e4e7]">
                  {item.label}
                </FieldLabel>
                <Input
                  {...field}
                  id={item.id}
                  aria-invalid={fieldState.invalid}
                  className="text-[#a1a1aa]"
                  autoFocus={item.autoFocus}
                  type={item.inputType}
                  placeholder={item.placeHolder}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        ))}
      </FieldGroup>

      <Button
        type="submit"
        className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] h-12"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
