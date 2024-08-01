"use client";
import { memo } from "react";
import type { FC } from "react";

import { CategoriesList, CategorySchema } from "@/entities/Category";
import { SearchItem } from "@/features/SearchItem";
import { labelVariants } from "@/shared/ui/Label";
import { useAddItem } from "@/shared/hooks/useAddItem";

interface ItemsBoardProps {
  className?: string;
  categories: CategorySchema[];
}

export const ItemsBoard: FC<ItemsBoardProps> = memo(function ItemsBoard({
  categories,
  className = "",
}: ItemsBoardProps) {
  const handleClick = useAddItem();

  return (
    <section
      className={`${className} h-screen justify-center flex-1 flex flex-col gap-[48px] px-[80px]`}
    >
      <div className='flex justify-between'>
        <h1 className={labelVariants({ type: "big", className: "w-[450px]" })}>
          <span className='text-secondary'>Shoppingify</span> allows you take
          your shopping list wherever you go
        </h1>
        <SearchItem />
      </div>

      <CategoriesList handleClick={handleClick} />
    </section>
  );
});
