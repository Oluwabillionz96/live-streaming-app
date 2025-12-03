"use client";

import { Input } from "./ui/input";
import * as z from "zod";
import { Login } from "@/lib/zod-schema";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { loginFields, handleLogin } from "@/lib/auth-utils";
import useAuthStore from "@/lib/store/auth-store";
import Spinner from "./spinner";

const LoginForm = () => {
  type LoginDetail = z.infer<typeof Login>;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginDetail>({
    resolver: zodResolver(Login),
    defaultValues: { email: "", password: "" },
  });
  const signIn = useAuthStore((state) => state.signIn);

  async function onSubmit(data: LoginDetail) {
    await handleLogin(data, signIn);
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
        className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] hover:cursor-pointer h-12 disabled:hover:cursor-not-allowed "
        disabled={isSubmitting}
      >
        {isSubmitting && <Spinner />}
        {!isSubmitting ? "Sign In" : "Loading..."}
      </Button>
    </form>
  );
};

export default LoginForm;
