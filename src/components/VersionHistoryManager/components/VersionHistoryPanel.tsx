import type { DrawerProps } from '@inflearn/ds-react';
import { Drawer } from '@inflearn/ds-react';
import type { ReactNode } from 'react';

import { VersionHistoryRestoreModalProvider } from '../context/VersionHistoryModalProvider';

type Props = {
  // NOTE: history props
  children: ReactNode;

  // NOTE: style & drawer component props
  withinPortal?: DrawerProps['withinPortal'];
  portalTarget?: DrawerProps['target'];
  portalProps?: DrawerProps['portalProps'];
  opened: boolean;
  close: () => void;
};

const TEMPLATE_PANEL_WIDTH = 219;

const HEADER_HEIGHT = 67;

export function VersionHistoryPanel({
  children,
  withinPortal,
  portalTarget,
  portalProps,
  opened,
  close,
}: Props) {
  return (
    <VersionHistoryRestoreModalProvider>
      <Drawer
        styles={{
          inner: {
            top: HEADER_HEIGHT,
            right: 0,
          },
          content: {
            display: 'flex',
            flexDirection: 'column',
          },
          body: {
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
            padding: 0,
            height: `calc(100% - ${HEADER_HEIGHT}px)`,
          },
        }}
        closeOnEscape={false}
        trapFocus
        portalProps={portalProps}
        target={portalTarget}
        withinPortal={withinPortal}
        position="right"
        lockScroll={false}
        withOverlay={false}
        withCloseButton
        size={TEMPLATE_PANEL_WIDTH}
        opened={opened}
        onClose={close}
        title="버전 기록">
        {children}
      </Drawer>
    </VersionHistoryRestoreModalProvider>
  );
}
