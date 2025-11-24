import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Login } from "./zod-schema";
import { Dispatch, SetStateAction } from "react";
import { RegistrationData } from "./types";
import * as z from "zod";
import { toast } from "sonner";
import { AuthError } from "@supabase/supabase-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleRegister = async (
  data: RegistrationData,
  signUp: (arg: RegistrationData) => Promise<{ error: AuthError } | undefined>,
  setOpen: Dispatch<SetStateAction<boolean>>
) => {
  try {
    await signUp(data);
    setOpen(false);
    toast.success("Registeration Successful");
  } catch (error) {
    console.log(error);
  }
};

export async function handleLogin(
  data: z.infer<typeof Login>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  signIn: (arg: z.infer<typeof Login>) => Promise<void>
) {
  await signIn(data);
  setOpen(false);
  toast.success("Login Successful");
}
