import { createContext } from "react";
import { GlobalContextType } from "./GlobalContext";

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
