/* eslint-disable react-hooks/exhaustive-deps */
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import { months } from "./add-project-form";
import { generateYears } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { SkillCombobox } from "@/app/(protected)/list/_components/skill-combobox";
import { useCallback, useEffect, useState } from "react";
import { useEditProjectModal } from "@/hooks/projects/use-edit-project-modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addProjectSchema } from "@/types/projects";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProject } from "@/hooks/projects/use-update-project";
import { useDeleteProject } from "@/hooks/projects/use-delete-project";
interface EditProjectFormProps {
  initialData: Project;
  onCancel: () => void;
}

export const EditProjectForm = ({
  onCancel,
  initialData,
}: EditProjectFormProps) => {
  const [fromDuration, setFromDuration] = useState<string>(
    initialData.workedFrom
  );
  const [toDuration, setToDuration] = useState<string>(initialData.workedTo);
  const { close } = useEditProjectModal();
  const { mutate, isPending: isUpdatePending } = useUpdateProject(
    initialData.id
  );
  const { mutate: deleteProject, isPending: isDeletePending } =
    useDeleteProject(initialData.id);

  const isPending = isUpdatePending || isDeletePending;

  const form = useForm<z.infer<typeof addProjectSchema>>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      name: initialData.name,
      workedFrom: initialData.workedFrom,
      workedTo: initialData.workedTo,
      description: initialData.description,
      skills: initialData.skills,
      projectUrl: initialData.projectUrl ?? "",
    },
  });
  useEffect(() => {
    form.setValue("workedFrom", fromDuration!);
    form.setValue("workedTo", toDuration!);
  }, [fromDuration, toDuration]);

  const onSubmit = (values: z.infer<typeof addProjectSchema>) => {
    mutate({ ...values });
  };
  const handleSkillChange = useCallback((skills: string[]) => {
    form.setValue("skills", skills);
  }, []);
  const years = generateYears();
  const handleDelete = () => {
    deleteProject(
      {},
      {
        onSuccess: () => {
          close(initialData.id);
        },
      }
    );
  };
  const selectedIndex = months.indexOf(fromDuration.split("'")[0]);
  const remainingMonths = months.slice(selectedIndex + 1);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-2">
              <span className="text-lg font-semibold text-gray-800">
                Edit a Project
              </span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="size-7" variant="destructive">
                    <TrashIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">Are you sure?</span>
                    <span className="text-muted-foreground text-xs">
                      Showcase your talent with the best projects you have
                      worked on during college and work
                    </span>
                    <div className="flex items-center gap-x-2 ml-auto">
                      <Button
                        onClick={handleDelete}
                        variant="outline"
                        className="size-min text-xs bg-black text-white hover:bg-black hover:opacity-75 hover:text-white"
                      >
                        OK
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <span className="text-sm text-muted-foreground font-semibold">
              Adding your achievements to help recruiters know your value as a
              potential candidate
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
                defaultValue={fromDuration.split("'")[0]}
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
                defaultValue={fromDuration.split("'")[1] ?? ""}
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
                defaultValue={toDuration.split("'")[0]}
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
                    : months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
              <Select
                defaultValue={toDuration.split("'")[1] ?? ""}
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
                    <SkillCombobox
                      onSkillChange={handleSkillChange}
                      initialData={initialData.skills}
                    />
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
