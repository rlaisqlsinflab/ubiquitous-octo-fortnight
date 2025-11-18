import { useNode } from '@craftjs/core';
import { ActionIcon, Icon } from '@inflearn/ds-react';
import { faCircleMinus } from '@inflearn/pro-regular-svg-icons';
import { isNil } from 'lodash-es';
import { useContext, useState } from 'react';

import { Dropzone } from './Dropzone/Dropzone';
import { DropzoneAlt } from './Dropzone/DropzoneAlt';
import { DropzoneHyperLink } from './Dropzone/DropzoneHyperLink';
import type { BlockType } from '../../context/ExternalHandlerContext';
import { ExternalHandlerContext } from '../../context/ExternalHandlerContext';
import { removeFileExtension } from '../../utils/removeFileExtension';
import { ActionMenu } from '../ActionMenu';
import { useDeleteNode } from '../Grid/useDeleteNode';
import { useReplaceNode } from '../Grid/useReplaceNode';
import { ColumnText } from '../Text/ColumnText';
import { Text } from '../Text/Text';

export type ImageTextProps = {
  content?: string;
  url?: string;
  hyperLink?: string;
  imageAlt?: string;
  column?: number;
};

export const IMAGE_TEXT_CLASSNAME = 'image-text';

type ControllerMode = 'close' | 'link' | 'alt';

const controllerModeLookup = {
  close: 'close',
  link: 'link',
  alt: 'alt',
} as const;

export const ImageText = ({
  content = '',
  url = '',
  hyperLink = '',
  imageAlt: propsImageAlt = '',
  column = 1,
}: ImageTextProps) => {
  const {
    id,
    actions: { setProp },
  } = useNode();
  const { replaceNode } = useReplaceNode();
  const { deleteNode } = useDeleteNode();

  const { onDeleteImageTextImage } = useContext(ExternalHandlerContext);

  const [controllerMode, setControllerMode] = useState<ControllerMode>(controllerModeLookup.close);

  const urlParts = url.split('/');
  const fileName = urlParts[urlParts.length - 1];
  const imageAlt = propsImageAlt || removeFileExtension(fileName);
  const isMp4 = fileName.endsWith('.mp4');

  const handleOpenHyperLinkInput = () => {
    setControllerMode(controllerModeLookup.link);
  };

  const handleOpenImageAltInput = () => {
    setControllerMode(controllerModeLookup.alt);
  };

  const handleCloseInput = () => {
    setControllerMode(controllerModeLookup.close);
  };

  const handleLinkImage = (link: string) => {
    setProp((prevProps: ImageTextProps) => (prevProps.hyperLink = link));
  };

  const handleUnLinkImage = () => {
    setProp((prevProps: ImageTextProps) => (prevProps.hyperLink = ''));
  };

  const handleSetImageAlt = (newAlt: string) => {
    setProp((prevProps: ImageTextProps) => (prevProps.imageAlt = newAlt));
  };

  const deleteImage = () => {
    setProp((prevProps: ImageTextProps) => (prevProps.url = ''));
    setProp((prevProps: ImageTextProps) => (prevProps.imageAlt = ''));
    setProp((prevProps: ImageTextProps) => (prevProps.hyperLink = ''));

    onDeleteImageTextImage?.({
      blockType: 'ImageText' as BlockType,
      imageUrl: url,
    });

    if (isNil(column)) {
      deleteNode(id);
    }

    if (column === 1) {
      replaceNode({ Component: Text, id });

      return;
    }

    replaceNode({ Component: ColumnText, id });
  };

  const actionButtons = url ? (
    <>
      <DropzoneAlt
        initialImageAlt={imageAlt}
        onSetImageAlt={handleSetImageAlt}
        onOpenImageAltInput={handleOpenImageAltInput}
        onCloseImageAltInput={handleCloseInput}
        opened={controllerMode === controllerModeLookup.alt}
      />
      <DropzoneHyperLink
        initialHyperLink={hyperLink}
        onSetImageHyperLink={handleLinkImage}
        onResetImageHyperLink={handleUnLinkImage}
        onOpenImageHyperLinkInput={handleOpenHyperLinkInput}
        onCloseImageHyperLinkInput={handleCloseInput}
        opened={controllerMode === controllerModeLookup.link}
      />
      <ActionIcon variant="subtle" size={28} onClick={deleteImage} title="이미지 삭제">
        <Icon icon={faCircleMinus} color="red.7" />
      </ActionIcon>
    </>
  ) : (
    <>
      <ActionIcon variant="subtle" size={28} onClick={deleteImage} title="이미지 삭제">
        <Icon icon={faCircleMinus} color="red.7" />
      </ActionIcon>
    </>
  );

  return (
    <ActionMenu actionButtons={actionButtons}>
      <div className={`image-text__container ${IMAGE_TEXT_CLASSNAME}`}>
        <Dropzone previewUrl={url} hyperLink={hyperLink} imageAlt={imageAlt} isMp4={isMp4} />
        {url && (
          <Text
            align="center"
            placeholder="캡션 작성"
            content={content}
            parentType="ImageText"
            withSlashCommands={false}
          />
        )}
      </div>
    </ActionMenu>
  );
};

ImageText.craft = {
  displayName: 'ImageText',
};
