import { z } from "zod";

const configSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
});

export const configVars = configSchema.parse(import.meta.env);
