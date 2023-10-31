import { ReactNode } from "react";

export interface AuthContextProviderProps {
  children: ReactNode;
  waitAuthentication:boolean
}
