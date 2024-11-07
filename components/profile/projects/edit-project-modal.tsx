import { ResponsiveModal } from "@/components/responsive-modal";
import { useEditLangModal } from "@/hooks/languages/use-edit-lang-modal";

import { Language, Project } from "@prisma/client";
import { useEditProjectModal } from "@/hooks/projects/use-edit-project-modal";
import { EditProjectForm } from "./edit-project-form";

interface EditProjectModalProps {
  initialData: Project;
}

export const EditProjectModal = ({ initialData }: EditProjectModalProps) => {
  const { close, modals, setIsOpen } = useEditProjectModal();

  return (
    <ResponsiveModal
      open={modals[initialData.id]}
      onOpenChange={(value) => setIsOpen(initialData.id, value)}
    >
      <EditProjectForm
        initialData={initialData}
        onCancel={() => close(initialData.id)}
      />
    </ResponsiveModal>
  );
};
