import { ReactNode } from "react";

const AuthFormAltSide = ({ children }: { children: ReactNode }) => {
  return (
    <div className="hidden lg:flex flex-1 bg-linear-to-br from-[#ec4899] to-[#8b5cf6] items-center justify-center p-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 right-1/3 size-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 size-[500px] bg-white rounded-full blur-3xl" />
      </div>
      {children}
    </div>
  );
};

export default AuthFormAltSide;
