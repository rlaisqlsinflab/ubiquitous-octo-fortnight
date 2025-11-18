import { GB } from '../../constants/size';

export const MAX_SIZE_VIDEO_GB = 5;

export const MAX_SIZE_VIDEO = MAX_SIZE_VIDEO_GB * GB;

export const VALID_VIDEO_EXTENSIONS_FOR_SHOWING = ['mp4', 'm4v', 'mov', 'mkv'];

export const VALID_VIDEO_EXTENSIONS = [...VALID_VIDEO_EXTENSIONS_FOR_SHOWING, 'quicktime'];

export const VIDEO_TEXT_INPUT_CLASS_NAME = 'video-text__input-video';
export const VIDEO_TEXT_CLASS_NAME = 'video-text';
export const VIDEO_TEXT_PLACE_HOLDER_CLASSNAME = 'video-text__placeholder';
export const VIDEO_TEXT_PLACE_HOLDER_VIEWMODE_CLASSNAME = 'video-text__placeholder--viewmode';
