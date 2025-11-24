"use client";

import { create } from "zustand";
import { supabase } from "../supabase-client";
import { RegistrationData } from "../types";
import { AuthError, Session } from "@supabase/supabase-js";
import * as z from "zod";
import { Login } from "../zod-schema";

type AuthStore = {
  session: null | Session;
  signUp: (arg: RegistrationData) => Promise<{ error: AuthError } | undefined>;
  updateSession: (arg: null | Session) => void;
  signOut: () => Promise<void>;
  signIn: (arg: z.infer<typeof Login>) => Promise<void>;
};

const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  signUp: async (payload) => {
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
      console.error("Sign up error: ", error);
      return { error };
    }
    return;
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
        console.error({ error });
        return;
      }
      return;
    } catch (error) {
      console.error("Sign in error :", error);
    }
  },
  updateSession: (newSession: null | Session) => set({ session: newSession }),
}));

export default useAuthStore;
