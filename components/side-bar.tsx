import { BarChart3, Home, Radio, Settings, Video } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

const navItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "golive", label: "Go Live", icon: Radio },
  { id: "streams", label: "Streams", icon: Video },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const SideBar = () => {
  const pathname = usePathname();
  return (
    <aside
      className={`fixed bottom-0 top-[81px] left-0 md:h-[calc(100vh-81px)] lg:w-72 bg-(--color-surface) border-r border-(--color-border) transition-transform duration-300 z-40 
         "translate-x-0" 
      `}
    >
      <nav className="p-6 space-y-2 flex flex-col">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === `/dashboard/${item.id}`;
          return (
            <Link
              key={item.id}
              href={item.id === "golive" ? "/go-live" : `/dashboard/${item.id}`}
            >
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`md:w-full w-fit justify-start gap-4 h-12 px-6 ${
                  isActive
                    ? "bg-(--color-primary) hover:bg-(--color-primary-hover)"
                    : "hover:bg-(--color-surface-hover) hover:text-white"
                } hover:cursor-pointer`}
              >
                <Icon className="size-5" />
                <span className="hidden md:block">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;
