import type { UserComponent } from '@craftjs/core';
import { Element } from '@craftjs/core';

import { Box } from '../Box';

const TwoToOneColumnGrid: UserComponent = () => (
  <Element is="div" className="two-column-grid two-column-grid--2to1" id="two-column-grid">
    <Box />
    <Box />
  </Element>
);
TwoToOneColumnGrid.craft = {
  name: 'TwoToOneColumnGrid',
};
export default TwoToOneColumnGrid;
