import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Definir la forma de los datos
interface UserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

// 2. Crear el contexto con valor inicial undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// 3. Proveedor
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 4. Hook para consumir el contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};
