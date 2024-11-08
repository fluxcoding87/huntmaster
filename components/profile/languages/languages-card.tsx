import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Language } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { LanguageDetailsCard } from "./language-details-card";
import { useAddLangModal } from "@/hooks/languages/use-add-lang-modal";
import { AddLangModal } from "./add-lang-modal";
import { RefObject } from "react";

interface LanguagesCardProps {
  data: Language[];
  ref: RefObject<HTMLDivElement>;
}

export const LanguagesCard = ({ data, ref }: LanguagesCardProps) => {
  const { open } = useAddLangModal();
  return (
    <Card ref={ref}>
      <AddLangModal />
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-base font-semibold text-gray-800">
            Languages
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
          <div className="flex items-center justify-center text-sm font-semibold text-muted-foreground">
            No languages added. Add a language to increase profile score.
          </div>
        ) : (
          <div className="flex flex-col-reverse justify-center gap-y-4">
            {data.map((item) => (
              <LanguageDetailsCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
