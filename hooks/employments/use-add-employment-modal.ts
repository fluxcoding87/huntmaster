import { create } from "zustand";

interface useAddEmploymentModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setIsOpen: (value: boolean) => void;
}

export const useAddEmploymentModal = create<useAddEmploymentModalStore>(
  (set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    setIsOpen: (value: boolean) => set({ isOpen: value }),
  })
);
