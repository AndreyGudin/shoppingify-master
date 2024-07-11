import { create } from "zustand";

type SideComponentType = "itemInfo" | "shoppingList";

interface SideComponentState {
  sideComponent: SideComponentType;
  setSideComponent: (state: SideComponentType) => void;
}

export const useSideComponent = create<SideComponentState>((set) => ({
  sideComponent: "shoppingList",
  setSideComponent: (newState) => set(() => ({ sideComponent: newState })),
}));
