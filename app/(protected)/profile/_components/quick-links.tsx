import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const links = [
  {
    label: "Education",
  },
  {
    label: "Key Skills",
  },
  {
    label: "Languages",
  },
  {
    label: "Acedemic Achievements",
  },
  {
    label: "Projects",
  },
  {
    label: "Employment",
  },
  {
    label: "Profile Summary",
  },
  {
    label: "Resume",
  },
];

export const QuickLinks = () => {
  return (
    <Card className="shadow-none border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-2">
          {links.map((link) => (
            <div
              key={link.label}
              className="rounded-md hover:bg-neutral-200/50 hover:text-black cursor-pointer text-neutral-600 p-2 text-sm hover:font-bold font-semibold transition"
            >
              {link.label}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
