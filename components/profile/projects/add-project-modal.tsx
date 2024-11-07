import { ResponsiveModal } from "@/components/responsive-modal";
import { useAddProjectModal } from "@/hooks/projects/use-add-project-modal";
import { AddProjectForm } from "./add-project-form";

export const AddProjectModal = () => {
  const { close, isOpen, setIsOpen } = useAddProjectModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <AddProjectForm onCancel={close} />
    </ResponsiveModal>
  );
};
