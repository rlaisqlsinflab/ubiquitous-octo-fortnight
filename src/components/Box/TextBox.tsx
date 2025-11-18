import { Element } from '@craftjs/core';

import { BOX_CLASSNAME } from './constants';
import { Text } from '../Text/Text';

const TextBox = ({
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
      <Text focusWhenCreated={focusWhenCreated} nodeId={nodeId} content={content} />
    </div>
  </Element>
);

export default TextBox;
