import { UserButton } from "@/components/user-button";
import Image from "next/image";
import Link from "next/link";

const EmployerLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className="max-w-screen-xl mx-auto">
        <div className="px-4 py-7 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-x-2 -mr-4">
            <Image width={48} height={48} src="/logo.svg" alt="logo" />
            <span className="font-extrabold tracking-tighter text-2xl">
              Huntmaster
            </span>
          </Link>
          <UserButton />
        </div>
      </div>
      <main className="max-w-screen-xl mx-auto">{children}</main>
    </section>
  );
};

export default EmployerLayoutPage;
