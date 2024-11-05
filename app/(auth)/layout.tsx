import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-screen-xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-x-2 -mr-4">
          <Image width={48} height={48} src="/logo.svg" alt="logo" />
          <span className="font-extrabold tracking-tighter text-2xl">
            Huntmaster
          </span>
        </Link>
        <div>
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
      <main className="max-w-screen-xl">{children}</main>
    </div>
  );
};

export default AuthLayout;
