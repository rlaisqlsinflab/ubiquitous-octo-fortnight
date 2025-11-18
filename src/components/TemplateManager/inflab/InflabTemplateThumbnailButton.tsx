import { Flex, Text } from '@inflearn/ds-react';
import { UnstyledButton } from '@mantine/core';

import type { InflabTemplatesMetadata } from '../context/InflabTemplatesContext';
import { TemplateThumbnailContainer } from '../TemplateThumbnailContainer';

type Props = {
  thumbnail: Required<InflabTemplatesMetadata[number]>['thumbnail'];
  templateTitle: string;
  handleClickTemplate: () => void;
};

export function InflabTemplateThumbnailButton({
  thumbnail,
  templateTitle,
  handleClickTemplate,
}: Props) {
  return (
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
  );
}
