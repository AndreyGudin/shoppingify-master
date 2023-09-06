"use client";

import { memo, useContext, useEffect } from "react";
import type { FC } from "react";
import { ShoppingListContext } from "@/entities/ShoppingList";
import { Counter } from "@/features/Counter";
import { AddItem } from "@/features/AddItem";

interface ShoppingListControlsProps {
  className?: string;
}

export const ShoppingListControls: FC<ShoppingListControlsProps> = memo(
  function ShoppingList({ className = "" }: ShoppingListControlsProps) {
    const { shoppingList, setShoppingList } = useContext(ShoppingListContext);

    return (
      <aside
        className={`${className} w-full flex flex-col items-center h-screen pt-[44px]`}
      >
        <Counter />
        <AddItem />
      </aside>
    );
  }
);
