import { useState, useRef, useMemo, useCallback } from 'react';
import type { MouseEvent, ReactNode } from 'react';

import { ActionMenuContext } from '../../context/ActionMenuContext';

export const ACTION_MENU_WRAPPER_CLASS_NAME = 'action-menu-wrapper';
export const ACTION_MENU_VIEW_MODE_CLASS_NAME = 'action-menu-wrapper--view-mode';
export const ACTION_MENU_TAB_CLASS_NAME = 'action-menu__tab';

const classSelector = (className: string) => `.${className}`;

type MouseEventObject = MouseEvent<HTMLDivElement, globalThis.MouseEvent>;
type Props = {
  actionButtons?: ReactNode;
  children?: ReactNode;
  isRootBlock?: boolean;
  onMouseOver?: (event: MouseEventObject, setState: (value: boolean) => void) => void;
};

export const ActionMenu = ({ children, actionButtons, isRootBlock, onMouseOver }: Props) => {
  const [isHoverOnBlock, setIsHoverOnBlockAction] = useState(false);

  const setIsHoverOnBlock = useCallback((value: boolean) => {
    setIsHoverOnBlockAction(value);
  }, []);

  const [preventHoverEffect, setPreventHoverEffectAction] = useState(false);

  const setPreventHoverEffect = useCallback((value: boolean) => {
    setPreventHoverEffectAction(value);
  }, []);

  const actionMenuWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleMouseOver = useMemo(() => {
    if (onMouseOver) {
      return (event: MouseEventObject) => {
        onMouseOver(event, setIsHoverOnBlock);
      };
    }

    return (event: MouseEventObject) => {
      // NOTE: 액션 메뉴 내부에 액션 메뉴가 중첩되고, 내부의 액션메뉴에 호버를 했을 때 블록 추가 액션메뉴를 노출하지 않기 위해 추가한 이벤트.
      // 이 이벤트는 mouseover 이벤트이기 때문에 action-menu-wrapper를 포함한 모든 요소에 마우스가 올라가면 이벤트가 발생합니다.
      if (!isRootBlock) {
        return;
      }

      const current = event.target as HTMLElement;
      const isActionMenu = current.closest(classSelector('action-menu'));

      if (isActionMenu) {
        return;
      }

      const actionMenuWrapper = current.closest(classSelector('action-menu-wrapper'));

      if (!actionMenuWrapper) {
        // onMouseOver 이벤트가 발생하면 action-menu-wrapper가 본인 또는 부모에 없을 수 없습니다. 하지만 타입 안정성을 위해 추가합니다.
        return;
      }

      // 마우스가 올라간 요소의 부모 action-menu-wrapper가 중첩된 요소인지 아니면 루트 요소인지 판단합니다.
      const isUnderRootBlock = actionMenuWrapper.classList.contains('action-menu-wrapper--root');

      if (isUnderRootBlock) {
        setIsHoverOnBlock(true);

        return;
      }

      if (isHoverOnBlock) {
        setIsHoverOnBlock(false);
      }
    };
  }, [isHoverOnBlock, isRootBlock, onMouseOver, setIsHoverOnBlock]);

  const showHoverEffect = isHoverOnBlock && !preventHoverEffect;

  const contextValue = useMemo(
    () => ({
      isHoverOnBlock,
      setIsHoverOnBlock,
      preventHoverEffect,
      setPreventHoverEffect,
    }),
    [isHoverOnBlock, setIsHoverOnBlock, preventHoverEffect, setPreventHoverEffect]
  );

  return (
    <ActionMenuContext.Provider value={contextValue}>
      <div
        className={`${ACTION_MENU_WRAPPER_CLASS_NAME} ${
          isRootBlock ? 'action-menu-wrapper--root' : ''
        }`}
        onMouseOver={handleMouseOver}
        onMouseEnter={() => {
          setIsHoverOnBlock(true);
        }}
        onMouseLeave={() => {
          setIsHoverOnBlock(false);
        }}
        ref={actionMenuWrapperRef}>
        {children}
        {showHoverEffect ? (
          <div
            className={`action-menu ${ACTION_MENU_TAB_CLASS_NAME} ${
              showHoverEffect ? 'action-menu--hover' : ''
            }`}>
            {actionButtons ? <div className="action-menu__box">{actionButtons}</div> : null}
          </div>
        ) : null}
      </div>
    </ActionMenuContext.Provider>
  );
};
