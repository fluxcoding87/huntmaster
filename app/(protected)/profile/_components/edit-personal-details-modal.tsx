import { ResponsiveModal } from "@/components/responsive-modal";
import { EditPersonalDetailsForm } from "./edit-personal-details-form";
import { useEditProfileModal } from "@/hooks/profile/use-edit-profile-modal";
import { CompleteProfile } from "@/types/profile";

interface EditPersonalDetailsModalProps {
  data: CompleteProfile;
}

export const EditPersonalDetailsModal = ({
  data,
}: EditPersonalDetailsModalProps) => {
  const { close, isOpen, setIsOpen } = useEditProfileModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <EditPersonalDetailsForm data={data} onCancel={close} />
    </ResponsiveModal>
  );
};
