import { z } from "zod";

const configSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
  VITE_STRIPE_KEY: z.string(),
});

export const configVars = configSchema.parse(import.meta.env);
