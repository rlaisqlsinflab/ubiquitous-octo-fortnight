import { Element } from '@craftjs/core';
import React from 'react';

import AddElementBox from './AddElementBox';
import { BOX_CLASSNAME } from './constants';

const Box = React.memo(() => (
  <Element is="div" id="box">
    <div className={BOX_CLASSNAME}>
      <AddElementBox />
    </div>
  </Element>
));

Box.displayName = 'Box';

export default Box;
