"use client";

import useAuthStore from "@/lib/store/auth-store";
import { supabase } from "@/lib/supabase-client";
import { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const updateSession = useAuthStore((state) => state.updateSession);
  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    updateSession(data.session ?? false);
  };

  useEffect(() => {
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        updateSession(session ?? false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  return <>{children}</>;
};

export default Layout;
