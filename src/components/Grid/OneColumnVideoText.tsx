import type { UserComponent } from '@craftjs/core';
import { Element, useEditor, useNode } from '@craftjs/core';
import React from 'react';

import { GridHoc } from './GridHoc';
import { VideoText } from '../VideoText/VideoText';

const OneColumnVideoText: UserComponent = React.memo(
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
          <VideoText />
        </Element>
      </GridHoc>
    );
  }
);

OneColumnVideoText.displayName = 'OneColumnVideoText';

OneColumnVideoText.craft = {
  name: 'OneColumnVideoText',
};

export default OneColumnVideoText;
