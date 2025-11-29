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
