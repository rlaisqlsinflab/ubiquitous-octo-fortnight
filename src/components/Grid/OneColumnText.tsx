import type { UserComponent } from '@craftjs/core';
import { Element, useEditor, useNode } from '@craftjs/core';
import React from 'react';

import { GridHoc } from './GridHoc';
import TextBox from '../Box/TextBox';

const OneColumnText: UserComponent = React.memo(
  ({
    scrollWhenCreated,
    focusWhenCreated,
    content,
  }: {
    scrollWhenCreated: boolean;
    focusWhenCreated: boolean;
    content?: string;
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
          <TextBox focusWhenCreated={focusWhenCreated} nodeId={id} content={content} />
        </Element>
      </GridHoc>
    );
  }
);

OneColumnText.displayName = 'OneColumnText';

OneColumnText.craft = {
  name: 'OneColumnText',
};

export default OneColumnText;
