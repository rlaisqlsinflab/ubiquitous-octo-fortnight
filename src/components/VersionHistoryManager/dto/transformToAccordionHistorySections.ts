import dayjs from 'dayjs';

import { transformToHistorySections } from './transformToHistorySections';
import type { AccordionHistorySection, History, HistoryGroup } from '../types';
import { HISTORY_TYPE } from '../types';

function groupByHour(histories: History[], hour: number): HistoryGroup[] {
  const result: HistoryGroup[] = [];

  histories.forEach((history) => {
    if (result.length === 0) {
      result.push({
        name: history.savedAt,
        histories: [history],
      });

      return;
    }
    const isPublishType = history.type === HISTORY_TYPE.PUBLISH;

    if (isPublishType) {
      result.push({
        name: HISTORY_TYPE.PUBLISH,
        histories: [history],
      });

      return;
    }

    const lastGroup = result
      .slice()
      .reverse()
      .find((item) => item.name !== HISTORY_TYPE.PUBLISH);

    if (!lastGroup) {
      return;
    }

    const lastGroupName = lastGroup.name;

    // NOTE: history.savedAt 이 lastGroupName 보다 1시간 이전이라면 들어감.
    const diffTime = dayjs(lastGroupName).diff(dayjs(history.savedAt), 'seconds');

    if (diffTime >= 0 && diffTime <= hour * 60 * 60) {
      lastGroup.histories.push(history);

      return;
    }

    result.push({
      name: history.savedAt,
      histories: [history],
    });
  });

  return result;
}

export function transformToAccordionHistorySections(histories: History[]) {
  const result: AccordionHistorySection[] = [];
  const historySections = transformToHistorySections(histories);

  historySections.forEach((historySection) => {
    result.push({
      date: historySection.date,
      historyGroups: groupByHour(historySection.histories, 1),
    });
  });

  return result;
}
