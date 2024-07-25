import { create } from "zustand";
import { InfoState } from "@/entities/Item";

interface ItemInfoState {
  itemInfoState: InfoState;
  setItemInfo: (state: InfoState) => void;
}

export const useItemInfo = create<ItemInfoState>((set) => ({
  itemInfoState: { name: "", category: "", id: 1, categoryId: 1 },
  setItemInfo: (newState) => set(() => ({ itemInfoState: newState })),
}));
