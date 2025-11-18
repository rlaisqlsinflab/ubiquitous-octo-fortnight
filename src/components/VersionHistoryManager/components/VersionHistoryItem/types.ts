import type { History } from '../../types';

export type RestoreSetter = (history: History) => Promise<void>;
export type PreviewSetter = (history: History) => void;
export type ChangeTitleSetter = (history: History, newTitle: History['name']) => Promise<void>;
