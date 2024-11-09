"use client";

import { useGetJobs } from "@/hooks/jobs/use-get-jobs";
import { useGetProfile } from "@/hooks/profile/use-get-profile";
import { Loader2 } from "lucide-react";
import { JobCard } from "./job-card";
import { FullApplicant } from "@/types/applicants";

export const LikedJobs = ({
  applicants,
}: {
  userId: string;
  applicants: FullApplicant[];
}) => {
  const { data: profile, isLoading: isProfileLoading } = useGetProfile();
  const { data: jobs, isLoading: isJobsLoading } = useGetJobs();
  const isLoading = isProfileLoading || isJobsLoading;
  if (isLoading) {
    return (
      <div className="size-full flex items-center justify-center z-50 backdrop-blur-sm">
        <Loader2 className="animate-spin size-6" />
      </div>
    );
  }
  if (!jobs || !profile) {
    return (
      <div className="size-full p-4 flex items-center justify-center">
        <span className="text-muted-foreground font-bold">
          There are not jobs posted yet or you have not created your profile.
        </span>
      </div>
    );
  }
  const filteredJobs = jobs.filter((item) => {
    const reqSkills = item.skills;
    const skills = reqSkills.filter((reqSkill) => {
      const skill = profile.skills.find((skill) => reqSkill === skill);
      if (skill) {
        return true;
      } else {
        return false;
      }
    });
    if (skills.length > 0) {
      return true;
    } else {
      return false;
    }
  });

  const likedJobs = filteredJobs.filter((item) => {
    const id = applicants.find((app) => app.jobId === item.id);
    if (id) {
      return false;
    } else {
      return true;
    }
  });

  return (
    <div className="size-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {likedJobs.map((item, idx) => {
        if (idx > 9) {
          return null;
        }
        return <JobCard key={item.id} data={item} />;
      })}
    </div>
  );
};
