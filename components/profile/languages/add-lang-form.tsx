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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddLangModal } from "@/hooks/languages/use-add-lang-modal";
import { usePostLang } from "@/hooks/languages/use-post-lang";
import { languages } from "@/lib/languages";
import { addLanguageSchema } from "@/types/languages";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
interface AddLangFormProps {
  onCancel: () => void;
}

export const AddLangForm = ({ onCancel }: AddLangFormProps) => {
  const { close } = useAddLangModal();
  const [selectedlanguage, setSelectedLanguage] = useState<string | undefined>(
    undefined
  );
  const { mutate, isPending } = usePostLang();
  const form = useForm<z.infer<typeof addLanguageSchema>>({
    resolver: zodResolver(addLanguageSchema),
    defaultValues: {
      name: "",
      comfortableIn: "",
    },
  });
  const onSubmit = (values: z.infer<typeof addLanguageSchema>) => {
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
              Languages known
            </span>
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
