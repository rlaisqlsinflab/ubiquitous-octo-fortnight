import { useNode } from '@craftjs/core';
import { Box, Icon } from '@inflearn/ds-react';
import { faImage } from '@inflearn/pro-solid-svg-icons';
import type { FileWithPath } from '@mantine/dropzone';
import { useContext, useState } from 'react';

import { DropzoneArea } from './DropzoneArea';
import { DropzonePreview } from './DropzonePreview';
import { EnvironmentValuesContext } from '../../../context/EnvironmentValuesContext';
import { ExternalHandlerContext } from '../../../context/ExternalHandlerContext';
import { useBlock } from '../../../hooks/useBlock';
import { fireUploadEndEvent, fireUploadStartEvent } from '../../../utils/fireEvent';
import { getBlockType } from '../../../utils/getBlockType';
import { removeFileExtension } from '../../../utils/removeFileExtension';
import useUploadImage from '../../../utils/uploadImage';
import { ImageUploadErrorContext } from '../../Modals/ImageUploadErrorModal';
import type { ImageTextProps } from '../ImageText';

type DropzoneProps = {
  previewUrl: string;
  hyperLink: string;
  imageAlt: string;
  isMp4: boolean;
};

export const IMAGE_TEXT_PLACE_HOLDER_CLASSNAME = 'image-text__placeholder';
export const IMAGE_TEXT_PLACE_HOLDER_VIEWMODE_CLASSNAME = 'image-text__placeholder--viewmode';

export const Dropzone = ({ previewUrl, hyperLink, imageAlt, isMp4 }: DropzoneProps) => {
  const { onAddImageTextImage } = useContext(ExternalHandlerContext);
  const { imageTextImageUploader } = useContext(EnvironmentValuesContext);
  const { openModal } = useContext(ImageUploadErrorContext);

  const { findBlockElement } = useBlock();
  const {
    actions: { setProp },
  } = useNode();
  const { uploadImage } = useUploadImage({
    uploadImageAPI: imageTextImageUploader,
    onError: () => {
      openModal();
      endLoading();
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const blockElement = findBlockElement();
  const blockType = getBlockType(blockElement);
  const emptyPreviewUrl = '';

  const setPreviewUrl = (url?: string) => {
    const _url = url ? url : emptyPreviewUrl;
    setProp((prevProps: ImageTextProps) => (prevProps.url = _url));
  };

  const setDefaultAltText = (altText: string) => {
    setProp((prevProps: ImageTextProps) => (prevProps.imageAlt = altText));
  };

  const handleUploadImage = async (file: FileWithPath) => {
    const formData = new FormData();
    formData.append('file', file);

    fireUploadStartEvent(file);

    try {
      const url = await uploadImage({ formData });
      fireUploadEndEvent();

      setPreviewUrl(url);

      const defaultAltText = removeFileExtension(file.name);
      setDefaultAltText(defaultAltText);

      // 믹스패널
      onAddImageTextImage?.({
        blockType: blockType,
        imageUrl: url ?? null,
      });
    } catch (error) {
      fireUploadEndEvent();
      throw error;
    }
  };

  const hasPreviewUrl = !!previewUrl;

  const startLoading = () => {
    setIsLoading(true);
  };

  const endLoading = () => {
    setIsLoading(false);
  };

  // !hasPreviewUrl && !isLoading => 아직 드롭하지 않음 | 로딩 (X) 드롭존(O) 이미지(X)
  // !hasPreviewUrl && isLoading => url 요청한 상황 | 로딩 (O) 드롭존(O) 이미지(X)
  // hasPreviewUrl && isLoading => url 도착 & 이미지 로드중 | 로딩 (O) 드롭존(O) 이미지(X)
  // hasPreviewUrl && !isLoading => 이미지 로드 완료 | 로딩 (X) 드롭존(X) 이미지(O)
  const isDropzoneAreaVisible = (!hasPreviewUrl && !isLoading) || isLoading;

  const isDropzonePreviewVisible = hasPreviewUrl;

  return (
    <div className="dropzone__wrapper">
      <Box className={IMAGE_TEXT_PLACE_HOLDER_CLASSNAME}>
        <Icon icon={faImage} color="gray" size="2xl" style={{ width: '32px', height: '32px' }} />
      </Box>
      {isDropzoneAreaVisible && (
        <DropzoneArea
          uploadImage={handleUploadImage}
          startLoading={startLoading}
          isLoading={isLoading}
        />
      )}
      {isDropzonePreviewVisible && (
        <DropzonePreview
          isMp4={isMp4}
          url={previewUrl}
          endLoading={endLoading}
          isLoading={isLoading}
          hyperLink={hyperLink}
          imageAlt={imageAlt}
          blockType={blockType}
        />
      )}
    </div>
  );
};
