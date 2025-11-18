import type { UserComponent } from '@craftjs/core';

export const SEPARATOR_CLASS_NAME = 'separator-element';

const NewSeparator: UserComponent = () => (
  <div className={SEPARATOR_CLASS_NAME}>
    <div className="separator-element__line" />
  </div>
);

NewSeparator.craft = {
  displayName: 'Separator',
};

export default NewSeparator;
