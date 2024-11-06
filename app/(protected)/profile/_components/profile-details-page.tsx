"use client";
import { CompleteProfile } from "@/types/profile";
import { QuickLinks } from "./quick-links";
import { EditResumeForm } from "./edit-resume-form";
import { EducationCard } from "@/components/profile/education/education-card";
import { SkillsCard } from "./skills-card";
import { ProfileSummaryCard } from "./profile-summary-card";
import { LanguagesCard } from "@/components/profile/languages/languages-card";

interface ProfileDetailsPageProps {
  data: CompleteProfile;
}

export const ProfileDetailsPage = ({ data }: ProfileDetailsPageProps) => {
  return (
    <div className="grid grid-cols-12 gap-x-4">
      <div className="col-span-3">
        <QuickLinks />
      </div>
      <div className="col-span-9 flex flex-col gap-y-4">
        <EducationCard data={data.educations} />
        <SkillsCard initialData={data.skills} id={data.id} />
        <LanguagesCard data={data.languages} />
        <ProfileSummaryCard initialData={data.description} id={data.id} />
        <EditResumeForm
          initialData={data.resumeUrl}
          userName={data.user.name!}
          id={data.id}
        />
      </div>
    </div>
  );
};
