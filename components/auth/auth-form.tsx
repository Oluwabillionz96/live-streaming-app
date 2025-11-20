"use client";

import { Dispatch, SetStateAction } from "react";
import LoginForm from "./login-form";
import RegistrationForm from "./registration-form";

const AuthForm = ({
  open,
  setOpenForm,
  mode,
  setMode,
}: {
  open: boolean;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  mode: "login" | "signup";
  setMode: Dispatch<SetStateAction<"login" | "signup">>;
}) => {
  if (!open) return null;
  return (
    <div className="fixed top-0 left-0 h-full w-full  bg-black/70 backdrop-blur-lg px-2 md:p-0 grid place-items-center">
      {mode === "login" ? (
        <LoginForm setMode={setMode} setOpenForm={setOpenForm} />
      ) : (
        <RegistrationForm setMode={setMode} setOpenForm={setOpenForm} />
      )}
    </div>
  );
};
export default AuthForm;
