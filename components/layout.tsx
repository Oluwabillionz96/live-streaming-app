"use client";

import useAuthStore from "@/lib/store/auth-store";
import { supabase } from "@/lib/supabase-client";
import { getCurrentUser } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const authStore = useAuthStore();
  const { updateSession, session, updateUser } = authStore;
  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    updateSession(data.session ?? false);
  };

  const [loading, setLoading] = useState(true);

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
    async function fetchUser() {
      const currentUser = await getCurrentUser(session);
      updateUser(currentUser);
      setLoading(false);
    }

    fetchUser();
  }, [session, updateUser]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
};

export default Layout;
