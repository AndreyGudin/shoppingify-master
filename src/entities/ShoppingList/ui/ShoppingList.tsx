"use client";

import Image from "next/image";
import { memo, useCallback, useEffect } from "react";
import type { FC } from "react";

import ShoppingImage from "p/shopping.svg";
import { Label, labelVariants } from "@/shared/ui/Label";
import { Counter } from "@/features/Counter";
import { useShoppingList } from "@/entities/ShoppingList";

interface ShoppingListProps {
  className?: string;
}

export const ShoppingList: FC<ShoppingListProps> = memo(function ShoppingList({
  className = "",
}: ShoppingListProps) {
  const shoppingList = useShoppingList((state) => state.shoppingList);
  const noItems = (
    <div className={`${className} flex flex-col h-full justify-center`}>
      <Label className='mt-auto' type={"medium"} sort={"center"}>
        No items
      </Label>
      <Image
        className='mt-auto'
        src={ShoppingImage}
        alt='shopping'
        width={245}
      />
    </div>
  );

  const handlePlusClick = useCallback(
    (itemId: number, categoryName: string) => {
      const clone = structuredClone(shoppingList);
      const arr = clone.get(categoryName);
      if (arr) {
        const itemToChange = arr.findIndex((elem) => elem.id === itemId);
        const isItemExist = itemToChange > -1;
        if (isItemExist) arr[itemToChange].count += 1;
        clone.set(categoryName, arr);
      }
      useShoppingList.setState(() => ({
        shoppingList: new Map(clone),
      }));
    },

    [shoppingList]
  );

  const handleMinusClick = useCallback(
    (itemId: number, categoryName: string) => {
      const clone = structuredClone(shoppingList);
      const arr = clone.get(categoryName);
      if (arr) {
        const itemToChange = arr.findIndex((elem) => elem.id === itemId);
        const isItemExist = itemToChange > -1;
        if (isItemExist && arr[itemToChange].count > 0) {
          arr[itemToChange].count -= 1;
        }
        if (arr[itemToChange].count === 0) arr.splice(itemToChange, 1);
        clone.set(categoryName, arr);
        if (arr.length === 0) clone.delete(categoryName);
      }
      useShoppingList.setState(() => ({
        shoppingList: new Map(clone),
      }));
    },
    [shoppingList]
  );

  const handleDeleteClick = useCallback(
    (itemId: number, categoryName: string) => {
      const clone = structuredClone(shoppingList);
      const arr = clone.get(categoryName);
      if (arr) {
        const itemToChange = arr.findIndex((elem) => elem.id === itemId);
        const isItemExist = itemToChange > -1;
        if (isItemExist) {
          arr.splice(itemToChange, 1);
        }
        clone.set(categoryName, arr);
        if (arr.length === 0) clone.delete(categoryName);
      }
      useShoppingList.setState(() => ({
        shoppingList: new Map(clone),
      }));
    },
    [shoppingList]
  );

  useEffect(() => {
    console.log("shoppingList", shoppingList);
    console.log(shoppingList.entries());
  }, [shoppingList]);

  if (shoppingList.size === 0) return noItems;

  return (
    <div
      className={`${className} w-full h-full overflow-y-auto pl-[48px] pr-[45px] flex flex-col gap-12`}
    >
      {Array.from(shoppingList.keys()).map((categoryName, i) => {
        const items = shoppingList.get(categoryName);
        return (
          <div key={categoryName} className='flex flex-col gap-6'>
            <Label type={"mediumGray"}>{categoryName}</Label>
            <div className='flex flex-col gap-6'>
              {items?.map((item) => (
                <div key={item.id} className='flex justify-between gap-6'>
                  <span
                    className={labelVariants({ type: "large", sort: "center" })}
                  >
                    {item.name}
                  </span>
                  <Counter
                    plus={() => handlePlusClick(item.id, categoryName)}
                    minus={() => handleMinusClick(item.id, categoryName)}
                    deleteItem={() => handleDeleteClick(item.id, categoryName)}
                    count={item.count}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
});
