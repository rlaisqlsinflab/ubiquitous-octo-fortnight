import { HoverCard } from '@inflearn/ds-react';
import { UnstyledButton } from '@mantine/core';
import type { ReactNode } from 'react';

import { ConfirmApplyTemplateModal } from '../foundation/ConfirmApplyTemplateModal';
import { TemplatePreview } from '../foundation/TemplatePreview';
import { useTemplateButton } from '../hooks/useTemplateButton';
import { getHoverCardProps } from '../utils';

type TemplateButtonProps = {
  /**
   * @description hover card의 top 값을 계산하기 위해 필요한 값입니다. GNB등의 구성요소가 있을 경우 해당 요소의 높이를 전달해주세요.
   */
  topGap: number;
  templateTitle: string;
  templateHtml: string;
  templateJson: string;
  checkIsEmptyTemplateContent: (jsonBody: string) => boolean;
  children: ReactNode;
};

export const MyTemplateButton = ({
  topGap,
  templateTitle,
  templateHtml,
  templateJson,
  children,
  checkIsEmptyTemplateContent,
}: TemplateButtonProps) => {
  const { isModalOpened, setIsModalOpened, handleClickTemplate, applyTemplate } = useTemplateButton(
    templateTitle,
    templateJson,
    checkIsEmptyTemplateContent
  );

  return (
    <>
      <HoverCard {...getHoverCardProps(topGap)}>
        <HoverCard.Target>
          <UnstyledButton w="100%" onClick={handleClickTemplate}>
            {children}
          </UnstyledButton>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <TemplatePreview templateHtml={templateHtml} templateTitle={templateTitle} />
        </HoverCard.Dropdown>
      </HoverCard>
      <ConfirmApplyTemplateModal
        opened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
        onConfirm={() => {
          applyTemplate();
          setIsModalOpened(false);
        }}
      />
    </>
  );
};
