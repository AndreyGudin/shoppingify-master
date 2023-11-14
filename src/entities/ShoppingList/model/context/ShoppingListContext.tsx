"use client";

import { createContext } from "react";
import { ShoppingListContextType } from "../types/ShoppingListSchema";

export const ShoppingListContext = createContext<ShoppingListContextType>({
  shoppingList: new Map(),
  setShoppingList: () => {},
});
