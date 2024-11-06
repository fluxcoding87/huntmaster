import { z } from "zod";

export const addAchievementSchema = z.object({
  educationId: z.string().min(1, "Required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});
