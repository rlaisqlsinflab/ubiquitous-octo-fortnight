import { COLOR_PALETTE } from '@inflearn/ds-react';

import { WHITE_COLOR } from '../Text/editorCommonOptions';

export interface ColorOption {
  value: string;
  name: string;
  icon: string;
}
const faCircleInfoSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"/></svg>';
const faCircleCheckSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM404.4 276.7L324.4 404.7C320.2 411.4 313 415.6 305.1 416C297.2 416.4 289.6 412.8 284.9 406.4L236.9 342.4C228.9 331.8 231.1 316.8 241.7 308.8C252.3 300.8 267.3 303 275.3 313.6L302.3 349.6L363.7 251.3C370.7 240.1 385.5 236.6 396.8 243.7C408.1 250.8 411.5 265.5 404.4 276.8z"/></svg>';
const faTriangleExclamation =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.9 536.6 69.6 524.5C62.3 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 232C306.7 232 296 242.7 296 256L296 368C296 381.3 306.7 392 320 392C333.3 392 344 381.3 344 368L344 256C344 242.7 333.3 232 320 232zM346.7 448C347.3 438.1 342.4 428.7 333.9 423.5C325.4 418.4 314.7 418.4 306.2 423.5C297.7 428.7 292.8 438.1 293.4 448C292.8 457.9 297.7 467.3 306.2 472.5C314.7 477.6 325.4 477.6 333.9 472.5C342.4 467.3 347.3 457.9 346.7 448z"/></svg>';
export const COLORS = {
  BLUE: 'blue',
  WHITE: 'white',
  GRAY: 'gray',
  INFGREEN: 'infgreen',
  YELLOW: 'yellow',
  DEEP_BLUE: 'deep-blue',
  BLACK: 'black',
};
export const COLOR_LOOKUP = {
  [COLORS.BLUE]: {
    value: COLOR_PALETTE.blue[0],
    icon: faCircleInfoSvg,
    iconColor: COLOR_PALETTE.blue[7],
    textColor: COLOR_PALETTE.gray[9],
  },
  [COLORS.WHITE]: {
    value: WHITE_COLOR,
    icon: faCircleInfoSvg,
    iconColor: COLOR_PALETTE.gray[9],
    textColor: COLOR_PALETTE.gray[9],
  },
  [COLORS.GRAY]: {
    value: COLOR_PALETTE.gray[0],
    icon: faCircleInfoSvg,
    iconColor: COLOR_PALETTE.gray[9],
    textColor: COLOR_PALETTE.gray[9],
  },
  [COLORS.INFGREEN]: {
    value: COLOR_PALETTE.infgreen[0],
    icon: faCircleCheckSvg,
    iconColor: COLOR_PALETTE.infgreen[7],
    textColor: COLOR_PALETTE.gray[9],
  },
  [COLORS.YELLOW]: {
    value: COLOR_PALETTE.yellow[0],
    icon: faTriangleExclamation,
    iconColor: COLOR_PALETTE.yellow[7],
    textColor: COLOR_PALETTE.gray[9],
  },
  [COLORS.DEEP_BLUE]: {
    value: COLOR_PALETTE.blue[6],
    icon: faCircleInfoSvg,
    iconColor: WHITE_COLOR,
    textColor: WHITE_COLOR,
  },
  [COLORS.BLACK]: {
    value: COLOR_PALETTE.dark[9],
    icon: faCircleInfoSvg,
    iconColor: WHITE_COLOR,
    textColor: WHITE_COLOR,
  },
};
export const COLOR_OPTIONS: ColorOption[] = Object.entries(COLOR_LOOKUP).map(([name, value]) => ({
  ...value,
  name: name,
}));
