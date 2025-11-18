import type { UserComponent } from '@craftjs/core';
import { useEditor } from '@craftjs/core';
import { Element, useNode } from '@craftjs/core';

import { GridHoc } from './GridHoc';
import ColumnTextBox from '../Box/ColumnTextBox';

const TwoToOneColumnText: UserComponent = ({
  focusWhenCreated,
  scrollWhenCreated,
}: {
  focusWhenCreated: boolean;
  scrollWhenCreated: boolean;
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
        className="two-column-grid two-column-grid--2to1"
        id="two-column-grid"
        ref={(ref: HTMLElement | null) => ref && connect(drag(ref))}>
        <ColumnTextBox focusWhenCreated={focusWhenCreated} />
        <ColumnTextBox />
      </Element>
    </GridHoc>
  );
};

TwoToOneColumnText.craft = {
  name: 'TwoToOneColumnText',
};

export default TwoToOneColumnText;
