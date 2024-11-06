import { ResponsiveModal } from "@/components/responsive-modal";
import { useEditLangModal } from "@/hooks/languages/use-edit-lang-modal";
import { EditLangForm } from "./edit-lang-form";
import { Language } from "@prisma/client";

interface EditLangModalProps {
  initialData: Language;
}

export const EditLangModal = ({ initialData }: EditLangModalProps) => {
  const { close, modals, setIsOpen } = useEditLangModal();

  return (
    <ResponsiveModal
      open={modals[initialData.id]}
      onOpenChange={(value) => setIsOpen(initialData.id, value)}
    >
      <EditLangForm
        initialData={initialData}
        onCancel={() => close(initialData.id)}
      />
    </ResponsiveModal>
  );
};
