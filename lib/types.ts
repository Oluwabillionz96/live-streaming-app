import * as z from "zod";
import { Registration } from "./zod-schema";

export type RegistrationData = z.infer<typeof Registration>;

export interface UpcomingStream {
  id: number;
  title: string;
  scheduledFor: string;
  category: string;
}
