import { z } from "zod";

export const addEmploymentSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  designation: z.string().min(1, "designation is required"),
  workedFrom: z.string().min(1, "Required"),
  workedTo: z.string().min(1, "Required"),
  current: z.boolean().optional(),
  notice_period: z.string().optional(),
  annual_salary: z.string().optional(),
  description: z.string().min(25, "Description is required min 25"),
});
