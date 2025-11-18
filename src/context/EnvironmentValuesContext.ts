import type { UploadFormData } from '@inflearn/editor';
import { createContext } from 'react';

type VideoUploadAPIUrl = string;
export type ImageUploader = UploadFormData;

export type EnvironmentValues = {
  videoUploadAPIUrl: VideoUploadAPIUrl;
  imageTextImageUploader: ImageUploader;
  editorImageUploader: ImageUploader;
  payWallInfo?: {
    price?: number;
    duration?: number;
    durationType?: 'INFINITY' | 'LIMITED';
    priceType?: 'FREE' | 'PAID';
    attachmentFile?: {
      attachmentFileId?: number;
      name?: string;
      size?: number;
      assetUrl?: string;
    };
  };
};

export const EnvironmentValuesContext = createContext<EnvironmentValues>({
  videoUploadAPIUrl: '',
  imageTextImageUploader: () => Promise.resolve({ url: '' }),
  editorImageUploader: () => Promise.resolve({ url: '' }),
  payWallInfo: undefined,
});
