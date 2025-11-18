import type { UserComponent } from '@craftjs/core';
import { Element } from '@craftjs/core';

import { Box } from '../Box';

const OneToTwoColumnGrid: UserComponent = () => (
  <Element is="div" className="two-column-grid two-column-grid--1to2" id="two-column-grid">
    <Box />
    <Box />
  </Element>
);
OneToTwoColumnGrid.craft = {
  name: 'OneToTwoColumnGrid',
};
export default OneToTwoColumnGrid;
