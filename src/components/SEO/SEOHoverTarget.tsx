import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { Box, HoverCard, Icon, Text } from '@inflearn/ds-react';
import { faCircleInfo } from '@inflearn/pro-regular-svg-icons';
import type { ReactNode } from 'react';

import { SEOFaceIcon } from './SEOFaceIcon';
import { useSEOResultContext } from './SEOResultContext';

type Props = {
  children?: ReactNode;
  isLoading: boolean;
};

type DefaultHoverTargetProps = {
  isLoading: boolean;
  targetStyle?: SerializedStyles;
};

export const SEOHoverTarget = ({ children, isLoading }: Props) => (
  <HoverCard.Target>
    <Box css={{ display: 'inline-block' }}>
      {children ?? <SEODefaultHoverTarget isLoading={isLoading} />}
    </Box>
  </HoverCard.Target>
);

export const SEODefaultHoverTarget = ({ isLoading, targetStyle }: DefaultHoverTargetProps) => {
  const { result } = useSEOResultContext();

  return (
    <Box
      css={[styleSEODefaultHoverTarget, targetStyle]}
      aria-label="작성한 콘텐츠의 SEO 분석 결과 확인하기"
      role="button">
      <Box css={styleSEODefaultHoverTitle}>
        <SEOFaceIcon seoResult={result} isLoading={isLoading} />
        <Text m={0} ml={6}>
          SEO 분석
        </Text>
      </Box>
      <Box>
        <Icon icon={faCircleInfo} size="sm" color="gray.6" />
      </Box>
    </Box>
  );
};

const styleSEODefaultHoverTarget = css({
  display: 'flex',
  justifyContent: 'space-between',
  borderRadius: '8px',
  padding: '16px',
  width: '187px',
  backgroundColor: 'white',
  cursor: 'pointer',
});

const styleSEODefaultHoverTitle = css({
  display: 'flex',
  alignItems: 'center',
});
