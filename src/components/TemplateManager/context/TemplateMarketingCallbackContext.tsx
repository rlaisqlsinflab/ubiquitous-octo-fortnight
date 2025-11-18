/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export type TemplateMarketingCallbackContextType = {
  onOpenMyTemplateSaveModal?: () => void;
  onTemplateManagerOpened?: () => void;
  onClickCreateMyTemplateButton?: (templateTitle: string) => void;
  onApplyTemplate?: (isInflabTemplate: boolean, templateTitle: string) => void;
};

const defaultValue = {
  onOpenMyTemplateSaveModal: () => {},
  onTemplateManagerOpened: () => {},
  onClickCreateMyTemplateButton: () => {},
  onApplyTemplate: () => {},
};

export const TemplateMarketingCallbackContext =
  createContext<TemplateMarketingCallbackContextType>(defaultValue);
