import { memo } from "react";
import type { FC } from "react";

import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { Search } from "lucide-react";
interface SearchItemProps {
  className?: string;
}

export const SearchItem: FC<SearchItemProps> = memo(function SearchItem({
  className = "",
}: SearchItemProps) {
  return (
    <Label className='relative block'>
      <Search className='absolute h-[26px] w-[26px] left-[16px] top-[17%]' />
      <Input
        type='text'
        theme={"clear"}
        className='pl-[48px]'
        placeholder='search item'
      />
    </Label>
  );
});
