import type { ShowNotification } from '@inflearn/ds-react';
import type { AnyExtension, UploadFormData } from '@inflearn/editor';

export type SetExtensionsParams = {
  placeholder: string;
  showNotification: ShowNotification;
  uploadImageFormData: UploadFormData;
};

export type SetExtensions = (params: SetExtensionsParams) => AnyExtension[];

export type TextCommonProps = {
  focusWhenCreated?: boolean;
  parentType?: string;
};
