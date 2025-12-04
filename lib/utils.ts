import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChatMessage, Stream, UpcomingStream, User } from "./types";
import { supabase } from "./supabase-client";
import { Session } from "@supabase/supabase-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const mockStreams = [
  {
    id: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    title: "Pro Tournament Finals - Epic Gameplay",
    creatorName: "ProGamer_X",
    creatorAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    category: "Gaming",
    viewers: 12453,
  },
  {
    id: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
    title: "Late Night Chill Beats Session",
    creatorName: "MusicMaster",
    creatorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    category: "Music",
    viewers: 8234,
  },
  {
    id: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    title: "Digital Art Creation - Landscape Painting",
    creatorName: "ArtistPro",
    creatorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    category: "Creative",
    viewers: 3421,
  },
  {
    id: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80",
    title: "Championship League Match Live",
    creatorName: "SportsCenter",
    creatorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    category: "Sports",
    viewers: 25678,
  },
  {
    id: 5,
    thumbnail:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
    title: "Speed Running Challenge - World Record Attempt",
    creatorName: "SpeedyRunner",
    creatorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    category: "Gaming",
    viewers: 15890,
  },
  {
    id: 6,
    thumbnail:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    title: "Electronic Music Production Tutorial",
    creatorName: "BeatMaker",
    creatorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    category: "Music",
    viewers: 5432,
  },
  {
    id: 7,
    thumbnail:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
    title: "Multiplayer Battle Royale Stream",
    creatorName: "GamerQueen",
    creatorAvatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
    category: "Gaming",
    viewers: 9876,
  },
  {
    id: 8,
    thumbnail:
      "https://images.unsplash.com/photo-1618609377864-68609b857e90?w=800&q=80",
    title: "3D Modeling Workshop - Character Design",
    creatorName: "3D_Creator",
    creatorAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
    category: "Creative",
    viewers: 2109,
  },
];

export const upcomingStreams: UpcomingStream[] = [
  {
    id: 1,
    title: "Weekly Gaming Marathon",
    scheduledFor: "Tomorrow at 3:00 PM",
    category: "Gaming",
  },
  {
    id: 2,
    title: "Q&A Session with Followers",
    scheduledFor: "Friday at 7:00 PM",
    category: "Just Chatting",
  },
  {
    id: 3,
    title: "Tutorial: Advanced Strategies",
    scheduledFor: "Sunday at 2:00 PM",
    category: "Educational",
  },
];

export const mockMessages: ChatMessage[] = [
  {
    id: 1,
    username: "GamerFan123",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    message: "This is amazing! 🔥",
    timestamp: "2:34 PM",
  },
  {
    id: 2,
    username: "StreamLover",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    message: "Great content as always!",
    timestamp: "2:35 PM",
  },
  {
    id: 3,
    username: "ProPlayer_X",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    message: "How did you pull that off?",
    timestamp: "2:36 PM",
  },
  {
    id: 4,
    username: "ChatMaster",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    message: "New follower here! Love the stream",
    timestamp: "2:37 PM",
  },
  {
    id: 5,
    username: "EliteGamer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    message: "Can you show that strategy again?",
    timestamp: "2:38 PM",
  },
];

export const formatDuration = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const homeTabValues: {
  activeTab: "live" | "past" | "upcoming";
  value: string;
}[] = [
  { activeTab: "live", value: "Live Now" },
  { activeTab: "upcoming", value: " Upcoming" },
  { activeTab: "past", value: "Past Streams" },
];

export async function getStreams(): Promise<{
  liveStreams: Stream[];
  upcomingStreams: Stream[];
  pastStreams: Stream[];
}> {
  const results = await Promise.all([
    supabase
      .from("streams")
      .select("*")
      .eq("status", "live")
      .order("created_at", { ascending: true }),
    supabase
      .from("streams")
      .select("*")
      .eq("status", "upcoming")
      .order("created_at", { ascending: true }),
    supabase
      .from("streams")
      .select("*")
      .eq("status", "past")
      .order("created_at", { ascending: true }),
  ]);

  const [live, upcoming, past] = results;

  if (live.error || upcoming.error || past.error) {
    console.error({ live, upcoming, past });
    throw new Error("Failed to fetch streams");
  }

  return {
    liveStreams: live.data || [],
    upcomingStreams: upcoming.data || [],
    pastStreams: past.data || [],
  };
}

export async function getCurrentUser(
  session: Session | null | false
): Promise<User | null | Session["user"]> {
  if (!session) return null;

  const user = session.user;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single(); // only one row expected

  if (profileError) {
    // console.error("Profile fetch error:", profileError);
    return { ...user }; // fallback to auth user only
  }

  return profile;
}
