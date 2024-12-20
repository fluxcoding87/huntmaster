import { FilterCard } from "@/components/filter-card";
import { JobsList } from "@/components/jobs-list";
import { SearchBar } from "@/components/search-bar";

const PublicHomePage = () => {
  return (
    <div className="max-w-screen-xl mx-auto mt-4">
      <div className="size-full flex items-center justify-center sm:hidden">
        <SearchBar className="size-[80%]" />
      </div>
      <div className="size-full mt-4 grid gird-cols-1 md:grid-cols-6 lg:grid-cols-12 -z-10">
        <div className="md:col-span-2 lg:col-span-4 relative px-2 py-4">
          <FilterCard />
        </div>
        <div className="md:col-span-4 lg:col-span-8 flex flex-col-reverse gap-y-8 py-4 px-2 z-0">
          <JobsList />
        </div>
      </div>
    </div>
  );
};

export default PublicHomePage;
