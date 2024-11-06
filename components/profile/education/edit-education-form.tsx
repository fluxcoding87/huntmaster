"use client";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { z } from "zod";
import { addEducationSchema } from "@/types/education";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
import { usePostEducation } from "@/hooks/education/use-post-education";
import { Education } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUpdateEducation } from "@/hooks/education/use-update-education";
import { useDeleteEducation } from "@/hooks/education/use-delete-education";
import { useEditEducationModal } from "@/hooks/education/use-edit-education-modal";

interface EditEducationFormProps {
  initialData: Education;
  onCancel: () => void;
}
export const EditEducationForm = ({
  onCancel,
  initialData,
}: EditEducationFormProps) => {
  const { close } = useEditEducationModal();
  const { mutate } = useUpdateEducation(initialData.id);
  const { mutate: deleteEducation } = useDeleteEducation(initialData.id);

  const [gradeType, setGradeType] = useState<string | undefined>(() => {
    if (Math.floor(+initialData.grade) <= 5) {
      return "5";
    } else if (Math.floor(+initialData.grade) <= 10) {
      return "10";
    } else if (Math.floor(+initialData.grade) <= 100) {
      return "100";
    }
  });
  const form = useForm<z.infer<typeof addEducationSchema>>({
    resolver: zodResolver(addEducationSchema),
    defaultValues: {
      qualification: initialData.qualification,
      college_name: initialData.college_name,
      startingTime: initialData.startingTime.toString().split("T")[0],
      passoutTime: initialData.passoutTime.toString().split("T")[0],
      course_name: initialData.course_name,
      course_type: initialData.course_type,
      grade: initialData.grade.toString(),
    },
  });

  const onSubmit = (values: z.infer<typeof addEducationSchema>) => {
    mutate({ ...values });
  };
  const handleDelete = () => {
    deleteEducation(
      {},
      {
        onSuccess: () => {
          close(initialData.id);
        },
      }
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-4">
              <span className="text-lg font-semibold text-gray-800">
                Edit Education
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
                      This action is permanent and changes cannot be reverted.
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
              Edit your existing educational details make sure to keep at least
              one education to increase the chances of hiring
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
              control={form.control}
              name="qualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualification/Degree</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Graduate/Diploma">
                          Graduate/Diploma
                        </SelectItem>
                        <SelectItem value="Post Graduate">
                          Post Graduate
                        </SelectItem>
                        <SelectItem value="Doctorate">Doctorate</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="college_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. MIT University"
                      className="focus-visible:ring-amber-600 focus-visible:ring-1 focus:ring-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between flex-wrap gap-x-4">
              <FormField
                name="startingTime"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Starting Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className="focus-visible:ring-amber-600 focus-visible:ring-1 focus:ring-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="passoutTime"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Passout Date</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className="focus-visible:ring-amber-600 focus-visible:ring-1 focus:ring-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="course_name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Course Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. B.Tech CSE"
                      className="focus-visible:ring-amber-600 focus-visible:ring-1 focus:ring-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Type</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full Time">Full Time</SelectItem>
                        <SelectItem value="Part Time">Part Time</SelectItem>
                        <SelectItem value="Correspondence">
                          Correspondence
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-4">
              <div className="flex-1">
                <FormLabel>Grading System</FormLabel>
                <Select
                  defaultValue={gradeType}
                  onValueChange={(value) => setGradeType(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a grading system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">GPA out of 10</SelectItem>
                    <SelectItem value="5">GPA out of 5</SelectItem>
                    <SelectItem value="100">Percentage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {gradeType && (
                <div className="flex-1">
                  <FormField
                    name="grade"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade</FormLabel>
                        <FormControl>
                          <Input {...field} max={gradeType} type="number" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center gap-x-4 ml-auto">
              <Button
                variant="secondary"
                type="button"
                className="border bg-neutral-200/80"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
