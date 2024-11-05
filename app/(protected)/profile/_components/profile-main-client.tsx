"use client";

import { CompleteProfile } from "@/types/profile";
import { PersonalDetailsCard } from "./personal-details-card";
import { EducationCard } from "./education-card";
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
        name={data.user.name}
        email={data.user.email}
        location={data.location}
        phoneNumber={data.phoneNumber}
        gender={data.gender}
        birthday={data.birthday}
        imageUrl={data.user.image || data.imageUrl}
        education={data.educations[0]}
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
