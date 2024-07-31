export interface ItemSchema {
  id: number;
  name: string;
  categoryId: number;
  note?: string;
  image?: string;
}

export interface ItemType {
  name: string;
  note?: string;
  image?: string;
  category: string;
}

export type InfoState = ItemSchema & Pick<ItemType, "category">;
export type ItemTypeCreation = Omit<ItemType, "category"> & {
  category: {
    id: number;
    name: string;
  };
};
