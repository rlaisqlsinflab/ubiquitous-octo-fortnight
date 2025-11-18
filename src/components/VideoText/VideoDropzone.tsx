import { Box, COLOR_PALETTE, Icon, Popover, Stack, Text } from '@inflearn/ds-react';
import { faBan, faVideo } from '@inflearn/pro-regular-svg-icons';
import { faUpToLine } from '@inflearn/pro-solid-svg-icons';
import type { FileRejection, FileWithPath } from '@mantine/dropzone';
import { Dropzone } from '@mantine/dropzone';
import React, { useContext, useEffect, useRef, useState } from 'react';

import {
  MAX_SIZE_VIDEO,
  MAX_SIZE_VIDEO_GB,
  VALID_VIDEO_EXTENSIONS,
  VALID_VIDEO_EXTENSIONS_FOR_SHOWING,
} from './constants';
import type { EmbedType } from './type';
import { getEmbedType } from './utils/getEmbedType';
import { isValidVideoType } from './utils/isValidVideoType';
import { ExternalHandlerContext } from '../../context/ExternalHandlerContext';
import { useBlock } from '../../hooks/useBlock';
import { getBlockType } from '../../utils/getBlockType';
import { TextPopover } from '../TextPopover';

type VIDEO_MIME = 'video/mp4' | 'video/quicktime' | 'video/x-m4v' | 'video/x-msvideo';

const VIDEO_MIME_TYPE = ['video/mp4', 'video/quicktime', 'video/x-m4v', 'video/x-msvideo'];

export const DROP_ZONE_VIDEO_CLASSNAME = 'dropzone-video';

type VideoDropzoneProps = {
  onChangeEmbedLink?: (url: string, embedType: EmbedType | null) => void;
  onFileSelect?: (file: FileWithPath) => Promise<void>;
  startLoading?: () => void;
  isLoading?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
};

const invalidTypeErrorMessage = '지원하지 않는 확장자입니다.';
const invalidSizeErrorMessage = `파일크기는 최대 ${MAX_SIZE_VIDEO_GB}GB입니다.`;
const defaultErrorMessage = '지원하지 않는 형식입니다.';

export const VideoDropzone = ({
  onChangeEmbedLink,
  onFileSelect,
  startLoading,
  isLoading = false,
  inputRef,
}: VideoDropzoneProps) => {
  const { onVideoUploadSuccess } = useContext(ExternalHandlerContext);
  const { findBlockElement } = useBlock();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [popoverOpened, setPopoverOpened] = useState(false);

  const clickOutsideEventListener = useRef((event: MouseEvent) => {
    const $target = event.target as HTMLElement;

    if ($target.closest('.video-text__embed')) {
      return;
    }

    setPopoverOpened(false);
  });

  useEffect(() => {
    const eventListener = clickOutsideEventListener.current;
    document.addEventListener('click', eventListener, true);

    return () => {
      document.removeEventListener('click', eventListener, true);
    };
  }, []);

  function getFile(files: FileWithPath[]): FileWithPath;
  // eslint-disable-next-line no-redeclare
  function getFile(files: FileRejection[]): FileRejection;
  // eslint-disable-next-line no-redeclare
  function getFile(files: FileWithPath[] | FileRejection[]): FileWithPath | FileRejection {
    return files[0];
  }

  function checkValidType(fileType: string): fileType is VIDEO_MIME {
    return isValidVideoType(fileType, VALID_VIDEO_EXTENSIONS) || VIDEO_MIME_TYPE.includes(fileType);
  }

  function checkValidSize(fileSize: number) {
    return fileSize <= MAX_SIZE_VIDEO;
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
    startLoading?.();
    await onFileSelect?.(getFile(files));
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

  const handleClickEmbedVideo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPopoverOpened(true);
  };

  const handleSaveEmbedLink = (value: string) => {
    const embedType = getEmbedType(value);

    if (onChangeEmbedLink) {
      onChangeEmbedLink(value, embedType);
    }

    const blockElement = findBlockElement();
    const blockType = getBlockType(blockElement);

    if (blockElement) {
      onVideoUploadSuccess?.({
        blockType,
        elementType: 'VideoText',
        uploadType: '링크 임베드',
        uploadUrl: value,
      });
    }

    setPopoverOpened(false);
  };

  const hasError = !!errorMessage;

  const renderReject = () => (
    <Stack spacing={8}>
      <Icon className="dropzone-video__icon" size="2xl" icon={faBan} color="red.7" />
      <p className="dropzone-video__tip dropzone-video__tip--reject">
        {errorMessage || defaultErrorMessage}
      </p>
    </Stack>
  );

  const renderIdle = () => (
    <Stack spacing={8} align="center">
      <Icon className="dropzone-video__icon" size="2xl" icon={faVideo} color="gray.5" />
      <Stack className="dropzone-video__tip">
        <Text size="md" weight={500} color="gray.8">
          내용을 뒷받침할 영상을 삽입하거나{' '}
          <Popover
            styles={{
              dropdown: {
                padding: 0,
              },
            }}
            trapFocus
            shadow="sm"
            position="bottom"
            opened={popoverOpened}
            transitionProps={{ duration: 0 }}>
            <Popover.Target>
              <Box component="span">
                <Text
                  pos="relative"
                  color="blue.6"
                  component="span"
                  css={{
                    color: COLOR_PALETTE.blue[6],
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    '&:hover': {
                      color: COLOR_PALETTE.blue[7],
                    },
                  }}
                  onClick={handleClickEmbedVideo}>
                  링크를 첨부
                </Text>
              </Box>
            </Popover.Target>
            <Popover.Dropdown className="video-text__embed">
              <TextPopover
                props={{
                  onClick: (e: React.MouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                  },
                }}
                textInputProps={{ placeholder: '동영상 링크를 붙여넣어주세요.' }}
                onSave={handleSaveEmbedLink}
              />
            </Popover.Dropdown>
          </Popover>
          해 주세요
        </Text>
      </Stack>
    </Stack>
  );

  return (
    <Dropzone
      className={`dropzone-video__root ${DROP_ZONE_VIDEO_CLASSNAME} ${
        hasError ? 'dropzone-video__root--error' : ''
      }`}
      loading={isLoading}
      activateOnClick={false}
      styles={{ inner: { pointerEvents: 'all', width: '100%' } }}
      onDrop={handleDrop}
      onReject={handleReject}
      onDragEnter={clearError}
      maxFiles={1}
      multiple={false}
      padding={0}
      radius={16}
      accept={VIDEO_MIME_TYPE}
      css={{
        border: `2px dashed ${COLOR_PALETTE.gray[4]}`,
      }}>
      <Stack
        className="dropzone-video__content"
        align="center"
        onClick={() => inputRef?.current?.click()}>
        <Dropzone.Reject>{renderReject()}</Dropzone.Reject>
        <Dropzone.Accept>
          <Stack spacing={8} align="center">
            <Icon
              className="dropzone-video__icon"
              size="2xl"
              icon={faUpToLine}
              color="infgreen.6"
            />
            <div className="dropzone-video__tip">
              <Text size="md" weight={500} color="infgreen.6">
                내용을 뒷받침할 영상을 삽입하거나 링크를 첨부해 주세요
              </Text>
            </div>
          </Stack>
        </Dropzone.Accept>
        <Dropzone.Idle>{hasError ? renderReject() : renderIdle()}</Dropzone.Idle>
        <p className="dropzone-video__rule">
          {VALID_VIDEO_EXTENSIONS_FOR_SHOWING.join(', ')}, 최대 {MAX_SIZE_VIDEO_GB}GB
        </p>
      </Stack>
    </Dropzone>
  );
};
