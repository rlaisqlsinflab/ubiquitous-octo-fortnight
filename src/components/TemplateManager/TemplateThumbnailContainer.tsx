import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { COLOR_PALETTE, Flex } from '@inflearn/ds-react';
import type { ReactNode } from 'react';

type TemplateThumbnailContainerProps = {
  styleWrapper?: SerializedStyles;
  children?: ReactNode;
};

// NOTE: svg는 figma에서 추출

export const TemplateThumbnailContainer = ({
  children,
  styleWrapper,
}: TemplateThumbnailContainerProps) => (
  <Flex
    p="xs"
    css={[
      styleWrapper,
      css({
        borderRadius: 4,
        border: `1px solid ${COLOR_PALETTE.gray[3]}`,
        img: { width: '100%' },
        backgroundColor: 'white',
        minHeight: 85,
      }),
    ]}>
    {children}
  </Flex>
);
