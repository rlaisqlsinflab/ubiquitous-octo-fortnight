import type { UserComponent } from '@craftjs/core';
import { useEditor } from '@craftjs/core';
import { Element, useNode } from '@craftjs/core';

import { GridHoc } from './GridHoc';
import ColumnTextBox from '../Box/ColumnTextBox';

const OneToTwoColumnText: UserComponent = ({
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
        className="two-column-grid two-column-grid--1to2"
        id="two-column-grid"
        ref={(ref: HTMLElement | null) => ref && connect(drag(ref))}>
        <ColumnTextBox focusWhenCreated={focusWhenCreated} />
        <ColumnTextBox />
      </Element>
    </GridHoc>
  );
};

OneToTwoColumnText.craft = {
  name: 'OneToTwoColumnText',
};

export default OneToTwoColumnText;
