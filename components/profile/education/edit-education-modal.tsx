import { ResponsiveModal } from "@/components/responsive-modal";
import { useEditEducationModal } from "@/hooks/education/use-edit-education-modal";

import { Education } from "@prisma/client";
import { EditEducationForm } from "./edit-education-form";

interface EditEducationModalProps {
  data: Education;
}

export const EditEducationModal = ({ data }: EditEducationModalProps) => {
  const { close, modals, setIsOpen } = useEditEducationModal();

  return (
    <ResponsiveModal
      open={modals[data.id]}
      onOpenChange={(value) => setIsOpen(data.id, value)}
    >
      <EditEducationForm initialData={data} onCancel={() => close(data.id)} />
    </ResponsiveModal>
  );
};
