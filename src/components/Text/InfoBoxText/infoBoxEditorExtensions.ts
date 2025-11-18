import { InflearnEditorStarterKit } from '@inflearn/editor';

import { EDITOR_MAX_IMAGE_SIZE } from '../editorCommonOptions';
import type { SetExtensionsParams } from '../types';

export const infoBoxEditorExtensions = ({
  placeholder,
  showNotification,
  uploadImageFormData,
}: SetExtensionsParams) => [
  InflearnEditorStarterKit.configure({
    dropcursor: {
      width: 2,
    },
    image: {
      maxImageSize: EDITOR_MAX_IMAGE_SIZE,
      showNotification,
      uploadFormData: uploadImageFormData,
    },
    link: {
      openOnClick: false,
    },
    placeholder: {
      placeholder,
    },
  }),
];
