import { useState } from 'react';

import type { VideoTextProps } from './type';

export const useVideoLink = ({
  initialEmbedLink,
  initialUploadedVideoUrl,
  setProp,
}: {
  initialEmbedLink?: string;
  initialUploadedVideoUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setProp: (cb: any, throttleRate?: number | undefined) => void;
}) => {
  const [embedLink, setEmbedLinkAction] = useState<string | null>(initialEmbedLink || null);
  const [previewLocalVideoUrl, setPreviewLocalVideoUrl] = useState<string | null>(
    initialUploadedVideoUrl || null // 최초 로딩시 업로드된 비디오가 있으면 미리보기로 보여줍니다.
  );
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(
    initialUploadedVideoUrl || null
  );

  /** 임베드 링크를 수정합니다. */
  const setEmbedLink = (url: string | null) => {
    setEmbedLinkAction(url);
    setUploadedVideoUrl(null);
    setProp((props: VideoTextProps) => {
      props.embedLink = url || undefined;
      props.uploadedVideoUrl = undefined;
    });
  };

  /** 비디오 업로드 미리보기를 수정합니다. (state) */
  const setPreviewUploadVideoUrl = (url: string | null) => {
    setPreviewLocalVideoUrl(url);
  };

  /** 비디오 업로드 URL 데이터를 수정합니다. (craft.js prop) */
  const setUploadVideoUrl = (url: string | null) => {
    setUploadedVideoUrl(url);
    setProp((props: VideoTextProps) => {
      props.embedLink = undefined;
      props.uploadedVideoUrl = url || undefined;
    });
  };

  /** 비디오 링크를 초기화 합니다. */
  const makeEmptyVideo = () => {
    setEmbedLinkAction(null);
    setPreviewLocalVideoUrl(null);
    setUploadedVideoUrl(null);

    setProp((props: VideoTextProps) => {
      props.embedLink = undefined;
      props.uploadedVideoUrl = undefined;
    });
  };

  return {
    embedLink,
    previewLocalVideoUrl,
    uploadedVideoUrl,

    setEmbedLink,
    setPreviewUploadVideoUrl,
    setUploadVideoUrl,
    makeEmptyVideo,
  };
};
