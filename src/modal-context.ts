import React from "react";
import { User } from "./types/User";

export const ModalContext = React.createContext({
  open: false,
  create: false,
  setOpen: (val: boolean): void => {},
  setCreate: (val: boolean): void => {},
  setItem: (item: User): void => {},
  addUser: (item: User): void => {},
});
