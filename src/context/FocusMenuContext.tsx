import { createContext, type ReactNode, useContext, useState } from 'react';

export type FocusMenuContextType = {
  focusedMenuId: string | null;
  setFocusedMenuId: (id: string | null) => void;
};

const initialValue: FocusMenuContextType = {
  focusedMenuId: null,
  setFocusedMenuId: () => {
    //
  },
};

export const FocusMenuContext = createContext(initialValue);

export const useFocusMenuContext = () => {
  const context = useContext(FocusMenuContext);

  if (!context) {
    throw new Error('useFocusMenuContext must be used within a FocusMenuProvider');
  }

  return context;
};
type Props = {
  children: ReactNode;
};

export const FocusMenuProvider = ({ children }: Props) => {
  const [focusedMenuId, setFocusedMenuId] = useState<string | null>(null);

  return (
    <FocusMenuContext.Provider
      value={{
        focusedMenuId,
        setFocusedMenuId,
      }}>
      {children}
    </FocusMenuContext.Provider>
  );
};
