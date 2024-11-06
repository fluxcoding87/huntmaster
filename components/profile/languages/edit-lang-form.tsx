"use client";
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
import { useDeleteLang } from "@/hooks/languages/use-delete-lang";
import { useEditLangModal } from "@/hooks/languages/use-edit-lang-modal";
import { useUpdateLang } from "@/hooks/languages/use-update-lang";
import { languages } from "@/lib/languages";
import { addLanguageSchema } from "@/types/languages";
import { zodResolver } from "@hookform/resolvers/zod";
import { Language } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
interface EditLangFormProps {
  onCancel: () => void;
  initialData: Language;
}

export const EditLangForm = ({ onCancel, initialData }: EditLangFormProps) => {
  const { close } = useEditLangModal();
  const [selectedlanguage, setSelectedLanguage] = useState<string>(
    initialData.name
  );
  const { mutate, isPending: updateIsPending } = useUpdateLang(initialData.id);
  const { mutate: deleteLang, isPending: deleteIsPending } = useDeleteLang(
    initialData.id
  );
  const isPending = updateIsPending || deleteIsPending;
  const form = useForm<z.infer<typeof addLanguageSchema>>({
    resolver: zodResolver(addLanguageSchema),
    defaultValues: {
      name: initialData.name,
      comfortableIn: initialData.comfortableIn,
    },
  });
  const onSubmit = (values: z.infer<typeof addLanguageSchema>) => {
    mutate(
      { ...values },
      {
        onSuccess: () => {
          close(initialData.id);
        },
      }
    );
  };
  const handleDelete = () => {
    deleteLang(
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
                Edit a Language
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
              Strengthen your resume by letting recruiters know you can
              communicate in multiple languages
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
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedLanguage(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedlanguage && (
              <FormField
                name="comfortableIn"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comfortable In</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a comfortable option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Read/Write">Read/Write</SelectItem>
                          <SelectItem value="Spoken">Spoken</SelectItem>
                          <SelectItem value="Both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <div className="flex items-center gap-x-2 ml-auto mt-4">
              <Button
                type="button"
                variant="secondary"
                className="bg-neutral-200 border"
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
