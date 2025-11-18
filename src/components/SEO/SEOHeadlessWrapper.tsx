import type { ReactElement } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { SEOCheckResult } from '../../utils/SEO/SEOChecker';
import { SEOChecker } from '../../utils/SEO/SEOChecker';
import type { SEORuleGroup } from '../../utils/SEO/SEORule';

type ChildProps = {
  result: SEOCheckResult;
  updateSeo: () => void;
};

type ChildType = (props: ChildProps) => ReactElement;

type Props = {
  rules: SEORuleGroup;
  html: string;
  children: ChildType;
};

export const SEOHeadlessWrapper = ({ rules, html, children }: Props) => {
  const seoChecker = useMemo(() => new SEOChecker(rules), [rules]);

  const [seoResult, setSeoResult] = useState<SEOCheckResult>({});

  const updateSeoCheckResult = useCallback(() => {
    const result = seoChecker.run(html);

    setSeoResult(result);
  }, [html, seoChecker]);

  useEffect(() => {
    updateSeoCheckResult();
  }, [html, rules, updateSeoCheckResult]);

  return children({ result: seoResult, updateSeo: updateSeoCheckResult });
};
