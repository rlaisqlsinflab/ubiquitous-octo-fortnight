import { describe, expect, it } from 'vitest';

import { generateMockHistory } from './generateMockHistory';
import { transformToAccordionHistorySections } from './transformToAccordionHistorySections';
import type { History } from '../types';

const context = describe;

describe('transformToAccordionHistorySections', () => {
  function init(overrides: History[] = []) {
    return transformToAccordionHistorySections([
      generateMockHistory({ savedAt: '2021-01-02 00:00:00', type: 'DRAFT', origin: undefined }),
      generateMockHistory({ savedAt: '2021-01-01 01:01:00', type: 'DRAFT', origin: undefined }),
      generateMockHistory({ savedAt: '2021-01-01 01:00:00', type: 'DRAFT', origin: undefined }),
      generateMockHistory({ savedAt: '2021-01-01 00:03:00', type: 'DRAFT', origin: undefined }),
      generateMockHistory({ savedAt: '2021-01-01 00:02:00', type: 'DRAFT', origin: undefined }),
      generateMockHistory({ savedAt: '2021-01-01 00:01:00', type: 'DRAFT', origin: undefined }),
      generateMockHistory({ savedAt: '2021-01-01 00:00:00', type: 'DRAFT', origin: undefined }),
      ...overrides,
    ]);
  }

  it('년월일이 동일한 history 를 그룹화한다.(AccordionHistorySection)', () => {
    const [group1, group2] = init();

    expect(group1.date).toBe('2021-01-02');
    expect(group2.date).toBe('2021-01-01');
  });

  it('그룹화된 history 들을 1시간 단위로 한번 더 그룹화한다.(HistoryGroup)', () => {
    const [group1, group2, group3] = init([
      generateMockHistory({ savedAt: '2020-12-31 23:59:59', type: 'RESTORE', origin: undefined }),
      generateMockHistory({ savedAt: '2020-12-31 22:59:59', type: 'RESTORE', origin: undefined }),
    ]);

    expect(group1.date).toBe('2021-01-02');
    expect(group1.historyGroups[0].name).toBe('2021-01-02 00:00:00');
    expect(group1.historyGroups[0].histories).toHaveLength(1);
    expect(group1.historyGroups[0].histories[0].savedAt).toBe('2021-01-02 00:00:00');

    expect(group2.date).toBe('2021-01-01');
    expect(group2.historyGroups[0].name).toBe('2021-01-01 01:01:00');
    expect(group2.historyGroups[0].histories).toHaveLength(5);
    expect(group2.historyGroups[0].histories[0].savedAt).toBe('2021-01-01 01:01:00');
    expect(group2.historyGroups[0].histories[1].savedAt).toBe('2021-01-01 01:00:00');
    expect(group2.historyGroups[0].histories[2].savedAt).toBe('2021-01-01 00:03:00');
    expect(group2.historyGroups[0].histories[3].savedAt).toBe('2021-01-01 00:02:00');
    expect(group2.historyGroups[0].histories[4].savedAt).toBe('2021-01-01 00:01:00');

    expect(group2.historyGroups[1].name).toBe('2021-01-01 00:00:00');
    expect(group2.historyGroups[1].histories).toHaveLength(1);
    expect(group2.historyGroups[1].histories[0].savedAt).toBe('2021-01-01 00:00:00');

    expect(group3.historyGroups[0].name).toBe('2020-12-31 23:59:59');
    expect(group3.historyGroups[0].histories).toHaveLength(2);
    expect(group3.historyGroups[0].histories[0].savedAt).toBe('2020-12-31 23:59:59');
    expect(group3.historyGroups[0].histories[1].savedAt).toBe('2020-12-31 22:59:59');
  });

  context('history 타입이 PUBLISH 라면', () => {
    it('따로 그룹화한다.(HistoryGroup)', () => {
      const groups = init([
        generateMockHistory({ savedAt: '2020-12-31 00:03:00', type: 'RESTORE' }),
        generateMockHistory({ savedAt: '2020-12-31 00:02:00', type: 'PUBLISH', origin: undefined }),
        generateMockHistory({ savedAt: '2020-12-31 00:01:00', type: 'RESTORE' }),
      ]);

      expect(groups[2].historyGroups[1].name).toBe('PUBLISH');
      expect(groups[2].historyGroups[1].histories).toHaveLength(1);
      expect(groups[2].historyGroups[1].histories[0].savedAt).toBe('2020-12-31 00:02:00');
    });
  });
});
