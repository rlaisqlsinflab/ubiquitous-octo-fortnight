import type { UserComponent } from '@craftjs/core';
import { Element } from '@craftjs/core';

import { Box } from '../Box';

const ThreeColumnGrid: UserComponent = () => (
  <Element is="div" className="three-column-grid" id="three-column-grid">
    <Box />
    <Box />
    <Box />
  </Element>
);
ThreeColumnGrid.craft = {
  name: 'ThreeColumnGrid',
};
export default ThreeColumnGrid;
