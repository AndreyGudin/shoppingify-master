import { CategorySchema } from "@/entities/Category";
import { Item, ItemSchema } from "@/entities/Item";
import { Label } from "@/shared/ui/Label/Label";
import { memo } from "react";
import type { FC } from "react";

interface CategoriesListProps {
  className?: string;
  categories?: CategorySchema[];
  handleClick?: (categoryName: string, item: ItemSchema) => void;
}

export const CategoriesList: FC<CategoriesListProps> = memo(function Category({
  categories = [],
  className = "",
  handleClick = () => {},
}: CategoriesListProps) {
  const content = categories.map((category) => {
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
              name={item.name}
            />
          ))}
        </div>
      </div>
    );
  });

  return content;
  // <div className={`${className} flex flex-col w-full gap-[18px]`}>
  //   <Label>{name}</Label>
  //   <div className='flex justify-between'>
  //     {items.map((item) => (
  //       <Item onClick={onClickForItems} key={item} name={item} />
  //     ))}
  //   </div>
  // </div>
});
