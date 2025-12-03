import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AuthFormAltSide from "@/components/auth-form-alt-side";
import Link from "next/link";
import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center md:p-12 lg:px-12 md:px-6 px-2 py-4">
        <Card className="w-full max-w-lg bg-[#18181f] border-[#2d2d38]">
          <CardHeader className="space-y-2 pb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center">
                <div className="size-8 rounded-lg bg-[#18181f]" />
              </div>
              <h2 className="text-[#e4e4e7]">StreamHub</h2>
            </div>
            <CardTitle className="text-[#e4e4e7]">Welcome back</CardTitle>
            <CardDescription className="text-[#a1a1aa]">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <LoginForm />

            <Link href={"/auth/sign-up"}>
              <Button
                variant={"link"}
                className="text-[#8b5cf6] w-full hover:cursor-pointer text-center text-sm pt-2 hover:text-[#7c3aed]"
              >
                Don&apos;t have an account? Sign up
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Hero */}
      <AuthFormAltSide>
        <div className="relative text-white text-center max-w-lg">
          <h1 className="mb-8">Start streaming your passion</h1>
          <p className="text-lg text-white/90 mb-12 leading-relaxed">
            Join thousands of creators sharing their content with the world.
            Build your community and grow your channel.
          </p>
          <div className="flex items-center justify-center gap-12 text-white/80">
            <div>
              <div className="text-4xl mb-2">10M+</div>
              <div className="text-sm">Active Users</div>
            </div>
            <div className="h-16 w-px bg-white/30" />
            <div>
              <div className="text-4xl mb-2">500K+</div>
              <div className="text-sm">Creators</div>
            </div>
            <div className="h-16 w-px bg-white/30" />
            <div>
              <div className="text-4xl mb-2">24/7</div>
              <div className="text-sm">Live Streams</div>
            </div>
          </div>
        </div>
      </AuthFormAltSide>
    </div>
  );
}
