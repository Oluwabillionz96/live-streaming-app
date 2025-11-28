"use client";

import { create } from "zustand";
import { supabase } from "../supabase-client";
import { RegistrationData } from "../types";
import { Session } from "@supabase/supabase-js";
import * as z from "zod";
import { Login } from "../zod-schema";

type AuthStore = {
  session: null | Session;
  signUp: (
    arg: RegistrationData
  ) => Promise<
    | { success: boolean; message: string }
    | { success: boolean; message?: undefined }
  >;
  updateSession: (arg: null | Session) => void;
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
  signUp: async (payload) => {
    try {
      const { error } = await supabase.auth.signUp({
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
  updateSession: (newSession: null | Session) => set({ session: newSession }),
}));

export default useAuthStore;
