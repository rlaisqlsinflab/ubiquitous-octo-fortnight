/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export enum InflabTemplateButtonType {
  'default' = 'default',
  'thumbnail' = 'thumbnail',
  'preview' = 'preview',
  'all' = 'all',
}

export type InflabTemplatesMetadata = {
  /**
   * @description 버튼 타입을 지정
   * - default: 기본 버튼
   * - thumbnail: 썸네일만 보여줄 수 있는 버튼
   * - preview: 미리보기만 보여줄 수 있는 버튼
   * - all: 썸네일과 미리보기를 모두 보여줄 수 있는 버튼
   */
  type: InflabTemplateButtonType;
  /**
   * @description 믹스패널 데이터가 ~형을 제외한 값으로 수집되고 있어서, "기본형"이 제목인 경우 "기본"으로만 전달.
   * 서버에 저장된 title과 동일한 값이어야 합니다. title을 기준으로 thumbnail, showPreview값이 적용됩니다.
   */
  title: string;
  /**
   * @description 템플릿 적용 버튼에 표시될 썸네일 UI
   */
  thumbnail?: {
    url: string;
    alt: string;
  };
}[];

export type InflabTemplatesContextType = {
  templatesMetadata: InflabTemplatesMetadata;
};

const defaultValue = {
  templatesMetadata: [],
};

export const InflabTemplatesContext = createContext<InflabTemplatesContextType>(defaultValue);
