import { useState } from "react";
import { AuthContext } from "./contexts";
import { User } from "../types/types";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
 const [user, setUser] = useState<User | null>(null)

 return (
  <AuthContext.Provider value={{ user, setUser }}>
   {children}
  </AuthContext.Provider>
 )
}





