import { Anchor } from '@inflearn/ds-react';

import { IMAGE_RESIZING_WIDTH } from '../../../constants/size';
import type { BlockType } from '../../../context/ExternalHandlerContext';

export const MP4_REPLACEMENT_IMAGE_CLASSNAME = 'dropzone-preview__uploaded-content--mp4';

export type DropzonePreviewProps = {
  url: string;
  isLoading: boolean;
  endLoading: () => void;
  hyperLink: string;
  imageAlt: string;
  isMp4: boolean;
  blockType: BlockType | null;
};

export const DropzonePreview = ({
  url,
  isLoading,
  endLoading,
  hyperLink,
  imageAlt,
  isMp4,
}: DropzonePreviewProps) => {
  const isLinked = !!hyperLink;

  return (
    <figure className="dropzone-preview__figure">
      {isLinked ? (
        <Anchor
          href={hyperLink}
          target="_blank"
          rel="noreferrer"
          className="dropzone-preview__uploaded-anchor">
          <DropzoneImage
            isLoading={isLoading}
            url={url}
            endLoading={endLoading}
            imageAlt={imageAlt}
            isMp4={isMp4}
          />
        </Anchor>
      ) : (
        <div className="dropzone-preview__uploaded-anchor dropzone-preview__uploaded-anchor--no-link">
          <DropzoneImage
            isLoading={isLoading}
            url={url}
            endLoading={endLoading}
            imageAlt={imageAlt}
            isMp4={isMp4}
          />
        </div>
      )}
    </figure>
  );
};

type DropzoneImageProps = {
  isLoading: boolean;
  url: string;
  endLoading: () => void;
  imageAlt: string;
  isMp4: boolean;
};

const DropzoneImage = ({
  isLoading,
  url: _url,
  endLoading,
  imageAlt,
  isMp4,
}: DropzoneImageProps) => {
  const url = isMp4 ? _url.replace('.mp4', '') : _url;

  return (
    <DropzoneImageFormat
      isLoading={isLoading}
      url={url}
      imageAlt={imageAlt}
      endLoading={endLoading}
      isMp4={isMp4}
    />
  );
};

type DropzoneImageFormatType = {
  isLoading: boolean;
  url: string;
  imageAlt: string;
  endLoading: () => void;
  isMp4: boolean;
};

function DropzoneImageFormat({
  imageAlt,
  endLoading,
  isLoading,
  url,
  isMp4,
}: DropzoneImageFormatType) {
  return (
    <img
      className={`dropzone-preview__uploaded-content ${
        isMp4 ? MP4_REPLACEMENT_IMAGE_CLASSNAME : ''
      } ${isLoading ? 'dropzone-preview__uploaded-content--loading' : ''}`}
      src={`${url}?w=${IMAGE_RESIZING_WIDTH}`}
      alt={imageAlt}
      onLoad={endLoading}
    />
  );
}
