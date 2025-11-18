import { COLOR_PALETTE } from '@inflearn/ds-react';
import type {
  ColorOptions,
  LinkOptions,
  StarterKitOptions,
  TextAlignOptions,
  TypoHeadingLevelOption,
} from '@inflearn/editor';
import { faH1, faH2, faH3, faH4, faH5, faText } from '@inflearn/pro-regular-svg-icons';

export const EDITOR_MAX_IMAGE_SIZE = 3;

export const HEADINGS = [
  {
    label: '본문',
    value: 0,
  },
  {
    label: '제목',
    value: 3,
  },
  {
    label: '부제목',
    value: 4,
  },
] as unknown as TypoHeadingLevelOption[];

export const WHITE_COLOR = 'white';

export const COLOR_CONTROL_PALETTE = {
  color: [
    COLOR_PALETTE.dark[7],
    COLOR_PALETTE.gray[6],
    WHITE_COLOR,
    COLOR_PALETTE.red[7],
    COLOR_PALETTE.orange[7],
    COLOR_PALETTE.grape[7],
    COLOR_PALETTE.violet[7],
    COLOR_PALETTE.blue[7],
    COLOR_PALETTE.infgreen[7],
    COLOR_PALETTE.yellow[7],
  ],
  background: [
    'inherit',
    COLOR_PALETTE.gray[0],
    COLOR_PALETTE.gray[2],
    COLOR_PALETTE.red[0],
    COLOR_PALETTE.orange[0],
    COLOR_PALETTE.grape[0],
    COLOR_PALETTE.violet[0],
    COLOR_PALETTE.blue[0],
    COLOR_PALETTE.infgreen[0],
    COLOR_PALETTE.yellow[0],
  ],
};

export const HEADINGS_OPTIONS = [
  {
    label: '본문',
    value: 0 as const,
    icon: faText,
  },
  {
    label: '제목1',
    value: 1 as const,
    icon: faH1,
  },

  {
    label: '제목2',
    value: 2 as const,
    icon: faH2,
  },

  {
    label: '제목3',
    value: 3 as const,
    icon: faH3,
  },
  {
    label: '제목4',
    value: 4 as const,
    icon: faH4,
  },
  {
    label: '제목5',
    value: 5 as const,
    icon: faH5,
  },
];
type ExtensionsDefaultOptions = {
  STARTER_KIT: Partial<StarterKitOptions>;
  LINK: Partial<LinkOptions>;
  TEXT_ALIGN: Partial<TextAlignOptions>;
  COLOR: Partial<ColorOptions>;
};

export const EXTENSIONS_DEFAULT_OPTIONS: ExtensionsDefaultOptions = {
  STARTER_KIT: {
    dropcursor: {
      width: 2,
    },
    blockquote: false,
    codeBlock: false,
    heading: {
      levels: [1, 2, 3, 4, 5],
    },
  },

  LINK: {
    openOnClick: false,
  },

  TEXT_ALIGN: {
    defaultAlignment: 'left',
    types: ['paragraph', 'heading'],
  },

  COLOR: {
    types: ['textStyle'],
  },
};
