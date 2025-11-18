import { Element } from '@craftjs/core';

import { BOX_CLASSNAME } from './constants';
import { ColumnText } from '../Text/ColumnText';

const ColumnTextBox = ({
  nodeId,
  focusWhenCreated = false,
  content,
}: {
  nodeId?: string;
  focusWhenCreated?: boolean;
  content?: string;
}) => (
  <Element is="div" id="box">
    <div className={BOX_CLASSNAME}>
      <ColumnText focusWhenCreated={focusWhenCreated} nodeId={nodeId} content={content} />
    </div>
  </Element>
);

export default ColumnTextBox;
