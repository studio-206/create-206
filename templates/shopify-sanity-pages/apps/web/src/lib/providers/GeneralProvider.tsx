import { createContext, useContext, useState } from "react";

interface ContextProps {
  openCart: boolean;
  setOpenCart: (val: boolean) => void;
}

const GeneralContext = createContext<ContextProps>({
  openCart: false,
  setOpenCart: () => {},
});

const GeneralProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [openCart, setOpenCart] = useState<boolean>(false);

  return (
    <GeneralContext.Provider
      value={{
        openCart,
        setOpenCart: (val: boolean) => setOpenCart(val),
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralProvider = () => useContext(GeneralContext);

export default GeneralProvider;
