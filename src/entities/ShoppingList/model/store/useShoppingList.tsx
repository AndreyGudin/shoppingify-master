import { create } from "zustand";
import { ShoppingListItem } from "../types/ShoppingListSchema";

interface ShoppingListState {
  shoppingList: ShoppingListItem;
}

export const useShoppingList = create<ShoppingListState>((set) => ({
  shoppingList: new Map([]),
}));
