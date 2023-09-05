"use client";

import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import {
  ShoppingListContextType,
  ShoppingListItem,
} from "@/entities/ShoppingList";
import { ShoppingListContext } from "@/entities/ShoppingList";

type CustomProvidersProps = {
  children?: React.ReactNode;
};

export const CustomProviders = ({ children }: CustomProvidersProps) => {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const state: ShoppingListContextType = {
    shoppingList,
    setShoppingList,
  };
  return (
    <SessionProvider>
      <ShoppingListContext.Provider value={state}>
        {children}
      </ShoppingListContext.Provider>
    </SessionProvider>
  );
};
