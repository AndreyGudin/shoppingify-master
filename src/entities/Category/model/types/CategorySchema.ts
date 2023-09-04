import { ItemSchema } from "@/shared/ui/Item";

export interface CategorySchema {
  id: number;
  name: string;
  items: ItemSchema[];
}
