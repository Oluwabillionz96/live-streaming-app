"use client";

import { useState } from "react";

import {
  Home,
  Radio,
  Video,
  BarChart3,
  Settings,
  Users,
  Eye,
  TrendingUp,
  Calendar,
  Menu,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { upcomingStreams } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  trend?: "up" | "down";
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm text-[var(--color-text-secondary)]">
          {title}
        </CardTitle>
        <div className="text-[var(--color-text-tertiary)]">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl mb-1">{value}</div>
        {change && (
          <p
            className={`text-xs ${
              trend === "up"
                ? "text-[var(--color-success)]"
                : "text-[var(--color-error)]"
            }`}
          >
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}



export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "golive", label: "Go Live", icon: Radio },
    { id: "streams", label: "Streams", icon: Video },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Top Bar */}
      <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden hover:bg-[var(--color-surface-hover)] size-12"
            >
              {isSidebarOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                <div className="size-6 rounded bg-[var(--color-surface)]" />
              </div>
              <h1 className="text-xl">Creator Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => {}}
              className="border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] h-12 px-6"
            >
              View Channel
            </Button>
            <Avatar className="size-12">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-[81px] left-0 h-[calc(100vh-81px)] w-72 bg-[var(--color-surface)] border-r border-[var(--color-border)] transition-transform duration-300 z-40 ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <nav className="p-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-4 h-12 px-6 ${
                    isActive
                      ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
                      : "hover:bg-[var(--color-surface-hover)]"
                  }`}
                  onClick={() => {
                    if (item.id === "golive") {
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                >
                  <Icon className="size-5" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12">
          {activeTab === "overview" && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
                <StatCard
                  title="Total Followers"
                  value="45.2K"
                  change="+12% from last month"
                  icon={<Users className="size-5" />}
                  trend="up"
                />
                <StatCard
                  title="Total Views"
                  value="1.2M"
                  change="+8% from last month"
                  icon={<Eye className="size-5" />}
                  trend="up"
                />
                <StatCard
                  title="Avg. Viewers"
                  value="3.4K"
                  change="+15% from last month"
                  icon={<TrendingUp className="size-5" />}
                  trend="up"
                />
                <StatCard
                  title="Stream Status"
                  value="Offline"
                  icon={<Radio className="size-5" />}
                />
              </div>

              {/* Quick Actions */}
              <div className="mb-12">
                <Card className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] border-0 text-white">
                  <CardHeader className="pb-6">
                    <CardTitle>Ready to go live?</CardTitle>
                    <CardDescription className="text-white/90">
                      Start streaming in seconds with our easy setup
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      size="lg"
                      className="bg-white text-[var(--color-primary)] hover:bg-white/90 h-12 px-6"
                      onClick={() => {}}
                    >
                      <Radio className="size-5 mr-2" />
                      Start Streaming Now
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Streams */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3>Upcoming Streams</h3>
                  <Button
                    variant="ghost"
                    className="hover:bg-[var(--color-surface-hover)] h-11"
                  >
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {upcomingStreams.map((stream) => (
                    <Card
                      key={stream.id}
                      className="bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-colors cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-5">
                            <div className="size-14 rounded-lg bg-[var(--color-surface-elevated)] flex items-center justify-center">
                              <Calendar className="size-7 text-[var(--color-primary)]" />
                            </div>
                            <div>
                              <h4 className="mb-1">{stream.title}</h4>
                              <p className="text-sm text-[var(--color-text-secondary)]">
                                {stream.scheduledFor}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-[var(--color-surface-elevated)] px-4 py-2"
                          >
                            {stream.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "streams" && (
            <div>
              <h2 className="mb-6">Past Streams</h2>
              <p className="text-[var(--color-text-secondary)]">
                Your stream history will appear here.
              </p>
            </div>
          )}

          {activeTab === "analytics" && (
            <div>
              <h2 className="mb-6">Analytics</h2>
              <p className="text-[var(--color-text-secondary)]">
                Detailed analytics and insights coming soon.
              </p>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="mb-6">Settings</h2>
              <p className="text-[var(--color-text-secondary)]">
                Channel settings and preferences.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
