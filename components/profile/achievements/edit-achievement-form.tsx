import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
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
import { Textarea } from "@/components/ui/textarea";
import { useDeleteAchievement } from "@/hooks/achievements/use-delete-achievement";
import { useEditAchievementModal } from "@/hooks/achievements/use-edit-achievement-modal";
import { useUpdateAchievement } from "@/hooks/achievements/use-update-achievement";
import { addAchievementSchema } from "@/types/achievements";
import { Achievement, Education } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EditAchievementFormProps {
  onCancel: () => void;
  educationsData: Education[];
  initialData: Achievement;
}

export const EditAchievementForm = ({
  onCancel,
  educationsData,
  initialData,
}: EditAchievementFormProps) => {
  const [education, setEducation] = useState<Education[] | undefined>(
    educationsData.length >= 1
      ? [educationsData.find((item) => item.id === initialData.educationId)!]
      : undefined
  );
  const { close } = useEditAchievementModal();
  const { mutate, isPending: isUpdating } = useUpdateAchievement(
    initialData.id
  );
  const { mutate: deleteAchievement, isPending: isDeleting } =
    useDeleteAchievement(initialData.id);

  const isPending = isUpdating || isDeleting;

  const form = useForm<z.infer<typeof addAchievementSchema>>({
    defaultValues: {
      educationId: educationsData.length >= 1 ? educationsData[0].id : "",
      title: educationsData.length >= 1 ? educationsData[0].course_name : "",
      description: initialData.description ?? "",
    },
  });
  const onSubmit = (values: z.infer<typeof addAchievementSchema>) => {
    mutate({ ...values });
  };

  const handleDelete = () => {
    deleteAchievement(
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
            <div className="flex items-center gap-x-2">
              <span className="text-lg font-semibold text-gray-800">
                Edit a acedemic achievement
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
                            <SelectItem key={item.id} value={item.course_name}>
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
      </CardContent>
    </Card>
  );
};
