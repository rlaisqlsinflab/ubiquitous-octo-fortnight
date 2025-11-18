export const HISTORY_TYPE = {
  AUTO: 'AUTO',
  DRAFT: 'DRAFT',
  RESTORE: 'RESTORE',
  PUBLISH: 'PUBLISH',
  /**
   * @deprecated
   */
  MANUAL: 'MANUAL',
} as const;

export type HistoryType = keyof typeof HISTORY_TYPE;

export type History = {
  id: number;
  name: string;
  savedAt: string;
  type: HistoryType;
  userName: string;
  userId: number;
  origin?: History;
};

export type HistorySection = {
  date: string;
  histories: History[];
};

export type HistoryGroup = {
  name: string;
  histories: History[];
};

export type AccordionHistorySection = {
  date: string;
  historyGroups: HistoryGroup[];
};
