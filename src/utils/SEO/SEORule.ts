import type React from 'react';

export type SEOResult = {
  description: string | React.ReactNode;
  passed: boolean;
};

export type SEORule = {
  check(html: string): SEOResult;
};

export type SEORuleGroup = Record<string, SEORule>;
