export enum VideoType {
  EMBED = 'embed',
  UPLOAD = 'upload',
}

export enum EmbedType {
  YOUTUBE = 'youtube',
  VIMEO = 'vimeo',
}

export type UploadResponse = {
  statusCode: string;
  message: string;
  data: {
    url: string;
  };
};

export type VideoTextProps = {
  content?: string;
  embedLink?: string;
  uploadedVideoUrl?: string;
  column?: number;
};
