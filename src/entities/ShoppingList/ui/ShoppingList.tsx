import Image from "next/image";
import { memo, useCallback, useContext } from "react";
import type { FC } from "react";

import ShoppingImage from "p/shopping.svg";
import { Label, labelVariants } from "@/shared/ui/Label";
import { ShoppingListContext } from "../model/context/ShoppingListContext";
import { Counter } from "@/features/Counter";

interface ShoppingListProps {
  className?: string;
}

export const ShoppingList: FC<ShoppingListProps> = memo(function ShoppingList({
  className = "",
}: ShoppingListProps) {
  const { shoppingList, setShoppingList } = useContext(ShoppingListContext);

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
      setShoppingList((state) => {
        const arr = [...state];
        arr.forEach((category) => {
          if (categoryName in category) {
            const itemToChange = category[categoryName].findIndex(
              (elem) => elem.id === itemId
            );
            const isItemExist = itemToChange > -1;
            if (isItemExist) {
              category[categoryName][itemToChange].count += 1;
            }
          }
        });
        return arr;
      });
    },
    [setShoppingList]
  );

  const handleMinusClick = useCallback(
    (itemId: number, categoryName: string) => {
      setShoppingList((state) => {
        const arr = [...state];
        arr.forEach((category) => {
          if (categoryName in category) {
            const itemToChange = category[categoryName].findIndex(
              (elem) => elem.id === itemId
            );
            const isItemExist = itemToChange > -1;
            if (isItemExist) {
              category[categoryName][itemToChange].count -= 1;
            }
          }
        });
        return arr;
      });
    },
    [setShoppingList]
  );

  const handleDeleteClick = useCallback(
    (itemId: number, categoryName: string) => {
      setShoppingList((state) => {
        const arr = [...state];
        arr.forEach((category) => {
          if (categoryName in category) {
            const itemToChange = category[categoryName].findIndex(
              (elem) => elem.id === itemId
            );
            const isItemExist = itemToChange > -1;
            if (isItemExist) {
              category[categoryName].splice(itemToChange, 1);
            }
          }
        });
        return arr;
      });
    },
    [setShoppingList]
  );

  if (shoppingList.length === 0) return noItems;

  return (
    <div
      className={`${className} w-full h-full overflow-y-auto pl-[48px] pr-[45px] flex flex-col gap-12`}
    >
      {shoppingList.map((list) => {
        const categoryName = Object.keys(list)[0];
        const items = Object.values(list)[0];
        return (
          <div key={categoryName} className='flex flex-col gap-6'>
            <Label type={"mediumGray"}>{categoryName}</Label>
            <div className='flex flex-col gap-6'>
              {items.map((item) => (
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
