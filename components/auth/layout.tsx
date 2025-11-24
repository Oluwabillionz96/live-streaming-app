"use client";

import useAuthStore from "@/lib/store/auth-store";
import { supabase } from "@/lib/supabase-client";
import { ReactNode, useEffect, useState } from "react";
import AuthForm from "./auth-form";
import { Button } from "../ui/button";
import Header from "../header";
import SideBar from "../side-bar";
import { AnimatePresence } from "framer-motion";

const Layout = ({ children }: { children: ReactNode }) => {
  const session = useAuthStore((state) => state.session);
  const updateSession = useAuthStore((state) => state.updateSession);
  const signOut = useAuthStore((state) => state.signOut);
  const [formMode, setFormMode] = useState<"login" | "signup">("login");
  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    updateSession(data.session);
  };
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        updateSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  return (
    <>
      <Header
        handleGetStarted={() => {
          setFormMode("login");
          setOpenForm(true);
        }}
        handleOpenSideBar={setIsSideBarOpen}
        handleRegister={() => {
          setFormMode("signup");
          setOpenForm(true);
        }}
      />
      <AnimatePresence mode="wait">
        {isSideBarOpen || window.matchMedia("(min-width: 768px)").matches ? (
          <SideBar handleCloseSideBar={setIsSideBarOpen} />
        ) : null}
      </AnimatePresence>
      <main className="mt-20">
        {session ? (
          <Button
            onClick={async () => {
              await signOut();
            }}
          >
            Sign Out
          </Button>
        ) : (
          <></>
        )}
        <AuthForm
          open={openForm}
          setOpenForm={setOpenForm}
          mode={formMode}
          setMode={setFormMode}
        />
      </main>

      {children}
    </>
  );
};

export default Layout;
