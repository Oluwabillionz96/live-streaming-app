// TODO: Input Error State

import { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { handleLogin } from "@/lib/utils";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Login } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { loginFields } from "./auth-utils";

const LoginForm = ({
  setMode,
  setOpenForm,
}: {
  setMode: Dispatch<SetStateAction<"login" | "signup">>;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const { handleSubmit, control } = useForm<z.infer<typeof Login>>({
    resolver: zodResolver(Login),
  });
  const onSubmit: SubmitHandler<z.infer<typeof Login>> = (data) => {
    handleLogin(data, setOpenForm);
  };
  return (
    <Card className="w-full md:max-w-md">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-center text-xl md:text-2xl w-full">
          Login to Stitch
        </CardTitle>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setOpenForm(false)}
        >
          <X />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} id="login-form">
          <FieldGroup>
            {loginFields.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                render={({ field, fieldState }) => {
                  console.log({ field, fieldState });
                  return (
                    <Field data-invalid={fieldState.invalid} className="gap-2">
                      <FieldLabel htmlFor={item.id}>{item.label}</FieldLabel>
                      <Input
                        {...field}
                        id={item.id}
                        aria-invalid={fieldState.invalid}
                        placeholder={item.placeHolder}
                        autoFocus={item.autoFocus}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  );
                }}
              />
            ))}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button type="submit" className="w-full" form="login-form">
          Log In
        </Button>
        <Button
          variant={"link"}
          onClick={() => {
            setMode("signup");
          }}
        >
          Don&apos;t have an account? Sign up
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
