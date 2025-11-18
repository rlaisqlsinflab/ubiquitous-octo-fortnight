import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

import type { History } from '../types';

export function generateMockHistory(overrides: Partial<History>): History {
  return {
    id: faker.number.int(),
    name: faker.string.sample(),
    savedAt: dayjs(faker.date.anytime()).format('YYYY-MM-DD HH:mm:ss'),
    type: faker.helpers.arrayElement(['RESTORE', 'PUBLISH', 'MANUAL', 'AUTO', 'DRAFT']),
    userName: faker.internet.userName(),
    userId: faker.number.int(),
    origin: {
      id: faker.number.int(),
      name: faker.string.sample(),
      savedAt: dayjs(faker.date.anytime()).format('YYYY-MM-DD HH:mm:ss'),
      type: faker.helpers.arrayElement(['RESTORE', 'PUBLISH', 'MANUAL', 'AUTO', 'DRAFT']),
      userName: faker.internet.userName(),
      userId: faker.number.int(),
    },
    ...overrides,
  };
}
