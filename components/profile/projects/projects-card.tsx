import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAddProjectModal } from "@/hooks/projects/use-add-project-modal";
import { Project } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { AddProjectModal } from "./add-project-modal";
import { ProjectDetailsCard } from "./project-details-card";

interface ProjectsCardProps {
  data: Project[];
}

export const ProjectsCard = ({ data }: ProjectsCardProps) => {
  const { open } = useAddProjectModal();
  return (
    <Card>
      <AddProjectModal />
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-base font-semibold text-gray-800">
            Projects
          </span>
          <div
            onClick={open}
            className="flex items-center gap-x-1 hover:opacity-75 cursor-pointer transition"
          >
            <PlusIcon className="size-4 text-amber-700" />
            <span className="text-sm font-bold text-amber-700">Add</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center text-sm text-muted-foreground font-semibold">
            No Projects added. Add one to increases profile score.
          </div>
        ) : (
          <div className="flex flex-col-reverse gap-y-4">
            {data.map((item) => (
              <ProjectDetailsCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
