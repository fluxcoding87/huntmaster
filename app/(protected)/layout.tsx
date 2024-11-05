import { Navbar } from "@/components/navbar";
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl mx-auto">{children}</main>
    </>
  );
};

export default ProtectedLayout;
