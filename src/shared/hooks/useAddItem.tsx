import { ItemSchema } from "@/entities/Item";
import { useShoppingList } from "@/entities/ShoppingListComponent";
import { useCallback } from "react";

type UseAddItemType = (categoryName: string, item: ItemSchema) => void;

export const useAddItem = (): UseAddItemType => {
  const shoppingList = useShoppingList((state) => state.shoppingList);
  return useCallback(
    (categoryName: string, item: ItemSchema) => {
      const clone = structuredClone(shoppingList);
      if (clone.has(categoryName)) {
        const arr = clone.get(categoryName);
        if (arr) {
          const repeatedItem = arr.findIndex(
            (element) => element.id === item.id
          );
          if (repeatedItem > -1) {
            arr[repeatedItem].count += 1;
          } else {
            arr.push({ ...item, count: 1 });
          }
          clone.set(categoryName, arr);
        }
      } else {
        const arr = [{ ...item, count: 1 }];
        clone.set(categoryName, arr);
      }
      useShoppingList.setState(() => ({
        shoppingList: new Map(clone),
      }));
    },
    [shoppingList]
  );
};
