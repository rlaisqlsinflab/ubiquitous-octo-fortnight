import type { FrameProps } from '@craftjs/core';
import { Element, Frame as CraftFrame, useEditor } from '@craftjs/core';
import type { ReactNode } from 'react';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { useEffect } from 'react';

import { FocusMenuProvider } from '../context/FocusMenuContext';
import { useAutoScroll } from '../hooks/useAutoScroll';

// import { Keys } from '../utils/KeyboardEventEnum';

type Props = {
  children?: ReactNode;
  deserialize?: boolean;
} & Partial<FrameProps>;

export const BUILDER_ROOT_ID = 'builder-root';

const Frame = ({ children, json, data, deserialize, ...frameProps }: Props) => {
  const { actions } = useEditor();

  useAutoScroll({
    threshold: 120,
    speed: 50,
    enabled: true,
  });

  // FIXME: undo, redo 임시 제거함.
  // const undoHandler = () => {
  //   actions.history.undo();
  // };

  // const redoHandler = () => {
  //   actions.history.redo();
  // };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const historyEventHandler = (event: KeyboardEvent) => {
  //   if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === Keys.z) {
  //     event.preventDefault();
  //     event.stopPropagation();

  //     redoHandler();

  //     return;
  //   }

  //   if ((event.ctrlKey || event.metaKey) && event.key === Keys.z) {
  //     event.preventDefault();
  //     event.stopPropagation();

  //     undoHandler();

  //     return;
  //   }
  // };

  useEffect(() => {
    if (deserialize && (data || json)) {
      actions.deserialize(data || json || '');
    }
  }, [json, data, deserialize, actions]);

  // useEffect(() => {
  //   window.addEventListener('keydown', historyEventHandler);

  //   return () => {
  //     window.removeEventListener('keydown', historyEventHandler);
  //   };
  // }, [historyEventHandler]);

  return (
    <FocusMenuProvider>
      <div id={BUILDER_ROOT_ID}>
        <CraftFrame data={data || json} {...frameProps}>
          <Element is="div" canvas>
            {children}
          </Element>
        </CraftFrame>
      </div>
    </FocusMenuProvider>
  );
};

export default Frame;
