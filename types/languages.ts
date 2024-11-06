import { z } from "zod";

export const addLanguageSchema = z.object({
  name: z.string().min(1, "Language Required"),
  comfortableIn: z.string().min(1, "Required"),
});
