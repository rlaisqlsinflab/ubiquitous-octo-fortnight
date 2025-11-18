import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { useSEOChecker } from './useSEOChecker';
import type { SEOCheckResult } from '../../utils/SEO/SEOChecker';
import type { SEORuleGroup } from '../../utils/SEO/SEORule';

type Props = {
  rules: SEORuleGroup;
  html: string;
  children: ReactNode;
};

type SEOResultContextType = {
  result: SEOCheckResult;
  retry: () => void;
};

export const SEOResultContext = createContext<SEOResultContextType>({
  result: {},
  retry: () => {
    //
  },
});

export const useSEOResultContext = () => {
  const context = useContext(SEOResultContext);

  return context;
};

export const SEOResultContextProvider = ({ rules, html, children }: Props) => {
  const { check } = useSEOChecker(rules);
  const [result, setResult] = useState<SEOCheckResult>({});

  const retry = () => {
    const currentResult = check(html);
    setResult(currentResult);
  };

  useEffect(() => {
    const currentResult = check(html);
    setResult(currentResult);
  }, [html, rules]);

  return (
    <SEOResultContext.Provider value={{ result, retry }}>{children}</SEOResultContext.Provider>
  );
};
