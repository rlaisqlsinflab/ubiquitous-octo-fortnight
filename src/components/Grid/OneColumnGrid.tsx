import type { UserComponent } from '@craftjs/core';
import { Element } from '@craftjs/core';
import React from 'react';

import { Box } from '../Box';

const OneColumnGrid: UserComponent = React.memo(() => (
  <Element is="div" className="one-column-grid" id="one-column-grid">
    <Box />
  </Element>
));

OneColumnGrid.displayName = 'OneColumnGrid';

OneColumnGrid.craft = {
  name: 'OneColumnGrid',
};

export default OneColumnGrid;
