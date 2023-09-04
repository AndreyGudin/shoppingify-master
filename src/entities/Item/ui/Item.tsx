import { memo } from "react";
import type { FC } from "react";

import { Plus } from "lucide-react";
import { Label } from "@/shared/ui/Label/Label";

interface ItemProps {
  className?: string;
  name: string;
}

export const Item: FC<ItemProps> = memo(function Item({
  name,
  className = "",
}: ItemProps) {
  return (
    <div
      className={`${className} bg-white rounded-xl p-4 flex justify-between items-center w-[182px] min-h-[50px] shadow shadow-[rgba(0, 0, 0, 0.05)]`}
    >
      <Label>{name}</Label>
      <Plus color='#C1C1C4' />
    </div>
  );
});
