import { ResponsiveModal } from "@/components/responsive-modal";
import { Employment, Language, Project } from "@prisma/client";
import { useEditProjectModal } from "@/hooks/projects/use-edit-project-modal";
import { EditEmploymentForm } from "./edit-employment-form";
import { useEditEmploymentModal } from "@/hooks/employments/use-edit-employment-modal";

interface EditEmploymentModalProps {
  initialData: Employment;
}

export const EditEmploymentModal = ({
  initialData,
}: EditEmploymentModalProps) => {
  const { close, modals, setIsOpen } = useEditEmploymentModal();

  return (
    <ResponsiveModal
      open={modals[initialData.id]}
      onOpenChange={(value) => setIsOpen(initialData.id, value)}
    >
      <EditEmploymentForm
        initialData={initialData}
        onCancel={() => close(initialData.id)}
      />
    </ResponsiveModal>
  );
};
