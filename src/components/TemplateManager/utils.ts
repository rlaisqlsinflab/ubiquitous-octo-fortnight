import type { HoverCardProps } from '@mantine/core';

import { HEADER_HEIGHT, PREVIEW_GAP, PREVIEW_WIDTH } from './styleFixtures';

// TODO: 서버 데이터와 연동할 방법 찾아야 함
export const INFLAB_TEMPLATE_TITLES = ['기본', '심플', '예제 강조', '빈 페이지'] as const;

export type InflabTemplateTitles = (typeof INFLAB_TEMPLATE_TITLES)[number];

export const EMPTY_CONTENT_HTML_BODY = `<div><div class="grid-wrapper"><div class="action-menu-wrapper action-menu-wrapper--root action-menu-wrapper--view-mode"><div class="one-column-grid"><div><div class="box__children-wrapper"></div></div></div></div></div></div>`;

export const EMPTY_CONTENT_JSON_BODY = {
  ROOT: {
    type: 'div',
    isCanvas: true,
    props: {},
    displayName: 'div',
    custom: {},
    hidden: false,
    nodes: ['bKPWoj68DQ'],
    linkedNodes: {},
  },
  bKPWoj68DQ: {
    type: {
      resolvedName: 'OneColumnText',
    },
    isCanvas: false,
    props: {
      scrollWhenCreated: false,
    },
    displayName: 'OneColumnText',
    custom: {},
    parent: 'ROOT',
    hidden: false,
    nodes: [],
    linkedNodes: {
      'one-column-grid': 'AG-752YCk5',
    },
  },
  'AG-752YCk5': {
    type: 'div',
    isCanvas: false,
    props: {
      className: 'one-column-grid',
    },
    displayName: 'div',
    custom: {},
    parent: 'bKPWoj68DQ',
    hidden: false,
    nodes: ['QHUae7v0DA'],
    linkedNodes: {},
  },
  QHUae7v0DA: {
    type: {
      resolvedName: 'Box',
    },
    isCanvas: false,
    props: {},
    displayName: 'Box',
    custom: {},
    parent: 'AG-752YCk5',
    hidden: false,
    nodes: [],
    linkedNodes: {
      box: 'jT86rGYwY_',
    },
  },
  jT86rGYwY_: {
    type: 'div',
    isCanvas: false,
    props: {},
    displayName: 'div',
    custom: {},
    parent: 'QHUae7v0DA',
    hidden: false,
    nodes: ['C-rwGUHTKz'],
    linkedNodes: {},
  },
  'C-rwGUHTKz': {
    type: 'div',
    isCanvas: false,
    props: {
      className: 'box__children-wrapper',
    },
    displayName: 'div',
    custom: {},
    parent: 'jT86rGYwY_',
    hidden: false,
    nodes: ['bRvAc0xn-2'],
    linkedNodes: {},
  },
  'bRvAc0xn-2': {
    type: {
      resolvedName: 'AddElementBox',
    },
    isCanvas: false,
    props: {},
    displayName: 'AddElementBox',
    custom: {},
    parent: 'C-rwGUHTKz',
    hidden: false,
    nodes: [],
    linkedNodes: {},
  },
};

export const getHoverCardProps = (topGap: number, targetPadding = 0): HoverCardProps => ({
  openDelay: 0,
  closeDelay: 0,
  styles: {
    dropdown: {
      padding: 0,
      position: 'fixed',
      top: topGap
        ? `${topGap + PREVIEW_GAP}px !important`
        : `${HEADER_HEIGHT + PREVIEW_GAP}px !important`,
      overflow: 'hidden',
    },
  },
  offset: {
    mainAxis: 8 + targetPadding,
  },
  withinPortal: true,
  withArrow: false,
  position: 'left',
  width: PREVIEW_WIDTH,
  shadow: 'md',
});
