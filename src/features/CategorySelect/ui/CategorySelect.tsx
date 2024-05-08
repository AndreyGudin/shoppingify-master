import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import { memo } from "react";
import type { FC } from "react";

interface CategorySelectProps {
  className?: string;
}

export const CategorySelect: FC<CategorySelectProps> = memo(
  function CategorySelect({ className = "" }: CategorySelectProps) {
    return (
      <Select>
        <SelectTrigger className='w-[310px] h-[61px] border-2 rounded-xl border-disabled'>
          <SelectValue placeholder='Select a fruit' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value='apple'>Apple</SelectItem>
            <SelectItem value='banana'>Banana</SelectItem>
            <SelectItem value='blueberry'>Blueberry</SelectItem>
            <SelectItem value='grapes'>Grapes</SelectItem>
            <SelectItem value='pineapple'>Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);
