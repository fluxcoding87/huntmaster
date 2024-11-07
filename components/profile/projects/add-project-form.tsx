/* eslint-disable react-hooks/exhaustive-deps */
import { SkillCombobox } from "@/app/(protected)/list/_components/skill-combobox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAddProjectModal } from "@/hooks/projects/use-add-project-modal";
import { usePostProject } from "@/hooks/projects/use-post-project";
import { generateYears } from "@/lib/utils";
import { addProjectSchema } from "@/types/projects";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddProjectFormProps {
  onCancel: () => void;
}

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const AddProjectForm = ({ onCancel }: AddProjectFormProps) => {
  const [fromDuration, setFromDuration] = useState<string>("");
  const [toDuration, setToDuration] = useState<string>("");
  const { close } = useAddProjectModal();
  const { mutate, isPending } = usePostProject();

  const form = useForm<z.infer<typeof addProjectSchema>>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      name: "",
      workedFrom: "",
      workedTo: "",
      description: "",
      skills: [""],
      projectUrl: "",
    },
  });
  useEffect(() => {
    form.setValue("workedFrom", fromDuration!);
    form.setValue("workedTo", toDuration!);
  }, [fromDuration, toDuration]);

  const years = generateYears();

  const onSubmit = (values: z.infer<typeof addProjectSchema>) => {
    mutate(
      { ...values },
      {
        onSuccess: () => {
          close();
        },
      }
    );
  };
  const handleSkillChange = useCallback((skills: string[]) => {
    form.setValue("skills", skills);
  }, []);
  const selectedIndex = months.indexOf(
    fromDuration.split("'")[0] === ""
      ? fromDuration
      : fromDuration.split("'")[0]
  );
  const remainingMonths = months.slice(selectedIndex + 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col gap-y-1">
            <span className="text-lg font-semibold text-gray-800">
              Projects
            </span>
            <span className="text-sm text-muted-foreground font-semibold">
              Showcase your talent with the best projects you have worked on
              during college and work
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter the name of the project you worked on"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>Project Duration</FormLabel>
            <div className="flex items-center gap-x-2">
              <Select
                onValueChange={(value) => {
                  setFromDuration((prev) => {
                    if (fromDuration.split("'")[1]) {
                      return `${value}'${prev.split("'")[1]}`;
                    } else {
                      return value;
                    }
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => {
                  setFromDuration((prev) => `${prev.split("'")[0]}'${value}`);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span>to</span>
              <Select
                onValueChange={(value) => {
                  setToDuration((prev) => {
                    if (toDuration.split("'")[1]) {
                      return `${value}'${prev.split("'")[1]}`;
                    } else {
                      return value;
                    }
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {+fromDuration.split("'")[1] === +toDuration.split("'")[1]
                    ? remainingMonths.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))
                    : !fromDuration.split("'")[1]
                    ? remainingMonths.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))
                    : months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => {
                  setToDuration((prev) => `${prev.split("'")[0]}'${value}`);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => {
                    if (+year >= +fromDuration.split("'")[1]) {
                      return (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      );
                    } else {
                      return null;
                    }
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </div>
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe what the project was about</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter your learnings throughout the process of making the project and what you liked the most about it"
                      maxLength={10000}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="skills"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key skills used in the project</FormLabel>
                  <FormControl>
                    <SkillCombobox onSkillChange={handleSkillChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="projectUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter the website link of your project"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-4 ml-auto">
              <Button
                className="bg-neutral-200 border"
                type="button"
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button disabled={isPending}>Save</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
