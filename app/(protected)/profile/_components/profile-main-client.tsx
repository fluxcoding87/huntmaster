"use client";

import { CompleteProfile } from "@/types/profile";
import { PersonalDetailsCard } from "./personal-details-card";
import { EducationCard } from "../../../../components/profile/education/education-card";
import { ProfileDetailsPage } from "./profile-details-page";

interface ProfileMainClientProps {
  data: CompleteProfile;
}

export const ProfileMainClient = ({ data }: ProfileMainClientProps) => {
  if (!data) {
    return null;
  }
  return (
    <div className="flex flex-col gap-y-4 justify-center">
      <PersonalDetailsCard
        data={data}
        educationLength={data.educations.length}
        projectLength={data.projects.length}
        languageLength={data.languages.length}
        employmentLength={data.employments.length}
        achievementLength={data.achievements.length}
      />
      <ProfileDetailsPage data={data} />
    </div>
  );
};
