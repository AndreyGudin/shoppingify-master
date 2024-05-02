import { Counter } from "@/features/Counter";
import { labelVariants } from "@/shared/ui/Label";
import type { FC } from "react";

interface ShoppingListComponentItemProps {
  className?: string;
  id: number;
  categoryName: string;
  handlePlusClick?: () => void;
  handleMinusClick?: () => void;
  handleDeleteClick?: () => void;
  count: number;
  name: string;
}

export const ShoppingListComponentItem: FC<ShoppingListComponentItemProps> = ({
  className = "",
  id,
  count,
  name,
  handleDeleteClick = () => {},
  handleMinusClick = () => {},
  handlePlusClick = () => {},
}: ShoppingListComponentItemProps) => {
  return (
    <div key={id} className={`${className} flex justify-between gap-6`}>
      <span className={labelVariants({ type: "large", sort: "center" })}>
        {name}
      </span>
      <Counter
        plus={handlePlusClick}
        minus={handleMinusClick}
        deleteItem={handleDeleteClick}
        count={count}
      />
    </div>
  );
};
