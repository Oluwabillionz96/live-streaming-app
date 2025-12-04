"use client";

import useAuthStore from "@/lib/store/auth-store";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const session = useAuthStore((state) => state.session);

  if (session === null) {
    return <>Loading...</>;
  }

  if (session) {
    redirect("/");
  }

  return <>{children}</>;
};

export default AuthLayout;
