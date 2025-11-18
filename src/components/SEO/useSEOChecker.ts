import { useMemo } from 'react';

import { SEOChecker } from '../../utils/SEO/SEOChecker';
import type { SEORuleGroup } from '../../utils/SEO/SEORule';

export const useSEOChecker = (rules: SEORuleGroup) => {
  const checker = useMemo(() => new SEOChecker(rules), [rules]);

  const check = (content: string) => {
    if (typeof content !== 'string') {
      throw Error('SEOChecker: html은 string이어야 합니다.');
    }

    return checker.run(content);
  };

  return {
    check,
  };
};
