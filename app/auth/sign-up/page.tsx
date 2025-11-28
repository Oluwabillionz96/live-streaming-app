import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import RegistrationForm from "@/components/registration-form";
import AuthFormAltSide from "@/components/auth-form-alt-side";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      <AuthFormAltSide>
        <div className="relative text-white w-full">
          <h1 className="mb-8">Create your creator account</h1>
          <p className="text-lg text-white/90 mb-12 leading-relaxed">
            Build your audience, connect with viewers, and turn your passion
            into a thriving community. Everything you need to succeed.
          </p>
          <div className="space-y-5">
            {[
              "Stream in HD quality with zero delay",
              "Powerful analytics and insights",
              "Monetization tools and support",
              "24/7 creator support team",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="size-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-white/90 text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </AuthFormAltSide>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center md:p-12 md:px-6 lg:px-12 p-2 py-4 overflow-x-hidden">
        <Card className="w-full max-w-lg bg-[#18181f] border-[#2d2d38]">
          <CardHeader className="space-y-2 pb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center">
                <div className="size-8 rounded-lg bg-[#18181f]" />
              </div>
              <h2 className="text-[#e4e4e7]">StreamHub</h2>
            </div>
            <CardTitle className="text-[#e4e4e7]">Create an account</CardTitle>
            <CardDescription className="text-[#a1a1aa]">
              Join our community of creators today
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <RegistrationForm />

            <Link href={"/auth/login"}>
              <Button
                variant={"link"}
                className="text-[#8b5cf6] text-center text-sm w-full pt-2 hover:text-[#7c3aed]"
              >
                Already have an account? Sign in
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
