"use client";

import { Separator } from "./ui/separator";

import {
  LoaderIcon,
  LogOutIcon,
  Menu,
  NotebookIcon,
  User2Icon,
  UserPlus,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useCurrent } from "@/hooks/auth/use-current";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdAdminPanelSettings } from "react-icons/md";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserButtonLink } from "./user-button-link";
import Link from "next/link";
import { navItemsMap } from "./navbar";

export const UserButton = () => {
  const router = useRouter();
  const { data: user, isLoading } = useCurrent();
  const onHandleLogout = async () => {
    const response = await signOut();
    toast.success("Logged Out!");
    if (response) {
      toast.success("Logged Out!");
    }
  };
  const adminIds: string[] = process.env.NEXT_PUBLIC_ADMIN_IDS
    ? process.env.NEXT_PUBLIC_ADMIN_IDS.split(", ")
    : [];
  const isAdmin: boolean = !!adminIds.find((item) => item === user?.email);
  const listJob = {
    icon: user?.employer
      ? user.employer.is_Allowed
        ? NotebookIcon
        : UserPlus
      : UserPlus,
    label: user?.employer
      ? user.employer.is_Allowed
        ? "List a job"
        : "Become an employer"
      : "Become an employer",
    href: user?.employer
      ? user.employer.is_Allowed
        ? "/list"
        : "/employer"
      : "/employer",
  };
  return (
    <Sheet>
      <SheetTrigger
        className="flex items-center justify-center bg-white gap-x-4 px-4 py-1 rounded-full ring-1 ring-amber-600 hover:shadow-lg hover:opacity-75 transition duration-300"
        disabled={isLoading}
      >
        <div>
          <Menu className="text-muted-foreground size-6" />
        </div>
        <div className="size-9 rounded-full">
          {isLoading ? (
            <span>
              <LoaderIcon className="animate-spin text-muted-foreground" />
            </span>
          ) : (
            <div className="text-muted-foreground font-medium overflow-hidden relative size-full rounded-full">
              {user?.image ? (
                <Image src={user.image} alt="Userimage" fill />
              ) : (
                <div className="size-full flex items-center justify-center bg-neutral-400">
                  <span className="text-white font-medium">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="sr-only">UserButtonHeader</SheetTitle>
        <div className="flex flex-col items-center justify-center">
          <div className="size-28 border-2 p-1 border-amber-700 rounded-full">
            {isLoading ? (
              <span>
                <LoaderIcon className="animate-spin text-muted-foreground" />
              </span>
            ) : (
              <div className="text-muted-foreground font-medium overflow-hidden relative size-full rounded-full">
                {user?.image ? (
                  <Image src={user.image} alt="Userimage" fill />
                ) : (
                  <div className="size-full flex items-center justify-center bg-neutral-400">
                    <span className="text-white font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="text-base font-bold mt-2">{user?.name}</div>
          <div className="text-muted-foreground text-sm">{user?.email}</div>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col justify-center gap-y-4">
          <UserButtonLink onClick={() => router.push("/profile")}>
            <User2Icon className="size-5" />
            Profile
          </UserButtonLink>
          {isAdmin && (
            <UserButtonLink onClick={() => router.push("/admin")}>
              <MdAdminPanelSettings className="size-5" />
              Admin Settings
            </UserButtonLink>
          )}
          <UserButtonLink onClick={() => router.push(`${listJob.href}`)}>
            <listJob.icon className="size-5" />
            {listJob.label}
          </UserButtonLink>
          <div className="flex flex-col justify-center gap-y-4 lg:hidden">
            {navItemsMap.map((item) => (
              <UserButtonLink
                key={item.href}
                onClick={() => router.push(`${item.href}`)}
              >
                <item.icon className="size-4" />
                {item.label}
              </UserButtonLink>
            ))}
          </div>
          <UserButtonLink onClick={onHandleLogout}>
            <LogOutIcon className="size-5" />
            Logout
          </UserButtonLink>
        </div>
      </SheetContent>
    </Sheet>
  );
};
