import { create } from "zustand";

interface ModalState {
  [key: string]: boolean; // key is the modal ID
}

interface useEditEducationModalStore {
  modals: ModalState;
  open: (id: string) => void;
  close: (id: string) => void;
  setIsOpen: (id: string, value: boolean) => void;
}

export const useEditEducationModal = create<useEditEducationModalStore>(
  (set) => ({
    modals: {},
    open: (id: string) =>
      set((state) => ({ modals: { ...state.modals, [id]: true } })),
    close: (id: string) =>
      set((state) => ({ modals: { ...state.modals, [id]: false } })),
    setIsOpen: (id: string, value: boolean) =>
      set((state) => ({ modals: { ...state.modals, [id]: value } })),
  })
);