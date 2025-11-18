import { describe, expect, it } from 'vitest';

import { generateMockHistories } from './generateMockHistories';
import { transformToHistorySections } from './transformToHistorySections';

describe('transformToHistorySections', () => {
  it('년월일이 동일한 history 를 그룹화한다.', () => {
    const [group1, group2] = transformToHistorySections([
      ...generateMockHistories('2021-01-01 00:00:00', 3),
      ...generateMockHistories('2021-01-02 00:00:00', 5),
    ]);

    expect(group1.date).toBe('2021-01-01');
    expect(group1.histories).toHaveLength(3);
    expect(group2.date).toBe('2021-01-02');
    expect(group2.histories).toHaveLength(5);
  });
});
