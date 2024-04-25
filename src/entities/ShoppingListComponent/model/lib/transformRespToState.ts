import {
  ItemInList,
  ShoppingListGetResponse,
} from "../types/ShoppingListSchema";

export const transformRespToState = (
  response: ShoppingListGetResponse
): Map<string, ItemInList[]> => {
  const result = new Map<string, ItemInList[]>();
  response.items.forEach((elem) => {
    if (elem.item.category.name in result) {
      const savedItems = result.get(elem.item.category.name);
      savedItems?.push({
        count: elem.count,
        categoryId: elem.item.categoryId,
        id: elem.item.id,
        name: elem.item.name,
      });
    } else {
      result.set(elem.item.category.name, [
        {
          count: elem.count,
          categoryId: elem.item.categoryId,
          id: elem.item.id,
          name: elem.item.name,
        },
      ]);
    }
  });
  return result;
};
