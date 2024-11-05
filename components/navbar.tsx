"use client";
import { Clipboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "./search-bar";
import { Button } from "./ui/button";
import { MdWorkOutline } from "react-icons/md";
import { IoMdPaper } from "react-icons/io";
import { UserButton } from "./user-button";
import { User } from "@prisma/client";
import { useCurrent } from "@/hooks/auth/use-current";
import { Loader } from "./loader";

const navItemsMap = [
  {
    icon: MdWorkOutline,
    label: "Jobs",
    href: "/",
  },
  {
    icon: Clipboard,
    label: "List a Job",
    href: "/list",
  },
  {
    icon: IoMdPaper,
    label: "Applies",
    href: "/applies",
  },
];

export const Navbar = () => {
  const { data: user, isLoading } = useCurrent();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between py-6 px-4">
        <Link href="/" className="flex items-center gap-x-2 -mr-4">
          <Image width={48} height={48} src="/logo.svg" alt="logo" />
          <span className="font-extrabold tracking-tighter text-2xl">
            Huntmaster
          </span>
        </Link>
        <div className="flex items-center gap-x-6">
          {navItemsMap.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className="flex items-center gap-x-1 text-sm font-medium hover:opacity-75 transition"
            >
              <item.icon className="text-neutral-500 size-5" />
              <span className="text-neutral-600">{item.label}</span>
            </Link>
          ))}
          <SearchBar />
        </div>
        {!user ? (
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
};
