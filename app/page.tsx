"use client";
import AuthForm from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/lib/store/auth-store";
import { useState } from "react";

const Home = () => {
  const [formMode, setFormMode] = useState<"login" | "signup">("login");
  const session = useAuthStore((state) => state.session);
  const signOut = useAuthStore((state) => state.signOut);
  const [openForm, setOpenForm] = useState<boolean>(session === null);
  return (
    <>
      {session ? (
        <Button
          onClick={async () => {
            await signOut();
          }}
        >
          Sign Out
        </Button>
      ) : (
        <div className="flex gap-4 relative bg-red-700">
          <Button
            variant={"outline"}
            className="hover:cursor-pointer"
            onClick={() => {
              setFormMode("login");
              setOpenForm(true);
            }}
          >
            Login
          </Button>
          <Button
            variant={"outline"}
            className="hover:cursor-pointer"
            onClick={() => {
              setFormMode("signup");
              setOpenForm(true);
            }}
          >
            Register
          </Button>
          <AuthForm
            open={openForm}
            setOpenForm={setOpenForm}
            mode={formMode}
            setMode={setFormMode}
          />
        </div>
      )}
    </>
  );
};

export default Home;
