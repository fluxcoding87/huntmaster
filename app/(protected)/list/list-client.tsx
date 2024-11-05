"use client";

import { useCurrent } from "@/hooks/auth/use-current";
import { ListJobForm } from "./_components/list-job-form";
import { redirect } from "next/navigation";
import { Loader } from "@/components/loader";

export const ListClient = () => {
  const { data: user, isLoading } = useCurrent();
  if (isLoading) {
    return <Loader />;
  }
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className="flex flex-col space-y-6 mt-6">
      <ListJobForm userId={user?.id} />
    </div>
  );
};
