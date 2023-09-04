import { ItemSchema } from "@/entities/Item";

export interface CategorySchema {
  id: number;
  name: string;
  items: ItemSchema[];
}
