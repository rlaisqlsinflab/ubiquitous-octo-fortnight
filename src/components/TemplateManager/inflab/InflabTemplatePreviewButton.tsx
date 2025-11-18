import { HoverCard } from '@inflearn/ds-react';
import { Button } from '@mantine/core';

import { INFLAB_TEMPLATE_BUTTONS_PADDING } from './InflabTemplateButtons';
import { TemplatePreview } from '../foundation/TemplatePreview';
import { getHoverCardProps } from '../utils';

type Props = {
  topGap: number;
  templateTitle: string;
  templateHtml: string;
  handleClickTemplate: () => void;
};

export function InflabTemplatePreviewButton({
  topGap,
  templateTitle,
  templateHtml,
  handleClickTemplate,
}: Props) {
  return (
    <HoverCard {...getHoverCardProps(topGap, INFLAB_TEMPLATE_BUTTONS_PADDING)}>
      <HoverCard.Target>
        <Button variant="default" size="xs" onClick={handleClickTemplate}>
          {templateTitle}
        </Button>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <TemplatePreview templateHtml={templateHtml} templateTitle={templateTitle} />
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
