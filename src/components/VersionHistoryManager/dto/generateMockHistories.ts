import { generateMockHistory } from './generateMockHistory';

export function generateMockHistories(savedAt: string, number: number) {
  return Array(number)
    .fill(0)
    .map(() =>
      generateMockHistory({
        savedAt,
      })
    );
}
