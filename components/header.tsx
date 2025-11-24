import { Menu, UserRound } from "lucide-react";
import { Button } from "./ui/button";
import useAuthStore from "@/lib/store/auth-store";
import { Dispatch, SetStateAction } from "react";

const Header = ({
  handleGetStarted,
  handleOpenSideBar,
  handleRegister,
}: {
  handleGetStarted: () => void;
  handleOpenSideBar: Dispatch<SetStateAction<boolean>>;
  handleRegister: () => void;
}) => {
  const session = useAuthStore((state) => state.session);
  return (
    <header className="flex items-center justify-between py-4 px-2 md:px-4 border-b fixed top-0 left-0 right-0">
      <Button
        size="icon-lg"
        variant={"ghost"}
        className="md:hidden"
        onClick={() => handleOpenSideBar(true)}
      >
        <Menu />
      </Button>
      <p className="font-bold text-4xl md:text-6xl">Stitch</p>
      {session ? (
        <Button
          size={"icon"}
          className="rounded-full text-[#FF7F00] bg-[#f7d0a9] hover:bg-[#f7d0a9]"
        >
          <UserRound />
        </Button>
      ) : (
        <>
          {" "}
          <Button className="md:hidden bg-[#FF7F00]" onClick={handleGetStarted}>
            Get Started
          </Button>
          <div className="md:flex gap-6 hidden">
            <Button
              onClick={handleGetStarted}
              className="bg-[#FF7F00] hover:bg-[#FF7F00]"
            >
              Login
            </Button>
            <Button
              onClick={handleRegister}
              className="bg-[#FF7F00] hover:bg-[#FF7F00]"
            >
              Sign up
            </Button>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
