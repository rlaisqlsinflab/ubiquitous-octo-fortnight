import { createContext } from 'react';

export type ActionMenuContextType = {
  isHoverOnBlock: boolean;
  isFocused?: boolean;

  preventHoverEffect: boolean;
  setPreventHoverEffect: (preventHoverEffect: boolean) => void;
};

const initialValue: ActionMenuContextType = {
  isHoverOnBlock: false,

  preventHoverEffect: false,
  setPreventHoverEffect: () => {
    //
  },
};

export const ActionMenuContext = createContext(initialValue);
