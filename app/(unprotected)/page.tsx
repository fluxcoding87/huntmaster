import { CategoriesFilter } from "@/components/categories-filter";
import { JobsList } from "@/components/jobs-list";

const PublicHomePage = () => {
  return (
    <div className="max-w-screen-xl mx-auto mt-4">
      <CategoriesFilter />
      <div className="w-full flex items-center justify-center gap-x-2">
        <span className="font-bold text-3xl">Latest Jobs on</span>
        <span className="font-extrabold tracking-tighter text-3xl text-amber-600">
          Huntmaster
        </span>
      </div>
      <JobsList />
    </div>
  );
};

export default PublicHomePage;
