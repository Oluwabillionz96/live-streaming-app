"use client";

import { getCurrentUser } from "@/lib/auth-utils";
import useAuthStore from "@/lib/store/auth-store";
import { supabase } from "@/lib/supabase-client";
import { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const authStore = useAuthStore();
  const { updateSession, session, updateUser } = authStore;
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

  useEffect(() => {
    let isMounted = true; // track if component is still mounted

    async function fetchUser() {
      if (!session) return;

      const currentUser = await getCurrentUser(session);
      if (isMounted) {
        updateUser(currentUser);
      }
    }

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [session, updateUser]);

  if (session === null) return <p>Loading...</p>;

  return <>{children}</>;
};

export default Layout;
