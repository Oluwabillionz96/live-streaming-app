"use client";

import { useState } from "react";

import { Mail, Lock, User, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SignupPageProps {
  onNavigate?: (page: string) => void;
}

export default function SignupPage({ onNavigate }: SignupPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic
    console.log("Signup with:", name, email, password);
    onNavigate?.("home");
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex ">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 right-1/3 size-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/3 size-[500px] bg-white rounded-full blur-3xl" />
        </div>
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
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-12">
        <Card className="w-full max-w-lg bg-[var(--color-surface)] border-[var(--color-border)]">
          <CardHeader className="space-y-2 pb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                <div className="size-8 rounded-lg bg-[var(--color-surface)]" />
              </div>
              <h2>StreamHub</h2>
            </div>
            <CardTitle>Create an account</CardTitle>
            <CardDescription className="text-[var(--color-text-secondary)]">
              Join our community of creators today
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[var(--color-text-tertiary)]" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-12 bg-[var(--color-surface-elevated)] border-[var(--color-border)] h-12"
                    required
                  />
                </div>
              </div>

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
                <Label htmlFor="password">Password</Label>
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
                <p className="text-xs text-[var(--color-text-tertiary)]">
                  Must be at least 8 characters
                </p>
              </div>

              <div className="flex items-start gap-3 py-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) =>
                    setAgreedToTerms(checked === true)
                  }
                  className="mt-1"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm cursor-pointer leading-relaxed"
                >
                  I agree to the{" "}
                  <span className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
                    Privacy Policy
                  </span>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] h-12"
                disabled={!agreedToTerms}
              >
                Create Account
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
              Already have an account?{" "}
              <button
                onClick={() => onNavigate?.("login")}
                className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
              >
                Sign in
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
