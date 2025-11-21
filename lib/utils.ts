import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Login } from "./zod-schema";
import { Dispatch, SetStateAction } from "react";
import { RegistrationData } from "./types";
import * as z from "zod";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleRegister = (
  data: RegistrationData,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  console.log({ registrationData: data });
  setOpen(false);
  toast.success("Registeration Successful");
};

export function handleLogin(
  data: Record<string, string>,
  setOpen: Dispatch<SetStateAction<boolean>>
) {
  try {
    const loginData = Login.parse(data);
    console.log({ loginData });
    setOpen(false);
    toast.success("Login Successful");
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.issues[0].message;
      toast.error(message);
    }
  }
}
