"use client";

import Header from "@/components/header";
import SideBar from "@/components/side-bar";
import useAuthStore from "@/lib/store/auth-store";
import { redirect, usePathname } from "next/navigation";
import { ReactNode } from "react";

const HomePageLayput = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");
  const isWatch = pathname.startsWith("/watch");

  const session = useAuthStore((state) => state.session);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-color-background">
      <Header isDashboard={isDashboard} isWatch={isWatch} />
      {isDashboard ? <SideBar /> : null}
      <main
        className={`max-w-[1920px] ${
          isDashboard
            ? "ml-[30%] md:ml-[22.5%] md:px-4 px-2 lg:ml-[20%] lg:px-8"
            : "px-4 md:px-8 mx-auto"
        }   mt-[15%] md:mt-[7%] lg:mt-[5%] py-12 overflow-hidden`}
      >
        {children}
      </main>
    </div>
  );
};

export default HomePageLayput;
