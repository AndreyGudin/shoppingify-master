import { CategorySchema } from "@/entities/Category";
import { useGetCategoriesItems } from "@/entities/Category/model/api/hooks/useGetCategoriesItems";
import { Item, ItemSchema } from "@/entities/Item";
import { Label } from "@/shared/ui/Label/Label";
import { memo, useEffect } from "react";
import type { FC } from "react";

interface CategoriesListProps {
  className?: string;
  handleClick?: (categoryName: string, item: ItemSchema) => void;
}

export const CategoriesList: FC<CategoriesListProps> = memo(function Category({
  className = "",
  handleClick = () => {},
}: CategoriesListProps) {
  const { data: categories } = useGetCategoriesItems();
  useEffect(() => {
    console.log("categoriesApi", categories);
  }, [categories]);
  const content = categories?.map((category) => {
    const items = category.items.filter(
      (item) => item.categoryId === category.id
    );

    return (
      <div
        key={category.id}
        className={`${className} flex flex-col w-full gap-[18px]`}
      >
        <Label>{category.name}</Label>
        <div className='flex gap-5'>
          {items.map((item) => (
            <Item
              key={item.id}
              onClick={() => handleClick(category.name, item)}
              item={item}
              categoryName={category.name}
            />
          ))}
        </div>
      </div>
    );
  });

  useEffect(() => {
    console.log("categories", categories);
  }, [categories]);

  return content;
});
