import React, { Dispatch, FormEvent, SetStateAction } from "react";
import { Label } from "./ui/label";
import { Lock, Mail } from "lucide-react";
import { Input } from "./ui/input";
import * as z from "zod";
import { Login } from "@/lib/zod-schema";
import { Button } from "./ui/button";

const LoginForm = ({
  handleLogin,
  loginDetails,
  setloginDetails,
}: {
  handleLogin: (e: FormEvent) => void;
  loginDetails: z.infer<typeof Login>;
  setloginDetails: Dispatch<SetStateAction<z.infer<typeof Login>>>;
}) => {
  const { email, password } = loginDetails;
  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="email" className="text-[#e4e4e7]">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#71717a]" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) =>
              setloginDetails((prev) => ({ ...prev, email: e.target.value }))
            }
            className="pl-12 bg-[#212129] border-[#2d2d38] h-12 text-[#e4e4e7]"
            required
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-[#e4e4e7]">
            Password
          </Label>
          <button
            type="button"
            className="text-xs text-[#8b5cf6] hover:text-[#7c3aed]"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#71717a]" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) =>
              setloginDetails((prev) => ({ ...prev, password: e.target.value }))
            }
            className="pl-12 bg-[#212129] border-[#2d2d38] h-12 text-[#e4e4e7]"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] h-12"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
