import { create } from "zustand";

interface useAddProjectModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setIsOpen: (value: boolean) => void;
}

export const useAddProjectModal = create<useAddProjectModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setIsOpen: (value: boolean) => set({ isOpen: value }),
}));
