export interface ItemSchema {
  id: number;
  name: string;
  categoryId: number;
}

export interface ItemType {
  name: string;
  note?: string;
  image?: string;
  category: string;
}
