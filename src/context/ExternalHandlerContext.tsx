import { createContext } from 'react';

export type BlockButtonEventType = 'add' | 'delete' | 'up' | 'down';

export const BLOCK_TYPE = {
  ONE_COLUMN_GRID: 'OneColumnGrid',
  ONE_COLUMN_TEXT: 'OneColumnText',
  ONE_COLUMN_INFO_BOX: 'OneColumnInfoBox',
  ONE_COLUMN_VIDEO_TEXT: 'OneColumnVideoText',
  ONE_COLUMN_IMAGE_TEXT: 'OneColumnImageText',
  TWO_COLUMN_GRID: 'TwoColumnGrid',
  ONE_TO_TWO_COLUMN_GRID: 'OneToTwoColumnGrid',
  TWO_TO_ONE_COLUMN_GRID: 'TwoToOneColumnGrid',
  THREE_COLUMN_GRID: 'ThreeColumnGrid',
  MARGIN: 'Margin',
  SEPARATOR: 'Separator',
} as const;

export const ELEMENT_TYPE = {
  TEXT: 'Text',
  IMAGE_TEXT: 'ImageText',
  VIDEO_TEXT: 'VideoText',
  INFO_BOX: 'InfoBox',
} as const;

export const BLOCK_TYPES = Object.values(BLOCK_TYPE);
export const ELEMENT_TYPES = Object.values(ELEMENT_TYPE);

export type BlockType = (typeof BLOCK_TYPE)[keyof typeof BLOCK_TYPE];
export type ElementType = (typeof ELEMENT_TYPE)[keyof typeof ELEMENT_TYPE];
type ActionType = 'add' | 'delete';
type UploadType = '파일 업로드' | '링크 임베드';

export type BlockButtonsType = { eventType: BlockButtonEventType; blockType?: BlockType };
export type ElementButtonsType = {
  elementType: ElementType | null;
  blockType: BlockType | null;
  elementMenuType: ActionType;
};
export type VideoEventCommonPropertyType = {
  blockType: BlockType | null;
  elementType: ElementType;
  uploadType: UploadType;
  uploadUrl: string | null;
};

export type ImageTextUrlCommonPropertyType = {
  blockType: BlockType | null;
  linkUrl: string;
};

export type ImageTextImageCommonPropertyType = {
  blockType: BlockType | null;
  imageUrl: string | null;
};

export type EditorToolbarButtonsType = {
  elementType: ElementType | null;
  blockType: BlockType | null;
  controlType: string;
};

export type EditorToolbarColorButtonsType = {
  elementType: ElementType;
  blockType: string | null;
  controlType: string;
};

export type ExternalHandlerType = {
  onClickBlockButtons?: ({ eventType, blockType }: BlockButtonsType) => void;
  onClickElementButtons?: ({ elementType, blockType, elementMenuType }: ElementButtonsType) => void;
  onVideoUploadSuccess?: (type: VideoEventCommonPropertyType) => void;
  onClickDeleteVideoButton?: (type: VideoEventCommonPropertyType) => void;
  onDeleteImageTextUrl?: (type: ImageTextUrlCommonPropertyType) => void;
  onAddImageTextUrl?: (type: ImageTextUrlCommonPropertyType) => void;
  onDeleteImageTextImage?: (type: ImageTextImageCommonPropertyType) => void;
  onAddImageTextImage?: (type: ImageTextImageCommonPropertyType) => void;
  onClickEditorToolbarButtons?: ({
    elementType,
    blockType,
    controlType,
  }: EditorToolbarButtonsType) => void;
};

const initialValue: ExternalHandlerType = {
  onClickBlockButtons: () => {
    //
  },
  onClickElementButtons: () => {
    //
  },
  onClickEditorToolbarButtons: () => {
    //
  },
  onVideoUploadSuccess: () => {
    //
  },
  onClickDeleteVideoButton: () => {
    //
  },
  onDeleteImageTextUrl: () => {
    //
  },
  onAddImageTextUrl: () => {
    //
  },
  onDeleteImageTextImage: () => {
    //
  },
};

export const ExternalHandlerContext = createContext(initialValue);
