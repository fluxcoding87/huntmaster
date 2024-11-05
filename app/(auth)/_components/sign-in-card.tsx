"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginFormSchema } from "@/types/auth";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";
import { useLogin } from "@/hooks/auth/use-login";
import { signIn } from "next-auth/react";
export const SignInCard = () => {
  const { mutate, isPending } = useLogin();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginFormSchema>> = async (
    values: z.infer<typeof loginFormSchema>
  ) => {
    mutate(values);
  };

  return (
    <Card className="mt-10 max-w-[520px] mx-auto shadow-none px-8">
      <CardHeader className="flex items-center justify-center">
        <CardTitle className="text-xl md:text-2xl">
          Sign In to{" "}
          <span className="text-amber-600 font-bold">Huntmaster</span>
        </CardTitle>
      </CardHeader>
      <div className="my-2">
        <Separator className="bg-neutral-300" />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      type="email"
                      className="px-4"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter new password"
                      type="password"
                      className="px-4"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              Sign In
            </Button>
          </form>
          <FormMessage />
        </Form>
      </CardContent>
      <div className="my-2">
        <Separator className="bg-neutral-300" />
      </div>
      <div className="flex flex-col gap-y-4 justify-center my-4">
        <div className="rounded-lg bg-white flex items-center justify-center p-2 gap-x-2 border-2 hover:opacity-75 transition cursor-pointer">
          <FcGoogle className="size-5" />
          <span>Continue with Google</span>
        </div>
        <div
          className="rounded-lg bg-white flex items-center justify-center p-2 gap-x-2 border-2 hover:opacity-75 transition cursor-pointer"
          onClick={() => signIn("github")}
        >
          <AiFillGithub className="size-5" />
          <span>Continue with Github</span>
        </div>
      </div>
      <div className="w-full text-center my-6">
        Don&apos;t have an account with us?{" "}
        <Link href="/sign-up" className="text-amber-600">
          Sign Up
        </Link>
      </div>
    </Card>
  );
};
