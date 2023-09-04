"use client";

import { Category, CategorySchema } from "@/entities/Category";
import { SearchItem } from "@/features/SearchItem";
import { labelVariants } from "@/shared/ui/Label";
import { memo } from "react";
import type { FC } from "react";

interface ItemsBoardProps {
  className?: string;
  categories: CategorySchema[];
}

export const ItemsBoard: FC<ItemsBoardProps> = memo(function ItemsBoard({
  categories,
  className = "",
}: ItemsBoardProps) {
  return (
    <section
      className={`${className} h-full w-full flex flex-col gap-[48px] px-[80px]`}
    >
      <div className='flex justify-between'>
        <h1 className={labelVariants({ type: "big", className: "w-[450px]" })}>
          <span className='text-secondary'>Shoppingify</span> allows you take
          your shopping list wherever you go
        </h1>
        <SearchItem />
      </div>

      {categories.map((category) => {
        const items = category.items
          .filter((item) => item.categoryId === category.id)
          .map((item) => item.name);
        return (
          <Category key={category.id} name={category.name} items={items} />
        );
      })}
    </section>
  );
});
