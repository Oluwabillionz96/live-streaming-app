import { RegistrationData, User } from "./types";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import z from "zod";
import { Login } from "./zod-schema";
import { supabase } from "./supabase-client";
import { Session } from "@supabase/supabase-js";

export const registrationFields: {
  name: "email" | "username" | "password" | "confirmPassword";
  id: string;
  label: string;
  inputType?: string;
  placeHolder?: string;
  autoFocus?: boolean;
}[] = [
  {
    name: "email",
    id: "email",
    label: "Email",
    inputType: "email",
    placeHolder: "johndoe96@gmail.com",
    autoFocus: true,
  },
  {
    name: "username",
    id: "username",
    placeHolder: "john_doe",
    label: "Username",
  },
  {
    name: "password",
    id: "password",
    label: "Password",
    inputType: "password",
    placeHolder: "••••••••",
  },
  {
    name: "confirmPassword",
    id: "confirmPassword",
    label: "Confirm Password",
    inputType: "password",
    placeHolder: "••••••••",
  },
];

export const loginFields: {
  name: "email" | "password";
  id: string;
  label: string;
  inputType?: string;
  placeHolder?: string;
  autoFocus?: boolean;
}[] = [
  {
    name: "email",
    id: "email",
    label: "Email",
    inputType: "email",
    placeHolder: "johndoe96@gmail.com",
    autoFocus: true,
  },

  {
    name: "password",
    id: "password",
    label: "Password",
    inputType: "password",
  },
];

export async function handleRegister(
  data: RegistrationData,
  signUp: (
    data: RegistrationData
  ) => Promise<
    | { success: boolean; message: string }
    | { success: boolean; message?: undefined }
  >
) {
  const result = await signUp(data);
  if (!result.success) {
    toast.error(result.message);
    return;
  }

  toast.success("Reistration sucessful");
  redirect("/");
}

export async function handleLogin(
  data: z.infer<typeof Login>,
  signIn: (
    data: z.infer<typeof Login>
  ) => Promise<
    | { success: boolean; message: string }
    | { success: boolean; message?: undefined }
  >
) {
  const result = await signIn(data);
  if (!result.success) {
    toast.error(result.message);
  }

  toast.success("Login successful");
  redirect("/");
  return;
}

export async function getCurrentUser(
  session: Session | null | false
): Promise<User | null> {
  if (!session) return null;

  const user = session.user;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single(); // only one row expected

  if (profileError) {
    return {
      username: user.user_metadata.username,
      id: user.id,
      created_at: user.created_at,
      avatar_url: "",
    };
  }

  return profile;
}
