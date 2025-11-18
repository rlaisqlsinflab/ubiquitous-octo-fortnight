import { useDisclosure } from '@mantine/hooks';
import { noop } from 'lodash-es';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { createContext, useRef, useCallback, useContext } from 'react';

import type { RestoreSetter } from '../components/VersionHistoryItem/types';
import { VersionHistoryRestoreModal } from '../components/VersionHistoryItem/VersionHistoryRestoreModal';
import type { History } from '../types';

type VersionHistoryRestoreModalProps = {
  history: History;
  onClickRestore: RestoreSetter;
  isRestoreLoading: boolean;
};

type VersionHistoryRestoreModalContextType = {
  openModal: (props: VersionHistoryRestoreModalProps) => void;
  closeModal: () => void;
};

const VersionHistoryRestoreModalContext = createContext<VersionHistoryRestoreModalContextType>({
  openModal: noop,
  closeModal: noop,
});

VersionHistoryRestoreModalContext.displayName = 'VersionHistoryRestoreModalContext';

export function VersionHistoryRestoreModalProvider({ children }: { children: ReactNode }) {
  const [opened, handler] = useDisclosure();

  const modalProps = useRef<VersionHistoryRestoreModalProps>({
    history: {
      id: 0,
      name: '',
      savedAt: '',
      type: 'RESTORE',
      userName: '',
      userId: 0,
      origin: undefined,
    },
    onClickRestore: async () => undefined,
    isRestoreLoading: false,
  });

  const openModal = useCallback(
    ({ history, onClickRestore, isRestoreLoading }: VersionHistoryRestoreModalProps) => {
      modalProps.current = { history, onClickRestore, isRestoreLoading };

      handler.open();
    },
    [handler]
  );

  const closeModal = useCallback(() => {
    handler.close();
  }, [handler]);

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [openModal, closeModal]
  );

  return (
    <VersionHistoryRestoreModalContext.Provider value={value}>
      <VersionHistoryRestoreModal
        opened={opened}
        onClose={handler.close}
        onClickRestore={modalProps.current.onClickRestore}
        history={modalProps.current.history}
        isRestoreLoading={modalProps.current.isRestoreLoading}
      />
      {children}
    </VersionHistoryRestoreModalContext.Provider>
  );
}

export function useVersionHistoryRestoreModal() {
  const context = useContext(VersionHistoryRestoreModalContext);

  if (!context) {
    throw new Error('useVersionHistoryModal must be used inside VersionHistoryModalProvider');
  }

  return context;
}
