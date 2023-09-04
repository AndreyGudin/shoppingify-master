import { Item } from "@/shared/ui/Item";
import { Label } from "@/shared/ui/Label/Label";
import { memo } from "react";
import type { FC } from "react";

interface CategoryProps {
  className?: string;
  items?: string[];
  name: string;
}

export const Category: FC<CategoryProps> = memo(function Category({
  name,
  items = [],
  className = "",
}: CategoryProps) {
  return (
    <div className={`${className} flex flex-col w-full gap-[18px]`}>
      <Label>{name}</Label>
      <div className='flex justify-between'>
        {items.map((item) => (
          <Item key={item} name={item} />
        ))}
      </div>
    </div>
  );
});
