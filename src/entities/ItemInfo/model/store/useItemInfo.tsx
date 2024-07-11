import { create } from "zustand";
import { ItemType } from "@/entities/Item";

interface ItemInfoState {
  itemInfoState: ItemType;
  setItemInfo: (state: ItemType) => void;
}

export const useItemInfo = create<ItemInfoState>((set) => ({
  itemInfoState: { name: "", category: "" },
  setItemInfo: (newState) => set(() => ({ itemInfoState: newState })),
}));
