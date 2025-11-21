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
const RegistrationForm = ({
  setMode,
  setOpenForm,
}: {
  setMode: Dispatch<SetStateAction<"login" | "signup">>;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const { control, handleSubmit } = useForm<RegistrationData>({
    resolver: zodResolver(Registration),
  });

  const onSubmit: SubmitHandler<RegistrationData> = (data) =>
    handleRegister(data, setOpenForm);

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
        <Button
          type="submit"
          className="w-full hover:cursor-pointer"
          form="registration-form"
        >
          Sign Up
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
