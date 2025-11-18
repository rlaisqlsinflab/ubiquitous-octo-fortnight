import type { History, HistorySection } from '../types';

export function transformToHistorySections(histories: History[]) {
  const result: HistorySection[] = [];

  histories.forEach((history) => {
    const date = history.savedAt.split(' ')[0];
    const index = result.findIndex((r) => r.date === date);

    if (index === -1) {
      result.push({
        date,
        histories: [history],
      });

      return;
    }

    result[index].histories.push(history);
  });

  return result;
}
