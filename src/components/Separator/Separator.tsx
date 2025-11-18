import type { UserComponent } from '@craftjs/core';

export const SEPARATOR_CLASS_NAME = 'separator-element';

const Separator: UserComponent = () => (
  <div className={SEPARATOR_CLASS_NAME}>
    <div className="separator-element__line"></div>
  </div>
);

Separator.craft = {
  displayName: 'Separator',
};

export default Separator;
