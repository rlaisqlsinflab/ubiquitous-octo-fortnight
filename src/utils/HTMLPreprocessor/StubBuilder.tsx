import { Editor, Frame } from '@craftjs/core';
import type { ReactNode } from 'react';

import { resolver } from '../../components/Builder';

const StubBuilder = ({ children }: { children: ReactNode }) => {
  return (
    <Editor resolver={resolver}>
      <Frame>{children}</Frame>
    </Editor>
  );
};

export default StubBuilder;
