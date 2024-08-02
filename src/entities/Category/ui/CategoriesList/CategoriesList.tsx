import { CategorySchema } from "@/entities/Category";
import { useGetCategoriesItems } from "@/shared/api/hooks/useGetCategoriesItems";
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
  const { data, isLoading, isFetching } = useGetCategoriesItems();

  useEffect(() => {
    console.log("categoriesApi", data);
  }, [data]);

  if (isLoading && isFetching) return <div>Loading</div>;

  const content = data?.categories.map((category) => {
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

  return content;
});
