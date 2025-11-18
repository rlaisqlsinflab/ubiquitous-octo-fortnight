import { css } from '@emotion/react';
import { Box, Group } from '@inflearn/ds-react';
import { useHover } from '@mantine/hooks';
import type { ReactNode } from 'react';
import { useState, useId, useCallback } from 'react';

import { ActionMenuContext } from '../../context/ActionMenuContext';
import { useFocusMenuContext } from '../../context/FocusMenuContext';

type Props = {
  actionButtons?: ReactNode;
  children?: ReactNode;
  isRootBlock?: boolean;
};

export const LEFT_ACTION_MENU_WRAPPER_CLASS_NAME = 'left-action-menu-wrapper';
export const LEFT_ACTION_MENU_CLASS_NAME = 'left-action-menu';

export const LeftActionMenu = ({ children, actionButtons }: Props) => {
  const { hovered, ref } = useHover();
  const menuId = useId();
  const { focusedMenuId, setFocusedMenuId } = useFocusMenuContext();

  const [preventHoverEffect, setPreventHoverEffectAction] = useState(false);

  const setPreventHoverEffect = (value: boolean) => {
    setPreventHoverEffectAction(value);
  };

  const isFocused = focusedMenuId === menuId;
  const showHoverEffect = hovered && !preventHoverEffect;
  const showActionMenu = showHoverEffect || isFocused;

  const handleFocus = useCallback(() => {
    setFocusedMenuId(menuId);
  }, [menuId, setFocusedMenuId]);

  const handleBlur = useCallback(() => {
    if (focusedMenuId === menuId) {
      setFocusedMenuId(null);
    }
  }, [focusedMenuId, menuId, setFocusedMenuId]);

  return (
    <ActionMenuContext.Provider
      value={{ isHoverOnBlock: hovered, isFocused, preventHoverEffect, setPreventHoverEffect }}>
      <div
        className={LEFT_ACTION_MENU_WRAPPER_CLASS_NAME}
        css={css({
          position: 'relative',
          border: '1px solid transparent',
          height: 'fit-content',
        })}
        ref={ref}
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleBlur}>
        {children}
        <Box
          className={LEFT_ACTION_MENU_CLASS_NAME}
          css={css({
            position: 'absolute',
            display: showActionMenu ? 'block' : 'none',
            zIndex: 201,
            top: 0,
            left: 0,
            bottom: 0,
            paddingTop: 8,
            // 선택하는걸로 변경 시 'translateX(-110%) 으로 교체 후 제거'
            paddingRight: 10,
            transform: 'translateX(-100%)',
            '&:hover': {
              display: 'block',
            },
          })}>
          {actionButtons ? (
            <Group
              align="center"
              p={1}
              spacing={0}
              css={css({
                position: 'relative',
                borderRadius: 4,
                background: 'white',
              })}>
              {actionButtons}
            </Group>
          ) : null}
        </Box>
      </div>
    </ActionMenuContext.Provider>
  );
};
