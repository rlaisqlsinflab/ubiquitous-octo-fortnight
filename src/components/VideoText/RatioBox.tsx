import type { ReactNode } from 'react';

type RatioBoxProps = {
  children: ReactNode;
};

export const RatioBox = ({ children }: RatioBoxProps) => (
  <div className="video-text__ratio-box">
    <div className="video-text__ratio-box-inner-wrapper">{children}</div>
  </div>
);
