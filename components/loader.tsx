import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <Loader2 className="animate-spin text-muted-foreground" />
    </div>
  );
};
