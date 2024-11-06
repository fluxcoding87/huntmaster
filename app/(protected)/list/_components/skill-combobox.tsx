"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { frameworks } from "./job-departments-list";
export const SkillCombobox = ({
  onSkillChange,
  initialData,
}: {
  onSkillChange: (skills: string[]) => void;
  initialData?: string[];
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>(initialData ?? []);

  const handleSetValue = (val: string) => {
    if (value.includes(val)) {
      value.splice(value.indexOf(val), 1);
      setValue(value.filter((item) => item !== val));
    } else {
      setValue((prevValue) => [...prevValue, val]);
    }
  };

  useEffect(() => {
    onSkillChange(value);
  }, [value, onSkillChange]);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full h-full border border-black/50 justify-between"
          >
            <div className="flex gap-2 justify-start flex-wrap">
              {value?.length
                ? value.map((val, i) => (
                    <div
                      key={i}
                      className="px-2 py-1 rounded-xl border border-amber-700 bg-amber-600/40 text-xs font-semibold"
                    >
                      {
                        frameworks.find((framework) => framework.value === val)
                          ?.label
                      }
                    </div>
                  ))
                : "Select skills..."}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[800px] md:w-[400px]">
          <Command className="w-full">
            <CommandInput placeholder="Search skills..." />
            <CommandEmpty>No skill found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandList>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={() => {
                        handleSetValue(framework.value);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value.includes(framework.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
