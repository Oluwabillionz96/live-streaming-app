import * as z from "zod";
import { Registration } from "./zod-schema";

export type RegistrationData = z.infer<typeof Registration>;
