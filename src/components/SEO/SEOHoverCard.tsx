import type { SerializedStyles } from '@emotion/react';
import { Alert, Box, HoverCard, Icon, Stack, Text } from '@inflearn/ds-react';
import { faCheck, faCircleXmark } from '@inflearn/pro-regular-svg-icons';
import { faCircleInfo } from '@inflearn/pro-solid-svg-icons';
import type { ReactNode } from 'react';

import { useSEOResultContext } from './SEOResultContext';

type Props = {
  children?: ReactNode;
  title?: string;
};

type DefaultHoverCardProps = {
  title?: string;
  hoverCardStyle?: SerializedStyles;
};

export const SEOHoverCard = ({ children, title }: Props) => (
  /* NOTE: hover card와 같은 레벨의 컴포넌트 위에 나와야 하는 상황때문에 301로 고정 */
  <HoverCard.Dropdown css={{ zIndex: 301 }}>
    {children ?? <SEODefaultHoverCard title={title} />}
  </HoverCard.Dropdown>
);

export const SEODefaultHoverCard = ({ title, hoverCardStyle }: DefaultHoverCardProps) => {
  const { result } = useSEOResultContext();
  const defaultTitle =
    '내 강의가 검색사이트 결과 상위에 노출되도록 검색엔진 최적화(SEO) 가이드를 따라 작성해보세요.';

  return (
    <Stack spacing="sm" css={hoverCardStyle}>
      <Alert
        type="default"
        title={title ?? defaultTitle}
        icon={<Icon size="md" icon={faCircleInfo} />}
      />
      <div>
        {Object.entries(result).map(([key, value]) => {
          const targetIcon = value.passed ? faCheck : faCircleXmark;
          const targetIconColor = value.passed ? 'infgreen.7' : 'red.6';

          return (
            <Box key={key} mb={8} css={{ display: 'flex', alignItems: 'flex-start' }}>
              <Icon
                icon={targetIcon}
                color={targetIconColor}
                size="md"
                css={{ marginTop: '4px' }}
              />
              <Text color="gray.9" weight="500" m={0} ml={12}>
                {value.description}
              </Text>
            </Box>
          );
        })}
      </div>
    </Stack>
  );
};
