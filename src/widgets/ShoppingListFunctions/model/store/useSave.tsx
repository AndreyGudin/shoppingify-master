import { create } from "zustand";

interface SaveState {
  save: boolean;
  setSave: (save: boolean) => void;
}

export const useSave = create<SaveState>((set) => ({
  save: true,
  setSave: (newSave) => set(() => ({ save: newSave })),
}));
