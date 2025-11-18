import type React from 'react';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'formAction'
> & {
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    setIsHoverOnBlock: (isHoverOnBlock: boolean) => void
  ) => void;
};
