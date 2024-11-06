import { z } from "zod";

export const addEducationSchema = z.object({
  qualification: z.string().min(1, "Qualification/Degree is required"),
  college_name: z.string().min(1, "College name is required"),
  startingTime: z.string().min(1, "Starting time is required"),
  passoutTime: z.string().min(1, "Passout time is required"),
  course_name: z.string().min(1, "Course name is required"),
  course_type: z.string().min(1, "Degree type is required"),
  grade: z.string().min(1, "Grade is required"),
});
