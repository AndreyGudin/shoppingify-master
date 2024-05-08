"use client";
import { memo, useCallback } from "react";
import type { FC } from "react";

import { CategoriesList, CategorySchema } from "@/entities/Category";
import { useShoppingList } from "@/entities/ShoppingListComponent";
import { SearchItem } from "@/features/SearchItem";
import { labelVariants } from "@/shared/ui/Label";
import { ItemSchema } from "@/entities/Item";

interface ItemsBoardProps {
  className?: string;
  categories: CategorySchema[];
}

export const ItemsBoard: FC<ItemsBoardProps> = memo(function ItemsBoard({
  categories,
  className = "",
}: ItemsBoardProps) {
  const shoppingList = useShoppingList((state) => state.shoppingList);
  const handleClick = useCallback(
    (categoryName: string, item: ItemSchema) => {
      const clone = structuredClone(shoppingList);
      if (clone.has(categoryName)) {
        const arr = clone.get(categoryName);
        if (arr) {
          const repeatedItem = arr.findIndex(
            (element) => element.id === item.id
          );
          if (repeatedItem > -1) {
            arr[repeatedItem].count += 1;
          } else {
            arr.push({ ...item, count: 1 });
          }
          clone.set(categoryName, arr);
        }
      } else {
        const arr = [{ ...item, count: 1 }];
        clone.set(categoryName, arr);
      }
      useShoppingList.setState(() => ({
        shoppingList: new Map(clone),
      }));
    },
    [shoppingList]
  );

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

      <CategoriesList categories={categories} handleClick={handleClick} />
    </section>
  );
});
