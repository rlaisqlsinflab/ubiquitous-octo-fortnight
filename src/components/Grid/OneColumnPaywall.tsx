import type { UserComponent } from '@craftjs/core';
import { useEditor } from '@craftjs/core';
import { Element, useNode } from '@craftjs/core';
import React from 'react';

import { GridHoc } from './GridHoc';
import Paywall from '../Paywall/Paywall';

const OneColumnPaywall: UserComponent = React.memo(
  ({ scrollWhenCreated }: { scrollWhenCreated: boolean }) => {
    const editor = useEditor();
    const {
      id,
      connectors: { connect, drag },
    } = useNode();

    return (
      <GridHoc
        nodeId={id}
        editor={editor}
        scrollWhenCreated={scrollWhenCreated}
        className="paywall-grid">
        <Element
          is="div"
          className="one-column-grid"
          id="one-column-grid"
          ref={(ref: HTMLElement | null) => ref && connect(drag(ref))}>
          <Paywall />
        </Element>
      </GridHoc>
    );
  }
);

OneColumnPaywall.displayName = 'OneColumnPaywall';

OneColumnPaywall.craft = {
  name: 'OneColumnPaywall',
};

export default OneColumnPaywall;
