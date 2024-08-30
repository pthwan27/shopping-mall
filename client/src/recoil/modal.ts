import { atom } from "recoil";

export const modalState = atom<{ id: string; element: React.FC }[]>({
  key: "modalState",
  default: [],
});
