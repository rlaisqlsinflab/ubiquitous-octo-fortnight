import { Icon, Loader } from '@inflearn/ds-react';
import { faFaceMeh, faFaceSmile, faFaceWorried } from '@inflearn/pro-regular-svg-icons';

import type { SEOCheckResult } from '../../utils/SEO/SEOChecker';

type Props = {
  seoResult: SEOCheckResult;
  isLoading: boolean;
};

export const SEOFaceIcon = ({ seoResult, isLoading }: Props) => {
  if (isLoading) {
    return <Loader size="xs" />;
  }

  const rulesLength = Object.values(seoResult).length;
  const passedRulesLength = Object.values(seoResult).filter((result) => result.passed).length;
  const failedRulesLength = rulesLength - passedRulesLength;

  // 조건이 모두 통과인 경우
  if (rulesLength === passedRulesLength) {
    return <Icon icon={faFaceSmile} color="infgreen.7" size="lg" />;
  }

  // 통과한 조건이 실패한 조건보다 많을 경우
  if (passedRulesLength >= failedRulesLength) {
    return <Icon icon={faFaceMeh} color="orange.7" size="lg" />;
  }

  return <Icon icon={faFaceWorried} color="red.7" size="lg" />;
};
