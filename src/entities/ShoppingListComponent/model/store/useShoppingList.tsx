import { create } from "zustand";
import { ShoppingListItem } from "../types/ShoppingListSchema";

interface ShoppingListState {
  shoppingList: ShoppingListItem;
  updateShoppingList: (newShoppingList: ShoppingListItem) => void;
}

export const useShoppingList = create<ShoppingListState>((set) => ({
  shoppingList: new Map([]),
  updateShoppingList: (newShoppingList) =>
    set(() => ({ shoppingList: newShoppingList })),
}));
