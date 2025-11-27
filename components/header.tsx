import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = ({ isDashboard }: { isDashboard: boolean }) => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-background z-50">
      <nav className="top-0 z-50 bg-(--color-surface) border-b border-(--color-border) ">
        <div className="max-w-[1920px] w-full mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-lg bg-linear-to-br from-(--color-primary) to-(--color-accent) flex items-center justify-center">
              <div className="size-6 rounded bg-(--color-surface)" />
            </div>
            <h1 className="text-xl hidden md:block">
              {isDashboard ? "Creator Dashboard" : "StreamHub"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {!isDashboard ? (
              <Link href={"/go-live"}>
                <Button
                  variant="default"
                  className="bg-(--color-primary) hover:bg-(--color-primary-hover) hover:cursor-pointer h-12 px-6"
                >
                  Go Live
                </Button>
              </Link>
            ) : (
              <Link href={"/"}>
                <Button
                  variant="default"
                  className="bg-(--color-primary) hover:bg-(--color-primary-hover) hover:cursor-pointer h-12 px-6"
                >
                  View Channel
                </Button>
              </Link>
            )}
            <Link href={"/dashboard/overview"} className="hover:cursor-pointer">
              <Avatar className="size-12 cursor-pointer hover:ring-2 ring-(--color-primary) transition-all">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                  className="object-cover"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
