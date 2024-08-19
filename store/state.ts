import { atom } from "recoil";
import { Account } from "../types";
export const selectedAccountState = atom<Account | null>({
  key: "selectedAccountState",
  default: null,
});
