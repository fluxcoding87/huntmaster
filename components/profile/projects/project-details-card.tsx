import { useEditProjectModal } from "@/hooks/projects/use-edit-project-modal";
import { Project } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { EditProjectModal } from "./edit-project-modal";

interface ProjectDetailsCardProps {
  data: Project;
}

export const ProjectDetailsCard = ({ data }: ProjectDetailsCardProps) => {
  const { open } = useEditProjectModal();
  return (
    <div className="flex flex-col gap-y-1">
      <EditProjectModal initialData={data} />
      <div className="flex items-center gap-x-2">
        <span className="text-sm font-semibold text-gray-800">{data.name}</span>
        <PencilIcon
          onClick={() => open(data.id)}
          className="size-[13px] text-gray-700 hover:text-black transition cursor-pointer"
        />
      </div>
      <span className="text-xs text-gray-700 font-light">
        {`${data.workedFrom} to ${data.workedTo}`}
      </span>
    </div>
  );
};
