"use client";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { LoaderIcon, LogOutIcon, Menu, User2Icon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useCurrent } from "@/hooks/auth/use-current";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdAdminPanelSettings } from "react-icons/md";

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

  return (
    <div>
      <Popover>
        <PopoverTrigger
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
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col items-center justify-center">
            <div className="text-base font-bold">{user?.name}</div>
            <div className="text-muted-foreground text-sm">{user?.email}</div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col justify-center gap-y-4">
            <Button
              onClick={() => router.push("/profile")}
              variant="secondary"
              className="flex items-center justify-center gap-x-2 font-bold text-sm border shadow-sm hover:opacity-75 hover:shadow-md transition"
            >
              <User2Icon />
              Profile
            </Button>
            {isAdmin && (
              <Button
                onClick={() => router.push("/admin")}
                variant="secondary"
                className="flex items-center justify-center gap-x-2 font-bold text-sm border shadow-sm hover:opacity-75 hover:shadow-md transition"
              >
                <MdAdminPanelSettings />
                Admin Settings
              </Button>
            )}
            <Button
              variant="secondary"
              className="flex items-center justify-center gap-x-2 font-bold text-sm border shadow-sm hover:shadow-md hover:opacity-75 transition"
              onClick={onHandleLogout}
            >
              <LogOutIcon className="size-4" />
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
