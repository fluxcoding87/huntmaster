"use client";

import { CompleteProfile } from "@/types/profile";
import { QuickLinks } from "./quick-links";
import { EditResumeForm } from "./edit-resume-form";

interface ProfileDetailsPageProps {
  data: CompleteProfile;
}

export const ProfileDetailsPage = ({ data }: ProfileDetailsPageProps) => {
  return (
    <div className="grid grid-cols-12 gap-x-4">
      <div className="col-span-3">
        <QuickLinks />
      </div>
      <div className="col-span-9">
        <EditResumeForm
          initialData={data.resumeUrl}
          userName={data.user.name!}
          id={data.id}
        />
      </div>
    </div>
  );
};
