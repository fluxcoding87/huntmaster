"use client";

import { Loader } from "@/components/loader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetApplicants } from "@/hooks/applicant/use-get-applicants";
import { useCurrent } from "@/hooks/auth/use-current";
import { redirect } from "next/navigation";
import { AppliedJobCard } from "./_components/applied-job-card";
import { LikedJobs } from "@/components/liked-jobs";

const AppliesPageClient = () => {
  const { data: user, isLoading: isUserLoading } = useCurrent();
  const { data: applicants, isLoading: isApplicantsLoading } =
    useGetApplicants();
  const isLoading = isUserLoading || isApplicantsLoading;
  if (isLoading) {
    return <Loader />;
  }
  if (!user) {
    return redirect("/sign-in");
  }

  if (!applicants) {
    return (
      <div className="flex items-center justify-center text-muted-foreground">
        You have not applied to any job yet.
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="text-lg md:text-2xl font-bold tracking-tight">
            Jobs you&apos;ve applied to on{" "}
            <span className="text-amber-600">Huntmaster</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!applicants ||
          (applicants.length === 0 && (
            <div className="flex items-center justify-center text-muted-foreground font-semibold">
              You have not applied to any job yet.
            </div>
          ))}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
          {applicants?.map((item) => (
            <AppliedJobCard key={item.id} data={item.job} applicant={item} />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col justify-center size-full">
          <div className="text-lg md:text-2xl font-semibold tracking-tight">
            Jobs you might like
          </div>
          <LikedJobs userId={user.id} applicants={applicants!} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default AppliesPageClient;
