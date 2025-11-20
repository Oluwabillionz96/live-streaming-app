"use client";
import AuthForm from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Home = () => {
  const [openForm, setOpenForm] = useState(true);
  const [formMode, setFormMode] = useState<"login" | "signup">("login");
  return (
    <>
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
    </>
  );
};

export default Home;
