import { useNode } from '@craftjs/core';
import { ActionIcon, Box, Icon, useShowNotification } from '@inflearn/ds-react';
import { faCircleMinus } from '@inflearn/pro-regular-svg-icons';
import { faVideo } from '@inflearn/pro-solid-svg-icons';
import { isNil } from 'lodash-es';
import React, { useContext, useRef, useState } from 'react';

import {
  VALID_VIDEO_EXTENSIONS,
  VIDEO_TEXT_CLASS_NAME,
  VIDEO_TEXT_INPUT_CLASS_NAME,
  VIDEO_TEXT_PLACE_HOLDER_CLASSNAME,
} from './constants';
import { VideoEmbed } from './Embed';
import type { UploadResponse, VideoTextProps } from './type';
import { useVideoLink } from './useVideoLink';
import { joinExtensions } from './utils/joinExtensions';
import { VideoDropzone } from './VideoDropzone';
import { VideoTextContext } from './VideoTextContext';
import { VideoUploaded } from './VideoUploaded';
import { EnvironmentValuesContext } from '../../context/EnvironmentValuesContext';
import { ExternalHandlerContext } from '../../context/ExternalHandlerContext';
import { useBlock } from '../../hooks/useBlock';
import { fireUploadEndEvent, fireUploadStartEvent } from '../../utils/fireEvent';
import { getBlockType } from '../../utils/getBlockType';
import { requestUpload } from '../../utils/requestUpload';
import { ActionMenu } from '../ActionMenu';
import { useDeleteNode } from '../Grid/useDeleteNode';
import { useReplaceNode } from '../Grid/useReplaceNode';
import { ColumnText } from '../Text/ColumnText';
import { Text } from '../Text/Text';

const validVideoExtensions = joinExtensions(VALID_VIDEO_EXTENSIONS);

export function VideoText({
  content,
  embedLink: embedLinkProp,
  uploadedVideoUrl: uploadedVideoUrlProp,
  column = 1,
}: VideoTextProps) {
  const { onVideoUploadSuccess, onClickDeleteVideoButton } = useContext(ExternalHandlerContext);
  const { videoUploadAPIUrl } = useContext(EnvironmentValuesContext);

  const videoInputRef = useRef<HTMLInputElement>(null);

  const { findBlockElement } = useBlock();
  const blockElement = findBlockElement();
  const blockType = getBlockType(blockElement);

  const { showNotification } = useShowNotification();
  const {
    id,
    actions: { setProp },
  } = useNode();

  const { replaceNode } = useReplaceNode();
  const { deleteNode } = useDeleteNode();

  const {
    embedLink,
    previewLocalVideoUrl,
    uploadedVideoUrl,
    setEmbedLink,
    setPreviewUploadVideoUrl,
    setUploadVideoUrl,
    makeEmptyVideo,
  } = useVideoLink({
    initialEmbedLink: embedLinkProp,
    initialUploadedVideoUrl: uploadedVideoUrlProp,
    setProp,
  });

  const showVideo = embedLink || previewLocalVideoUrl || uploadedVideoUrl;

  const [isUploaded, setIsUploaded] = useState(!!uploadedVideoUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgressAction] = useState(0);

  const setUploadProgress = (progress: number) => {
    setUploadProgressAction(Math.floor(progress));
  };

  const makeEmptyVideoInput = () => {
    if (videoInputRef.current?.value) {
      videoInputRef.current.value = '';
    }
  };

  const handleClickRemoveVideo = () => {
    makeEmptyVideoInput();
    makeEmptyVideo();
    setIsUploaded(false);

    // 믹스패널
    const _videoUrl = embedLink || uploadedVideoUrl;
    onClickDeleteVideoButton?.({
      blockType: blockElement?.displayName || null,
      elementType: 'VideoText',
      uploadType: embedLink ? '링크 임베드' : '파일 업로드',
      uploadUrl: _videoUrl || null,
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

  const handleClickUploadVideo = () => {
    videoInputRef.current?.click();
  };

  const handleUploadVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      makeEmptyVideoInput();

      return;
    }

    processVideoFile(file);
  };

  const processVideoFile = (file: File) => {
    // File validation is now handled by the Dropzone component
    // Just proceed with upload
    const url = URL.createObjectURL(file);
    setPreviewUploadVideoUrl(url);
    fireUploadStartEvent(file);

    requestUpload<UploadResponse>({
      method: 'POST',
      url: videoUploadAPIUrl,
      file,
      onProgress: (progress) => {
        setIsUploaded(false);
        setIsUploading(true);
        setUploadProgress(progress * 100);
      },
    }).then((response) => {
      const uploadedUrl = response.data?.data?.url;

      setIsUploaded(true);
      setIsUploading(false);
      setUploadVideoUrl(uploadedUrl || null);

      fireUploadEndEvent();

      // 믹스패널
      onVideoUploadSuccess?.({
        blockType,
        elementType: 'VideoText',
        uploadType: '파일 업로드',
        uploadUrl: uploadedUrl,
      });
    });
  };

  return (
    <ActionMenu
      actionButtons={
        <ActionIcon variant="subtle" size={28} title="동영상 삭제" onClick={handleClickRemoveVideo}>
          <Icon icon={faCircleMinus} color="red.7" />
        </ActionIcon>
      }>
      <VideoTextContext.Provider value={{ handleClickRemoveVideo, handleClickUploadVideo }}>
        <div className={VIDEO_TEXT_CLASS_NAME}>
          <input
            aria-label="비디오 업로드"
            ref={videoInputRef}
            type="file"
            accept={validVideoExtensions}
            className={VIDEO_TEXT_INPUT_CLASS_NAME}
            onChange={handleUploadVideo}
          />
          <div className="video-text__video-area-wrapper">
            <Box className={VIDEO_TEXT_PLACE_HOLDER_CLASSNAME}>
              <Icon
                icon={faVideo}
                color="gray"
                size="2xl"
                style={{ width: '32px', height: '32px' }}
              />
            </Box>
            {embedLink ? <VideoEmbed url={embedLink} /> : null}
            {previewLocalVideoUrl ? (
              <VideoUploaded
                previewUrl={previewLocalVideoUrl}
                uploadedVideoUrl={uploadedVideoUrl}
                isUploaded={isUploaded}
                uploadProgress={uploadProgress}
                isUploading={isUploading}
              />
            ) : null}
            {showVideo ? null : (
              <VideoDropzone
                inputRef={videoInputRef}
                onFileSelect={async (file) => {
                  processVideoFile(file as File);
                }}
                startLoading={() => setIsUploading(true)}
                isLoading={isUploading}
                onChangeEmbedLink={(url, embedType) => {
                  if (embedType === null) {
                    showNotification({
                      title: 'YouTube 혹은 Vimeo 링크를 입력해 주세요.',
                      type: 'error',
                    });

                    return;
                  }

                  setEmbedLink(url);
                }}
              />
            )}
          </div>
          {showVideo && (
            <Text
              align="center"
              withSlashCommands={false}
              placeholder="캡션 작성"
              content={content}
              parentType="VideoText"
            />
          )}
        </div>
      </VideoTextContext.Provider>
    </ActionMenu>
  );
}

VideoText.craft = {
  displayName: 'VideoText',
};
