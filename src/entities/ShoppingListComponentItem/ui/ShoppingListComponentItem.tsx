import { Counter } from "@/features/Counter";
import { Checkbox } from "@/shared/ui/Checkbox";
import { labelVariants } from "@/shared/ui/Label";
import { useState, type FC } from "react";

interface ShoppingListComponentItemProps {
  className?: string;
  id: number;
  categoryName: string;
  handlePlusClick?: () => void;
  handleMinusClick?: () => void;
  handleDeleteClick?: () => void;
  count: number;
  name: string;
  save?: boolean;
}

export const ShoppingListComponentItem: FC<ShoppingListComponentItemProps> = ({
  className = "",
  save = true,
  id,
  count,
  name,
  handleDeleteClick = () => {},
  handleMinusClick = () => {},
  handlePlusClick = () => {},
}: ShoppingListComponentItemProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <div key={id} className={`${className} flex justify-between gap-6`}>
      {!save && (
        <Checkbox
          onCheckedChange={(checked) => {
            if (checked) setChecked(true);
            else setChecked(false);
          }}
        />
      )}
      <span
        className={labelVariants({
          type: "large",
          sort: "center",
          transform: checked ? "overline" : "noOverline",
        })}
      >
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
