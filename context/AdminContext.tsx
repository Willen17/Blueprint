import { createContext, FC, PropsWithChildren, useContext } from 'react';

interface AdminContextValue {}

export const AdminContext = createContext<AdminContextValue>({});

const AdminContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return <AdminContext.Provider value={{}}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
export const useAdmin = () => useContext(AdminContext);
