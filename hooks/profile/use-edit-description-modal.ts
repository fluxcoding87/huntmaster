import { create } from "zustand";

interface useEditDescriptionModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setIsOpen: (value: boolean) => void;
}

export const useEditDescriptionModal = create<useEditDescriptionModalStore>(
  (set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    setIsOpen: (value: boolean) => set({ isOpen: value }),
  })
);
