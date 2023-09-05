import { CategorySchema } from "@/entities/Category";
import { ItemSchema } from "@/entities/Item";
import { Dispatch, SetStateAction } from "react";

export interface ShoppingListSchema {
  items: ShoppingListItem[];
}

export interface ShoppingListContextType {
  shoppingList: ShoppingListItem[];
  setShoppingList: Dispatch<SetStateAction<ShoppingListItem[]>>;
}

export type ShoppingListItem = Record<string, ItemSchema[]>;
