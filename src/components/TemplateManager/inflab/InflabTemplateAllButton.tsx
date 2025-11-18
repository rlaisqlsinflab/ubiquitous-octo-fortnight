import { Flex, HoverCard, Text } from '@inflearn/ds-react';
import { UnstyledButton } from '@mantine/core';

import { INFLAB_TEMPLATE_BUTTONS_PADDING } from './InflabTemplateButtons';
import type { InflabTemplatesMetadata } from '../context/InflabTemplatesContext';
import { TemplatePreview } from '../foundation/TemplatePreview';
import { TemplateThumbnailContainer } from '../TemplateThumbnailContainer';
import { getHoverCardProps } from '../utils';

type Props = {
  topGap: number;
  thumbnail: Required<InflabTemplatesMetadata[number]>['thumbnail'];
  templateHtml: string;
  templateTitle: string;
  handleClickTemplate: () => void;
};

export function InflabTemplateAllButton({
  topGap,
  thumbnail,
  templateHtml,
  templateTitle,
  handleClickTemplate,
}: Props) {
  return (
    <HoverCard {...getHoverCardProps(topGap, INFLAB_TEMPLATE_BUTTONS_PADDING)}>
      <HoverCard.Target>
        <UnstyledButton onClick={handleClickTemplate}>
          <Flex direction="column" gap={4}>
            <TemplateThumbnailContainer>
              <img src={thumbnail.url} alt={thumbnail.alt} />
            </TemplateThumbnailContainer>
            <Text size="xs" color="gray.7" m={0}>
              {templateTitle}
            </Text>
          </Flex>
        </UnstyledButton>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <TemplatePreview templateHtml={templateHtml} templateTitle={templateTitle} />
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
