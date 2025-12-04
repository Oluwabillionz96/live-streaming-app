import * as z from "zod";
import { RegistrationSchema } from "./zod-schema";

export type RegistrationData = z.infer<typeof RegistrationSchema>;

export interface UpcomingStream {
  id: number;
  title: string;
  scheduledFor: string;
  category: string;
}

export interface ChatMessage {
  id: number;
  username: string;
  avatar: string;
  message: string;
  timestamp: string;
}

export type Stream = {
  id: string;
  title: string;
  description: string;
  category: string;
  host_id: string;
  is_public: boolean;
  status: string;
  profiles: {
    username: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
  thumbnail_url: string | null;
  recording_url: string | null;
};

export interface User {
  id: string;
  username: string;
  created_at: string;
  avatar_url: string;
}
