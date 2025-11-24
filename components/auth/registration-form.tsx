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
import { handleRegister } from "@/lib/utils";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RegistrationData } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Registration } from "@/lib/zod-schema";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { registrationFields } from "./auth-utils";
import useAuthStore from "@/lib/store/auth-store";
const RegistrationForm = ({
  setMode,
  setOpenForm,
}: {
  setMode: Dispatch<SetStateAction<"login" | "signup">>;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegistrationData>({
    resolver: zodResolver(Registration),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });

  const signUp = useAuthStore((state) => state.signUp);

  const onSubmit: SubmitHandler<RegistrationData> = (data) => {
    handleRegister(data, signUp, setOpenForm);
  };
  return (
    <Card className="w-full md:max-w-md">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-center text-xl md:text-2xl w-full">
          Join Stitch Today
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
        {" "}
        <form onSubmit={handleSubmit(onSubmit)} id="registration-form">
          <FieldGroup>
            {registrationFields.map((item, index) => (
              <Controller
                key={index}
                name={item.name}
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Field data-invalid={fieldState.invalid} className="gap-2">
                      <FieldLabel htmlFor={item.id}>{item.label}</FieldLabel>
                      <Input
                        {...field}
                        id={item.id}
                        aria-invalid={fieldState.invalid}
                        placeholder={item.placeHolder}
                        autoFocus={item.autoFocus}
                        type={item.inputType}
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
        <Button
          type="submit"
          className="w-full hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          form="registration-form"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Sign Up"}
        </Button>
        <Button
          variant={"link"}
          onClick={() => {
            setMode("login");
          }}
          className="hover:cursor-pointer"
        >
          Have an Account? Log in
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegistrationForm;
