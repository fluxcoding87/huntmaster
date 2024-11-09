"use client";

import { Button } from "@/components/ui/button";
import { useUpdateEmployer } from "@/hooks/employer/use-update-employer";
import { useConfirm } from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";

interface AllowListJobProps {
  isAllowed: boolean;
  id: string;
}

export const AllowListJob = ({ isAllowed, id }: AllowListJobProps) => {
  const { mutate } = useUpdateEmployer(id);
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    isAllowed
      ? "You want to refuse this employer to list a job"
      : "You want to allow this employer to list a job"
  );
  const handleAllow = async () => {
    const ok = await confirm();
    if (!ok) {
      return;
    }
    mutate({
      is_Allowed: !isAllowed,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <ConfirmationDialog />
      <Button
        onClick={handleAllow}
        variant="outline"
        className={cn(
          "border px-2 py-1 rounded-xl font-bold text-white w-full",
          !isAllowed
            ? "bg-green-500/60 border-green-700 text-black"
            : "bg-red-500"
        )}
      >
        {isAllowed ? "Refuse" : "Allow"}
      </Button>
    </div>
  );
};
