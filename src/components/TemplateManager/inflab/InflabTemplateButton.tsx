import { InflabTemplateAllButton } from './InflabTemplateAllButton';
import { InflabTemplateDefaultButton } from './InflabTemplateDefaultButton';
import { InflabTemplatePreviewButton } from './InflabTemplatePreviewButton';
import { InflabTemplateThumbnailButton } from './InflabTemplateThumbnailButton';
import type { InflabTemplatesMetadata } from '../context/InflabTemplatesContext';
import { InflabTemplateButtonType } from '../context/InflabTemplatesContext';
import { ConfirmApplyTemplateModal } from '../foundation/ConfirmApplyTemplateModal';
import { useTemplateButton } from '../hooks/useTemplateButton';
import type { CheckIsEmptyTemplateContent } from '../types';

type Props = {
  topGap: number;
  thumbnail: InflabTemplatesMetadata[number]['thumbnail'];
  templateTitle: string;
  templateHtml: string;
  templateJson: string;
  checkIsEmptyTemplateContent: CheckIsEmptyTemplateContent;
  type: InflabTemplateButtonType;
};

export const InflabTemplateButton = ({
  topGap,
  thumbnail,
  templateTitle,
  templateHtml,
  templateJson,
  checkIsEmptyTemplateContent,
  type,
}: Props) => {
  const { isModalOpened, setIsModalOpened, handleClickTemplate, applyTemplate } = useTemplateButton(
    templateTitle,
    templateJson,
    checkIsEmptyTemplateContent
  );

  const hasThumbnail = !!thumbnail;

  const getButtonByType = () => {
    if (type === InflabTemplateButtonType.default) {
      return (
        <InflabTemplateDefaultButton
          templateTitle={templateTitle}
          handleClickTemplate={handleClickTemplate}
        />
      );
    }

    if (type === InflabTemplateButtonType.preview) {
      return (
        <InflabTemplatePreviewButton
          topGap={topGap}
          templateHtml={templateHtml}
          templateTitle={templateTitle}
          handleClickTemplate={handleClickTemplate}
        />
      );
    }

    if (type === InflabTemplateButtonType.thumbnail && hasThumbnail) {
      return (
        <InflabTemplateThumbnailButton
          templateTitle={templateTitle}
          thumbnail={thumbnail}
          handleClickTemplate={handleClickTemplate}
        />
      );
    }

    if (type === InflabTemplateButtonType.all && hasThumbnail) {
      return (
        <InflabTemplateAllButton
          topGap={topGap}
          templateTitle={templateTitle}
          thumbnail={thumbnail}
          templateHtml={templateHtml}
          handleClickTemplate={handleClickTemplate}
        />
      );
    }
  };

  return (
    <>
      {getButtonByType()}
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
