import { create } from "zustand";

interface useAddAchievementModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setIsOpen: (value: boolean) => void;
}

export const useAddAchievementModal = create<useAddAchievementModalStore>(
  (set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    setIsOpen: (value: boolean) => set({ isOpen: value }),
  })
);
