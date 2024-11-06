import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpdateProfile } from "@/hooks/profile/use-update-profile";
import { SkillCombobox } from "../../list/_components/skill-combobox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGetProfile } from "@/hooks/profile/use-get-profile";
import { Loader } from "@/components/loader";

interface EditSkillFormProps {
  onCancel: () => void;
  id: string;
  initialData: string[];
}

export const EditSkillsForm = ({
  onCancel,
  id,
  initialData,
}: EditSkillFormProps) => {
  const [skills, setSkills] = useState<string[]>(initialData ?? []);
  const { mutate } = useUpdateProfile(id);
  const { data: profile, isLoading } = useGetProfile();
  if (isLoading) {
    return <Loader />;
  }
  const handleSkillChange = (values: string[]) => {
    setSkills(values);
  };
  const handleSkillSubmit = () => {
    mutate({
      skills,
      birthday: profile?.birthday.toString(),
      experienceYears: profile?.experienceYears.toString(),
      resumeUrl: profile?.resumeUrl,
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800">
            Key Skills
          </span>
          <span className="text-sm text-muted-foreground font-semibold">
            Recruiters look for candidates with specific keyskills. Add them
            here to appear in searches.
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SkillCombobox
          onSkillChange={handleSkillChange}
          initialData={initialData}
        />
        <div className="mt-4 flex items-center gap-x-2 justify-end">
          <Button
            variant="secondary"
            className="border border-black/40 rounded-3xl"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSkillSubmit}
            className="rounded-3xl"
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
