"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { useAddAchievementModal } from "@/hooks/achievements/use-add-achievement-modal";
import { usePostAchievement } from "@/hooks/achievements/use-post-achievement";
import { addAchievementSchema } from "@/types/achievements";
import { zodResolver } from "@hookform/resolvers/zod";
import { Education } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddAchievementFormProps {
  onCancel: () => void;
  educationsData: Education[];
}

export const AddAchievementForm = ({
  onCancel,
  educationsData,
}: AddAchievementFormProps) => {
  const [education, setEducation] = useState<Education[] | undefined>(
    educationsData.length >= 1 ? [educationsData[0]] : undefined
  );
  const { close } = useAddAchievementModal();
  const { mutate, isPending } = usePostAchievement();
  const form = useForm<z.infer<typeof addAchievementSchema>>({
    resolver: zodResolver(addAchievementSchema),
    defaultValues: {
      educationId: educationsData.length >= 1 ? educationsData[0].id : "",
      title: educationsData.length >= 1 ? educationsData[0].course_name : "",
      description: "",
    },
  });
  const onSubmit = (values: z.infer<typeof addAchievementSchema>) => {
    mutate(
      { ...values },
      {
        onSuccess: () => {
          close();
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col gap-y-1">
            <span className="text-lg font-semibold text-gray-800">
              Academic achievements
            </span>
            <span className="text-sm text-muted-foreground font-semibold">
              Adding your achievements to help recruiters know your value as a
              potential candidate
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {educationsData.length === 0 ? (
          <div className="text-sm text-rose-700 font-bold">
            You can&apos;t add acedemic achievement without adding an education.
            Please add an education first!
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-center gap-y-4"
            >
              <FormField
                name="educationId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College Name</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        defaultValue={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setEducation(() => [
                            educationsData.find((item) => item.id === value)!,
                          ]);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a college name" />
                        </SelectTrigger>
                        <SelectContent>
                          {educationsData.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.college_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>During which course</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        defaultValue={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course name" />
                        </SelectTrigger>
                        <SelectContent>
                          {education &&
                            education.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.course_name}
                              >
                                {item.course_name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Achievement</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="e.g. Winner of a hackathon"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2 ml-auto mt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onCancel}
                  className="border bg-neutral-200"
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button disabled={isPending}>Save</Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};
