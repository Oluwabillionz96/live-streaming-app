import React, { Dispatch, FormEvent, SetStateAction } from "react";
import { Label } from "./ui/label";
import { Lock, Mail, User } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RegistrationData } from "@/lib/types";

const RegistrationForm = ({
  handleSignup,
  registrationDetails,
  setRegistrationDetails,
}: {
  registrationDetails: RegistrationData;
  handleSignup: (e: FormEvent) => void;
  setRegistrationDetails: Dispatch<SetStateAction<RegistrationData>>;
}) => {
  const { username, password, confirmPassword, email } = registrationDetails;

  return (
    <form onSubmit={handleSignup} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="name" className="text-[#e4e4e7]">
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#71717a]" />
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={username}
            onChange={(e) =>
              setRegistrationDetails((prev) => ({
                ...prev,
                username: e.target.value,
              }))
            }
            className="pl-12 bg-[#212129] border-[#2d2d38] h-12"
            required
          />
        </div>
      </div>

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
              setRegistrationDetails((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="pl-12 bg-[#212129] border-[#2d2d38] h-12"
            required
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="password" className="text-[#e4e4e7]">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#71717a]" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) =>
              setRegistrationDetails((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            className="pl-12 bg-[#212129] border-[#2d2d38] h-12"
            required
          />
        </div>
        <p className="text-xs text-[#71717a]">Must be at least 8 characters</p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="confirm-password" className="text-[#e4e4e7]">
          Confirm Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#71717a]" />
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) =>
              setRegistrationDetails((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            className="pl-12 bg-[#212129] border-[#2d2d38] h-12"
            required
          />
        </div>
        <p className="text-xs text-[#71717a]">Must be at least 8 characters</p>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] h-12"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegistrationForm;
