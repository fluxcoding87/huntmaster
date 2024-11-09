import { Search, SearchIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
export const SearchBar = ({ className }: { className?: string }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "w-[230px] bg-white px-4 py-2 rounded-full text-sm text-neutral-500 flex items-center justify-between cursor-pointer",
            className
          )}
        >
          <span>Search for jobs here</span>
          <div className="rounded-full bg-amber-600 text-white flex items-center p-2 ml-auto">
            <SearchIcon className="size-4" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="sm:w-[340px] md:w-[480px] rounded-xl">
        <div className="flex flex-col justify-center space-y-4">
          <div>
            <div className="font-bold text-lg">Jobs</div>
            <div className="text-sm text-muted-foreground">
              Search for jobs here
            </div>
          </div>
          <Select>
            <SelectTrigger className="w-full focus-visible:ring-transparent focus:ring-transparent">
              <SelectValue placeholder="Job type" />
            </SelectTrigger>
            <SelectContent className="focus-visible:ring-transparent focus:ring-transparent">
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="job">Job</SelectItem>
            </SelectContent>
          </Select>

          <div className="w-full">
            <Input
              placeholder="Enter keyword/company name"
              className="focus-visible:ring-transparent"
            />
          </div>
          <div className="w-full">
            <Input
              placeholder="Enter Location"
              className="focus-visible:ring-transparent"
            />
          </div>
          <Button
            type="submit"
            variant="outline"
            className="flex items-center justify-center hover:bg-amber-600/30 rounded-xl"
          >
            Search
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
