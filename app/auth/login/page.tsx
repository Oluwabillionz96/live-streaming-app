"use client";

import { useState } from "react";

import { Mail, Lock, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
    console.log("Login with:", email, password);
    // onNavigate?.("home");
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-12">
        <Card className="w-full max-w-lg bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="space-y-2 pb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                <div className="size-8 rounded-lg bg-[var(--color-surface)]" />
              </div>
              <h2>StreamHub</h2>
            </div>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription className="text-[var(--color-text-secondary)]">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[var(--color-text-tertiary)]" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 bg-[var(--color-surface-elevated)] border-[var(--color-border)] h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    className="text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[var(--color-text-tertiary)]" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 bg-[var(--color-surface-elevated)] border-[var(--color-border)] h-12"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] h-12"
              >
                Sign In
              </Button>
            </form>

            <div className="relative">
              <Separator className="bg-[var(--color-border)]" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-surface)] px-3 text-xs text-[var(--color-text-tertiary)]">
                OR CONTINUE WITH
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] h-12"
              >
                <svg className="size-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] h-12"
              >
                <Github className="size-5 mr-2" />
                GitHub
              </Button>
            </div>

            <p className="text-center text-sm text-[var(--color-text-secondary)] pt-2">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => {}}
                className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
              >
                Sign up
              </button>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Hero */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 size-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 size-[500px] bg-white rounded-full blur-3xl" />
        </div>
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
      </div>
    </div>
  );
}
