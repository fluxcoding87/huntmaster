import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "./ui/checkbox";
interface FilterProps {
  label: string;
  data?: string[];
  type?: string;
}

export const Filter = ({ label, data, type }: FilterProps) => {
  return (
    <Accordion type="single" className="py-2" collapsible>
      <AccordionItem value={label}>
        <AccordionTrigger>
          <span className="font-bold">{label}</span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-y-3">
          {type === "location" && (
            <div className="flex items-center gap-x-3 text-gray-600 font-medium">
              <Checkbox />
              <span>International</span>
            </div>
          )}
          {data?.map((item, idx) => {
            if (type === "location" ? idx > 2 : idx > 3) {
              return null;
            }
            return (
              <div
                key={item}
                className="flex items-center gap-x-3 text-gray-600 font-medium"
              >
                <Checkbox />
                <span>{item}</span>
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
