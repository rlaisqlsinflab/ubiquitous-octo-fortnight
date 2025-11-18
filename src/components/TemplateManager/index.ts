export { TemplatePanel as TemplateManager } from './foundation/TemplatePanel';
export { InflabTemplateButtonType } from './context/InflabTemplatesContext';

export {
  useTemplateManagerContext,
  TemplateManagerProvider,
} from './context/TemplateManagerContext';

export type { ChangeTemplatePanelTab, TemplatePanelTab } from './foundation/fixtures';
export { TEMPLATE_PANEL_TAB_LOOKUP } from './foundation/fixtures';
export type { TemplateAuthorType, AuthorType, Template, TemplatesPagination } from './types';
export type { MyTemplateApiContextType } from './context/MyTemplateApiContext';
export type {
  InflabTemplatesContextType,
  InflabTemplatesMetadata,
} from './context/InflabTemplatesContext';
export type { TemplateMarketingCallbackContextType } from './context/TemplateMarketingCallbackContext';
