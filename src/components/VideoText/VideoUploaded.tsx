import { Box, COLOR_PALETTE, Icon, RingProgress, type Sx } from '@inflearn/ds-react';
import { faPlay } from '@inflearn/pro-solid-svg-icons';
import { useEffect, useState } from 'react';

import { RatioBox } from './RatioBox';
import { Z_INDEX } from '../../styles/zIndex';

type VideoUploadedProps = {
  previewUrl: string;
  uploadedVideoUrl: string | null;
  isUploaded?: boolean;
  isUploading?: boolean;
  uploadProgress: number;
};

export const VIDEO_TEXT_UPLOADED_COVER_CLASS_NAME = 'video-text__uploaded-cover';

export const VideoUploaded = ({
  previewUrl,
  uploadedVideoUrl,
  isUploaded,
  isUploading,
  uploadProgress,
}: VideoUploadedProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(false);
  }, [uploadedVideoUrl]);

  return (
    <RatioBox>
      {isLoaded ? null : <video src={previewUrl} className="video-text__video-uploaded"></video>}
      {uploadedVideoUrl ? (
        <video
          src={uploadedVideoUrl || undefined}
          className={`video-text__video-uploaded ${
            isLoaded ? '' : 'video-text__video-uploaded--hidden'
          }`}
          onLoadedData={() => {
            setIsLoaded(true);
          }}></video>
      ) : null}
      {isUploaded ? (
        <Box className={VIDEO_TEXT_UPLOADED_COVER_CLASS_NAME} sx={styleVideoCover}>
          <div className="video-text__uploaded-icon-circle">
            <Icon icon={faPlay} size="xl" />
          </div>
        </Box>
      ) : null}
      {isUploading ? (
        <Box
          className="video-text__progress-cover"
          sx={[styleVideoCover, styleVideoCoverBackground]}>
          <RingProgress
            sections={[{ value: uploadProgress, color: COLOR_PALETTE.infgreen[6] }]}
            label={<p className="video-text__progress">{uploadProgress}%</p>}
          />
        </Box>
      ) : null}
    </RatioBox>
  );
};

export const styleVideoCoverBackground: Sx = {
  background: 'rgba(0, 0, 0, 0.7)',
};
export const styleVideoCover: Sx = {
  zIndex: Z_INDEX.VIDEO_TEXT_COVER,
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
};
