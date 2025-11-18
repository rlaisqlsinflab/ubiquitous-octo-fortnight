import { COLOR_PALETTE, Icon, Stack } from '@inflearn/ds-react';
import { faBan, faImage } from '@inflearn/pro-regular-svg-icons';
import { faUpToLine } from '@inflearn/pro-solid-svg-icons';
import type { FileRejection, FileWithPath } from '@mantine/dropzone';
import { Dropzone } from '@mantine/dropzone';
import { useState } from 'react';

import { IMAGE_MAX_SIZE, QUANTITY_MB_LIMIT } from './imageSize';
import { IMAGE_RESIZING_WIDTH } from '../../../constants/size';

type IMAGE_MIME =
  | 'image/png'
  | 'image/gif'
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/webp'
  | 'image/bmp'
  | 'image/x-icon'
  | 'image/vnd.microsoft.icon';

const IMAGE_MIME_TYPE = [
  'image/png',
  'image/gif',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/bmp',
  'image/x-icon',
  'image/vnd.microsoft.icon',
  'image/tiff',
];

export const DROP_ZONE_AREA_CLASSNAME = 'dropzone-area';

type DropzoneAreaProps = {
  uploadImage: (file: FileWithPath) => Promise<void>;
  startLoading: () => void;
  isLoading: boolean;
};

const invalidTypeErrorMessage = '지원하지 않는 확장자입니다.';
const invalidSizeErrorMessage = `파일크기는 최대 ${QUANTITY_MB_LIMIT}MB입니다.`;
const defaultErrorMessage = '지원하지 않는 형식입니다.';

export const DropzoneArea = ({ uploadImage, startLoading, isLoading }: DropzoneAreaProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  function getFile(files: FileWithPath[]): FileWithPath;
  // eslint-disable-next-line no-redeclare
  function getFile(files: FileRejection[]): FileRejection;
  // eslint-disable-next-line no-redeclare
  function getFile(files: FileWithPath[] | FileRejection[]): FileWithPath | FileRejection {
    return files[0];
  }

  function checkValidType(fileType: string): fileType is IMAGE_MIME {
    return IMAGE_MIME_TYPE.includes(fileType);
  }

  function checkValidSize(fileSize: number) {
    return fileSize <= IMAGE_MAX_SIZE;
  }

  async function handleDrop(files: FileWithPath[]) {
    const { type, size } = getFile(files);

    const isValidType = checkValidType(type);
    const isValidSize = checkValidSize(size);

    if (!isValidType) {
      setErrorMessage(invalidTypeErrorMessage);

      return;
    }

    if (!isValidSize) {
      setErrorMessage(invalidSizeErrorMessage);

      return;
    }

    setErrorMessage('');
    startLoading();
    await uploadImage(getFile(files));
  }

  function handleReject(files: FileRejection[]) {
    if (!errorMessage && files.length > 0) {
      const file = files[0].file;
      const isValidType = checkValidType(file.type);
      const isValidSize = checkValidSize(file.size);

      if (!isValidType) {
        setErrorMessage(invalidTypeErrorMessage);

        return;
      }

      if (!isValidSize) {
        setErrorMessage(invalidSizeErrorMessage);

        return;
      }

      setErrorMessage(defaultErrorMessage);
    }
  }

  function clearError() {
    setErrorMessage('');
  }

  const hasError = !!errorMessage;

  const renderReject = () => (
    <Stack spacing={8}>
      <Icon className="dropzone-area__icon" size="2xl" icon={faBan} color="red.7" />
      <p className="dropzone-area__tip dropzone-area__tip--reject">
        {errorMessage || defaultErrorMessage}
      </p>
    </Stack>
  );

  const renderIdle = () => (
    <Stack spacing={8}>
      <Icon className="dropzone-area__icon" size="2xl" icon={faImage} color="gray.5" />
      <p className="dropzone-area__tip">내용을 뒷받침할 이미지를 넣어주세요</p>
    </Stack>
  );

  return (
    <Dropzone
      className={`dropzone-area__root ${DROP_ZONE_AREA_CLASSNAME} ${
        hasError ? 'dropzone-area__root--error' : ''
      }`}
      loading={isLoading}
      onDrop={handleDrop}
      onReject={handleReject}
      onDragEnter={clearError}
      maxFiles={1}
      radius={16}
      multiple={false}
      accept={IMAGE_MIME_TYPE}
      css={{
        border: `2px dashed ${COLOR_PALETTE.gray[4]}`,
      }}>
      <Stack className="dropzone-area__content">
        <Dropzone.Reject>{renderReject()}</Dropzone.Reject>
        <Dropzone.Accept>
          <Stack spacing={8}>
            <Icon className="dropzone-area__icon" size="2xl" icon={faUpToLine} color="infgreen.6" />
            <p className="dropzone-area__tip">내용을 뒷받침할 이미지를 넣어주세요</p>
          </Stack>
        </Dropzone.Accept>
        <Dropzone.Idle>{hasError ? renderReject() : renderIdle()}</Dropzone.Idle>
        <p className="dropzone-area__rule">
          jpg, png, webp, gif
          <br />
          권장 너비 {IMAGE_RESIZING_WIDTH}px 및 최대 {QUANTITY_MB_LIMIT}MB
        </p>
      </Stack>
    </Dropzone>
  );
};
