import { css } from '@emotion/react';
import { Box, COLOR_PALETTE, Flex, Text } from '@inflearn/ds-react';

import { BUILDER_CONTENT_WIDTH, HEADER_HEIGHT, PREVIEW_GAP, PREVIEW_WIDTH } from '../styleFixtures';

type TemplatePreviewProps = {
  templateTitle: string;
  templateHtml: string;
};

export const TemplatePreview = ({ templateTitle, templateHtml }: TemplatePreviewProps) => {
  const templateHtmlScale = PREVIEW_WIDTH / BUILDER_CONTENT_WIDTH;

  return (
    <Flex
      css={css({
        maxHeight: `calc(100vh - ${HEADER_HEIGHT + PREVIEW_GAP * 2}px)`,
        height: `calc(100vh - ${HEADER_HEIGHT + PREVIEW_GAP * 2}px)`,
      })}
      direction="column">
      <Text
        m={0}
        color="gray.7"
        p="md"
        css={css({
          borderBottom: `1px solid ${COLOR_PALETTE.gray[2]}`,
        })}>
        {templateTitle}
      </Text>
      <Box
        css={{
          flex: 1,
          overflow: 'hidden auto',
        }}>
        <Box
          css={css({
            padding: '12px 8px',
            width: BUILDER_CONTENT_WIDTH,
            transformOrigin: '0 0',
            transform: `scale(calc(${templateHtmlScale}))`,
            // NOTE: transform 된 만큼 높이를 조정해줘야 함
            height: `calc(100% * ${templateHtmlScale})`,
          })}
          dangerouslySetInnerHTML={{ __html: templateHtml }}
        />
      </Box>
    </Flex>
  );
};
