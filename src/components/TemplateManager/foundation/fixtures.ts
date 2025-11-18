export const TEMPLATE_PANEL_TAB_LOOKUP = {
  /**
   * inflab에서 제공하는 기본 템플릿
   */
  inflab: 'inflab',
  /**
   * 유저가 작성한 템플릿
   */
  my: 'my',
} as const;

export type TemplatePanelTab =
  (typeof TEMPLATE_PANEL_TAB_LOOKUP)[keyof typeof TEMPLATE_PANEL_TAB_LOOKUP];

export type ChangeTemplatePanelTab = (newTab: TemplatePanelTab) => void;
