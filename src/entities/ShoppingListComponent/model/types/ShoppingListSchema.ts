import { CategorySchema } from "@/entities/Category";
import { ItemSchema } from "@/entities/Item";
import { Dispatch, SetStateAction } from "react";

export interface ShoppingListSchema {
  items: ShoppingListItem;
}

export interface ItemInList extends ItemSchema {
  count: number;
}

export type ShoppingListItem = Map<string, ItemInList[]>;

export interface ShoppingList {
  name: string;
  items: ShoppingListItem;
  userId: string;
}

export interface ShoppingListGetResponse {
  id: number;
  items: ShoppingListGetResponseItem[];
  name: string;
  userId: string;
}

export interface ShoppingListGetResponseItem {
  assignedAt: Date;
  count: number;
  itemId: number;
  shoppingListId: number;
  item: ItemSchema & { category: Omit<CategorySchema, "items"> };
}
