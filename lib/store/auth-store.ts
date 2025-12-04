"use client";

import { create } from "zustand";
import { supabase } from "../supabase-client";
import { RegistrationData, User } from "../types";
import { Session } from "@supabase/supabase-js";
import * as z from "zod";
import { Login } from "../zod-schema";

type AuthStore = {
  session: null | Session | false;
  user: User | null | Session["user"];
  updateUser: (user: User | null | Session["user"]) => void;
  signUp: (
    arg: RegistrationData
  ) => Promise<
    | { success: boolean; message: string }
    | { success: boolean; message?: undefined }
  >;
  updateSession: (arg: null | Session | false) => void;
  signOut: () => Promise<void>;
  signIn: (
    arg: z.infer<typeof Login>
  ) => Promise<
    | { success: boolean; message: string }
    | { success: boolean; message?: undefined }
  >;
};

const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  user: null,
  signUp: async (payload) => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          data: {
            username: payload.username,
          },
        },
      });

      if (error) {
        // Normalize Supabase error messages
        return {
          success: false,
          message: error.message || "Something went wrong during sign up.",
        };
      }

      const user = data.user;
      if (!user) throw new Error("Signup failed: no user returned.");

      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.id,
        username: user.user_metadata.username,
        created_at: user.created_at,
      });

      if (profileError) throw new Error(profileError.message);

      return { success: true };
    } catch (err) {
      // Catch unexpected runtime errors
      return {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "Unexpected error occurred during sign up.",
      };
    }
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error : ", error);
    }
  },
  signIn: async (payload) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

      if (error) {
        // Normalize Supabase error messages
        return {
          success: false,
          message: error.message || "Something went wrong during sign up.",
        };
      }
      return { success: true };
    } catch (err) {
      // Catch unexpected runtime errors
      return {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "Unexpected error occurred during sign up.",
      };
    }
  },
  updateSession: (newSession) => set({ session: newSession }),
  updateUser: (user) => set({ user }),
}));

export default useAuthStore;
