import type { UserComponent } from '@craftjs/core';
import { Element } from '@craftjs/core';

import { Box } from '../Box';

const TwoColumnGrid: UserComponent = () => (
  <Element is="div" className="two-column-grid" id="two-column-grid">
    <Box />
    <Box />
  </Element>
);

TwoColumnGrid.craft = {
  name: 'TwoColumnGrid',
};
export default TwoColumnGrid;
