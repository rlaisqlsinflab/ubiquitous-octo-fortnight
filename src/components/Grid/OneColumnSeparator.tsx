import type { UserComponent } from '@craftjs/core';
import { Element, useEditor, useNode } from '@craftjs/core';
import React from 'react';

import { GridHoc } from './GridHoc';
import NewSeparator from '../Separator/NewSeparator';

const OneColumnSeparator: UserComponent = React.memo(
  ({ scrollWhenCreated }: { scrollWhenCreated: boolean }) => {
    const editor = useEditor();
    const {
      id,
      connectors: { connect, drag },
    } = useNode();

    return (
      <GridHoc nodeId={id} editor={editor} scrollWhenCreated={scrollWhenCreated}>
        <Element
          is="div"
          className="one-column-grid"
          id="one-column-grid"
          ref={(ref: HTMLElement | null) => ref && connect(drag(ref))}>
          <NewSeparator />
        </Element>
      </GridHoc>
    );
  }
);

OneColumnSeparator.displayName = 'OneColumnSeparator';

OneColumnSeparator.craft = {
  name: 'OneColumnSeparator',
  displayName: 'OneColumnSeparator',
};

export default OneColumnSeparator;
