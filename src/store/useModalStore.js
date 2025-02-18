import { create } from "zustand";

export const useModalStore = create((set) => ({
  checkModalOn: false,
  modalMessage: "",
  isSuccess: false,
  showModal: (message, success) =>
    set({ modalMessage: message, isSuccess: success, checkModalOn: true }),
  closeModal: () => set({ checkModalOn: false }),
}));
