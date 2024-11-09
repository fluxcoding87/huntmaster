import { JobIdClient } from "./client";

const JobIdPage = async ({ params }: { params: { jobId: string } }) => {
  const { jobId } = await params;
  return <JobIdClient id={jobId} />;
};

export default JobIdPage;
