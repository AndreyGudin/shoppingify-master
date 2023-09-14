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

export interface ItemInList extends ItemSchema {
  count: number;
}

export type ShoppingListItem = Record<string, ItemInList[]>;
