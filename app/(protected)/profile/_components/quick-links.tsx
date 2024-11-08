import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefObject } from "react";

const links = [
  {
    label: "Education",
  },
  {
    label: "Key Skills",
  },
  {
    label: "Languages",
  },
  {
    label: "Acedemic Achievements",
  },
  {
    label: "Projects",
  },
  {
    label: "Employment",
  },
  {
    label: "Profile Summary",
  },
  {
    label: "Resume",
  },
];

interface QuickLinksProps {
  resumeRef: RefObject<HTMLDivElement>;
  educationRef: RefObject<HTMLDivElement>;
  skillsRef: RefObject<HTMLDivElement>;
  languageRef: RefObject<HTMLDivElement>;
  achievementRef: RefObject<HTMLDivElement>;
  projectRef: RefObject<HTMLDivElement>;
  employmentRef: RefObject<HTMLDivElement>;
  summaryRef: RefObject<HTMLDivElement>;
}

export const QuickLinks = ({
  resumeRef,
  educationRef,
  skillsRef,
  languageRef,
  achievementRef,
  projectRef,
  employmentRef,
  summaryRef,
}: QuickLinksProps) => {
  const handleScroll = (label: string) => {
    switch (label) {
      case "Resume":
        resumeRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case "Profile Summary":
        summaryRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case "Employment":
        employmentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case "Projects":
        projectRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case "Acedemic Achievements":
        achievementRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case "Languages":
        languageRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case "Key Skills":
        skillsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
      case "Education":
        educationRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        break;
    }
  };
  return (
    <Card className="shadow-none border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-2">
          {links.map((link) => (
            <div
              onClick={() => handleScroll(link.label)}
              key={link.label}
              className="rounded-md hover:bg-neutral-200/50 hover:text-black cursor-pointer text-neutral-600 p-2 text-sm hover:font-bold font-semibold transition"
            >
              {link.label}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
