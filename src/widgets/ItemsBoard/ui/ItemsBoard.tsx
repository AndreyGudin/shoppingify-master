"use client";
import { memo, useCallback, useContext, useEffect } from "react";
import type { FC } from "react";

import { CategoriesList, CategorySchema } from "@/entities/Category";
import { ShoppingListContext } from "@/entities/ShoppingList";
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
  const { setShoppingList } = useContext(ShoppingListContext);

  const handleClick = useCallback(
    (categoryName: string, item: ItemSchema) => {
      setShoppingList((state) => {
        const arr = [...state];
        let isCategoryNotInList = true;
        arr.forEach((obj) => {
          if (categoryName in obj) {
            const repeatedItem = obj[categoryName].findIndex(
              (element) => element.id === item.id
            );
            const isItemRepeat = repeatedItem > -1;
            if (isItemRepeat) {
              obj[categoryName][repeatedItem].count += 1;
            } else {
              obj[categoryName].push({ ...item, count: 1 });
            }

            isCategoryNotInList = false;
          }
        });
        if (isCategoryNotInList)
          arr.push({ [categoryName]: [{ ...item, count: 1 }] });
        return arr;
      });
    },
    [setShoppingList]
  );

  return (
    <section
      className={`${className} h-screen justify-center w-full flex flex-col gap-[48px] px-[80px]`}
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
