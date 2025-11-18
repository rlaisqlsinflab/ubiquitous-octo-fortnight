import type { UserComponent } from '@craftjs/core';
import { Element, useEditor, useNode } from '@craftjs/core';
import React from 'react';

import { GridHoc } from './GridHoc';
import { ImageText } from '../ImageText/ImageText';

const OneColumnImageText: UserComponent = React.memo(
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
          <ImageText />
        </Element>
      </GridHoc>
    );
  }
);

OneColumnImageText.displayName = 'OneColumnImageText';

OneColumnImageText.craft = {
  name: 'OneColumnImageText',
};

export default OneColumnImageText;
