import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RegistrationData } from "@/lib/types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { RegistrationSchema } from "@/lib/zod-schema";
import { handleRegister, registrationFields } from "@/lib/auth-utils";
import useAuthStore from "@/lib/store/auth-store";

const RegistrationForm = () => {
  const { control, handleSubmit } = useForm<RegistrationData>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signUp = useAuthStore((state) => state.signUp);

  async function onSubmit(data: RegistrationData) {
    await handleRegister(data, signUp);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="registration_form"
      className="space-y-6"
    >
      <FieldGroup>
        {registrationFields.map((item, index) => (
          <Controller
            key={index}
            name={item.name}
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
        Create Account
      </Button>
    </form>
  );
};

export default RegistrationForm;
