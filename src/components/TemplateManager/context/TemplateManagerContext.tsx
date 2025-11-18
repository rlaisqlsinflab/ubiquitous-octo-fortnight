import { useDisclosure } from '@mantine/hooks';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { createContext, useContext } from 'react';
import type { ChangeTemplatePanelTab } from '../foundation/fixtures';
import { TEMPLATE_PANEL_TAB_LOOKUP, type TemplatePanelTab } from '../index';

type TemplateManagerContextProps = {
  templateTab: TemplatePanelTab;
  setTemplateTab: ChangeTemplatePanelTab;
  panelOpened: boolean;
  panelHandlers: {
    readonly close: () => void;
    readonly open: () => void;
    readonly toggle: () => void;
  };
  isMyTemplateCreateModalOpened: boolean;
  myTemplateCreateModalHandler: {
    readonly close: () => void;
    readonly open: () => void;
    readonly toggle: () => void;
  };
};

const TemplateManagerContext = createContext<TemplateManagerContextProps | null>(null);

TemplateManagerContext.displayName = 'TemplateManagerContext';

type Props = {
  children: ReactNode;
};

export function TemplateManagerProvider({ children }: Props) {
  const [panelOpened, panelHandlers] = useDisclosure(false);
  const [templateTab, setTemplateTab] = useState<TemplatePanelTab>(
    TEMPLATE_PANEL_TAB_LOOKUP.inflab,
  );
  const [isMyTemplateCreateModalOpened, myTemplateCreateModalHandler] = useDisclosure();

  return (
    <TemplateManagerContext.Provider
      value={{
        templateTab,
        setTemplateTab,
        panelOpened,
        panelHandlers,
        isMyTemplateCreateModalOpened,
        myTemplateCreateModalHandler,
      }}
    >
      {children}
    </TemplateManagerContext.Provider>
  );
}

export function useTemplateManagerContext() {
  const context = useContext(TemplateManagerContext);

  if (!context) {
    throw new Error('TemplateManagerContext를 찾을 수 없습니다.');
  }

  return context;
}
