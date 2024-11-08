"use client";
import { CompleteProfile } from "@/types/profile";
import { QuickLinks } from "./quick-links";
import { EditResumeForm } from "./edit-resume-form";
import { EducationCard } from "@/components/profile/education/education-card";
import { SkillsCard } from "./skills-card";
import { ProfileSummaryCard } from "./profile-summary-card";
import { LanguagesCard } from "@/components/profile/languages/languages-card";
import { AchievementCard } from "@/components/profile/achievements/achievement-card";
import { ProjectsCard } from "@/components/profile/projects/projects-card";
import { EmploymentCard } from "@/components/profile/employment/employment-card";
import { useRef } from "react";

interface ProfileDetailsPageProps {
  data: CompleteProfile;
}

export const ProfileDetailsPage = ({ data }: ProfileDetailsPageProps) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const achievementRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const employmentRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  return (
    <div className="grid grid-cols-12 gap-x-4">
      <div className="col-span-3 relative">
        <div className="sticky top-8 w-[295px]">
          <QuickLinks
            resumeRef={resumeRef}
            educationRef={educationRef}
            skillsRef={skillsRef}
            languageRef={languageRef}
            achievementRef={achievementRef}
            projectRef={projectRef}
            employmentRef={employmentRef}
            summaryRef={summaryRef}
          />
        </div>
      </div>
      <div className="col-span-9 flex flex-col gap-y-4">
        <EducationCard ref={educationRef} data={data.educations} />
        <SkillsCard ref={skillsRef} initialData={data.skills} id={data.id} />
        <LanguagesCard ref={languageRef} data={data.languages} />
        <AchievementCard
          ref={achievementRef}
          data={data.achievements}
          educationsData={data.educations}
        />
        <ProjectsCard ref={projectRef} data={data.projects} />
        <EmploymentCard ref={employmentRef} data={data.employments} />
        <ProfileSummaryCard
          ref={summaryRef}
          initialData={data.description}
          id={data.id}
        />
        <EditResumeForm
          ref={resumeRef}
          initialData={data.resumeUrl}
          userName={data.user.name!}
          id={data.id}
        />
      </div>
    </div>
  );
};
