import dayjs from 'dayjs';

import type { History } from './types';

export function getHistoryName(history: History) {
  return history.name === '' ? dayjs(history.savedAt).format('MM.DD HH:mm') : history.name;
}
