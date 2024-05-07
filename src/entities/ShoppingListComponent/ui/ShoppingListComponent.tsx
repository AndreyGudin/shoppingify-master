"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { FC } from "react";

import ShoppingImage from "p/shopping.svg";
import { Label } from "@/shared/ui/Label";
import { useShoppingList } from "../model/store/useShoppingList";
import { useSession } from "next-auth/react";
import { transformRespToState } from "../model/lib/transformRespToState";
import { useSave } from "@/widgets/ShoppingListFunctions";
import { ShoppingListComponentItem } from "@/entities/ShoppingListComponentItem";

interface ShoppingListComponentProps {
  className?: string;
}

export const ShoppingListComponent: FC<ShoppingListComponentProps> = ({
  className = "",
}: ShoppingListComponentProps) => {
  const shoppingList = useShoppingList((state) => state.shoppingList);
  const updateShoppingList = useShoppingList(
    (state) => state.updateShoppingList
  );
  const setSave = useSave((state) => state.setSave);
  const save = useSave((state) => state.save);

  const { data: session } = useSession();

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

  useEffect(() => {
    if (session) {
      fetch(`http://localhost:3000/api/list?email=${session.user.email}`, {
        method: "GET",
      })
        .then((r) => r.json())
        .then((r) => {
          console.log("r", r);
          if (Object.values(r).length > 0 && !("status" in r)) {
            updateShoppingList(transformRespToState(r));
            setSave(false);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [session, setSave, updateShoppingList]);

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
                <ShoppingListComponentItem
                  save={save}
                  key={item.id}
                  categoryName={categoryName}
                  count={item.count}
                  id={item.id}
                  name={item.name}
                  handleDeleteClick={() =>
                    handleDeleteClick(item.id, categoryName)
                  }
                  handleMinusClick={() =>
                    handleMinusClick(item.id, categoryName)
                  }
                  handlePlusClick={() => handlePlusClick(item.id, categoryName)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
