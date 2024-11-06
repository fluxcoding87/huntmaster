import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PencilIcon, PlusIcon } from "lucide-react";
import { frameworks } from "../../list/_components/job-departments-list";
import { useEditSkillsModal } from "@/hooks/profile/use-edit-skills-modal";
import { EditSkillsModal } from "./edit-skills-modal";

interface SkillsCardProps {
  initialData: string[];
  id: string;
}

export const SkillsCard = ({ initialData, id }: SkillsCardProps) => {
  const { open } = useEditSkillsModal();
  const filteredSkills = initialData.map((skill) => {
    const filteredSkill = frameworks.find((item) => item.value === skill);
    return filteredSkill;
  });
  return (
    <Card>
      <EditSkillsModal initialData={initialData} id={id} />
      <CardHeader>
        <CardTitle className="flex items-center gap-x-2">
          <span className="text-base font-semibold text-gray-800">
            Key Skills
          </span>
          <PencilIcon
            onClick={open}
            className="size-4 text-muted-foreground cursor-pointer hover:text-black hover:opacity-75 transition"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-x-2 gap-y-4 flex-wrap">
        {filteredSkills.map((item) => (
          <div
            key={item?.value}
            className="px-4 py-2 rounded-3xl border border-amber-700 bg-amber-600/30"
          >
            <span className="text-sm font-bold">{item?.label}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
