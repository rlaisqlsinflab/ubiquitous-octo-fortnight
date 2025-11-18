import type { UserComponent } from '@craftjs/core';
import { useEditor } from '@craftjs/core';
import { Element, useNode } from '@craftjs/core';
import React from 'react';

import { GridHoc } from './GridHoc';
import { InfoBox } from '../InfoBox/InfoBox';

const OneColumnInfoBox: UserComponent = React.memo(
  ({
    scrollWhenCreated,
    focusWhenCreated,
  }: {
    scrollWhenCreated: boolean;
    focusWhenCreated: boolean;
  }) => {
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
          <InfoBox focusWhenCreated={focusWhenCreated} />
        </Element>
      </GridHoc>
    );
  }
);

OneColumnInfoBox.displayName = 'OneColumnInfoBox';

OneColumnInfoBox.craft = {
  name: 'OneColumnInfoBox',
};

export default OneColumnInfoBox;
