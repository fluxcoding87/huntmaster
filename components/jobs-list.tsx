"use client";

import { useGetJobs } from "@/hooks/jobs/use-get-jobs";
import { Loader } from "./loader";
import { JobCard } from "./job-card";
import { useMedia } from "react-use";
export const JobsList = () => {
  const isMobile = useMedia("(max-width: 480px)", true);
  console.log(isMobile);

  const { data: jobs, isLoading } = useGetJobs();

  if (isLoading) {
    return <Loader />;
  }
  if (!jobs) {
    return null;
  }
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} data={job} trim={isMobile} />
      ))}
    </div>
  );
};
