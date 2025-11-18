import { describe, it, expect } from 'vitest';

import { sanitizeUrl } from './sanitizeUrl';

const context = describe;

describe('sanitizeUrl', () => {
  it('URL이 빈 문자열인 경우, 빈 문자열을 반환한다.', () => {
    expect(sanitizeUrl('')).toBe('');
  });

  it('URL이 "https://"로 시작하는 경우, 원래 URL을 그대로 반환한다.', () => {
    const url = 'https://example.com';
    expect(sanitizeUrl(url)).toBe(url);
  });

  it('URL이 "http://"로 시작하는 경우, 원래 URL을 그대로 반환한다.', () => {
    const url = 'http://example.com';
    expect(sanitizeUrl(url)).toBe(url);
  });

  context('"https://" 또는 "http://"로 시작하지 않는 경우', () => {
    it('"https://"를 URL 앞에 추가하여 반환한다.', () => {
      const url = 'example.com';
      const expectedUrl = 'https://example.com';
      expect(sanitizeUrl(url)).toBe(expectedUrl);
    });
  });
});
