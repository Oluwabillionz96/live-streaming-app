import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

const HomePageLayput = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-color-background">
      <header className="fixed top-0 left-0 right-0 w-full bg-background z-50">
        <nav className="top-0 z-50 bg-(--color-surface) border-b border-(--color-border) ">
          <div className="max-w-[1920px] w-full mx-auto px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-linear-to-br from-(--color-primary) to-(--color-accent) flex items-center justify-center">
                <div className="size-6 rounded bg-(--color-surface)" />
              </div>
              <h1 className="text-xl hidden md:block">StreamHub</h1>
            </div>

            <div className="flex items-center gap-4">
              <Link href={"/go-live"}>
                <Button
                  variant="default"
                  className="bg-(--color-primary) hover:bg-(--color-primary-hover) hover:cursor-pointer h-12 px-6"
                >
                  Go Live
                </Button>
              </Link>
              <Avatar className="size-12 cursor-pointer hover:ring-2 ring-(--color-primary) transition-all">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                  className="object-cover"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </nav>
      </header>
      <main className="max-w-[1920px] mx-auto md:px-8 px-4 py-12 mt-[15%] md:mt-[7%] lg:mt-[5%]">
        {children}
      </main>
    </div>
  );
};

export default HomePageLayput;
