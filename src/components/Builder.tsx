import type { Options } from '@craftjs/core';
import { Editor } from '@craftjs/core';
import { COLOR_PALETTE } from '@inflearn/ds-react';
import type { ReactNode } from 'react';
import { Fragment, useRef } from 'react';

import { AddElementBox, Box } from './Box';
import ColumnTextBox from './Box/ColumnTextBox';
import TextBox from './Box/TextBox';
import Container from './common/Container';
import {
  Margin,
  Separator,
  OneColumnGrid,
  TwoColumnGrid,
  ThreeColumnGrid,
  OneToTwoColumnGrid,
  TwoToOneColumnGrid,
} from './Grid';
import OneColumnImageText from './Grid/OneColumnImageText';
import OneColumnInfoBox from './Grid/OneColumnInfoBox';
import OneColumnPaywall from './Grid/OneColumnPaywall';
import OneColumnSeparator from './Grid/OneColumnSeparator';
import OneColumnText from './Grid/OneColumnText';
import OneColumnVideoText from './Grid/OneColumnVideoText';
import OneToTwoColumnText from './Grid/OneToTwoColumnText';
import ThreeColumnText from './Grid/ThreeColumnText';
import TwoColumnText from './Grid/TwoColumnText';
import TwoToOneColumnText from './Grid/TwoToOneColumnText';
import { ImageText } from './ImageText/ImageText';
import { InfoBox } from './InfoBox/InfoBox';
import ImageUploadErrorModalProvider from './Modals/ImageUploadErrorModal';
import Paywall from './Paywall/Paywall';
import NewSeparator from './Separator/NewSeparator';
import { ColumnText } from './Text/ColumnText';
import { Text } from './Text/Text';
import { VideoText } from './VideoText/VideoText';
import type { EnvironmentValues } from '../context/EnvironmentValuesContext';
import { EnvironmentValuesContext } from '../context/EnvironmentValuesContext';
import type { ExternalHandlerType } from '../context/ExternalHandlerContext';
import { ExternalHandlerContext } from '../context/ExternalHandlerContext';
import { fireActionEvent } from '../utils/fireEvent';

// NOTE: !! 절대 이름을 바꾸면 안됩니다 !!
export const resolver = {
  Fragment,
  OneColumnText,
  OneToTwoColumnText,
  ThreeColumnText,
  TwoColumnText,
  TwoToOneColumnText,
  OneColumnInfoBox,
  OneColumnImageText,
  OneColumnPaywall,
  OneColumnVideoText,
  OneColumnSeparator,
  OneColumnGrid,
  OneToTwoColumnGrid,
  ThreeColumnGrid,
  TwoColumnGrid,
  TwoToOneColumnGrid,
  Container,
  AddElementBox,
  Box,
  Margin,
  Separator,
  NewSeparator,
  Text,
  ColumnText,
  TextBox,
  ColumnTextBox,
  InfoBox,
  ImageText,
  VideoText,
  Paywall,
};

type Props = {
  children?: ReactNode;
} & Partial<Options> &
  EnvironmentValues &
  ExternalHandlerType;

const Builder = ({
  children,
  videoUploadAPIUrl,
  editorImageUploader,
  imageTextImageUploader,
  onNodesChange,
  onClickBlockButtons,
  onClickElementButtons,
  onClickEditorToolbarButtons,
  onVideoUploadSuccess,
  onClickDeleteVideoButton,
  onDeleteImageTextUrl,
  onAddImageTextUrl,
  onDeleteImageTextImage,
  onAddImageTextImage,
  payWallInfo,
  ...options
}: Props) => {
  const currentHTML = useRef<string | null>(null);

  return (
    <ImageUploadErrorModalProvider>
      <ExternalHandlerContext.Provider
        value={{
          onClickBlockButtons,
          onClickElementButtons,
          onClickEditorToolbarButtons,
          onVideoUploadSuccess,
          onClickDeleteVideoButton,
          onDeleteImageTextUrl,
          onAddImageTextUrl,
          onDeleteImageTextImage,
          onAddImageTextImage,
        }}>
        <EnvironmentValuesContext.Provider
          value={{
            videoUploadAPIUrl,
            editorImageUploader,
            imageTextImageUploader,
            payWallInfo,
          }}>
          <Editor
            {...options}
            indicator={{
              success: COLOR_PALETTE.infgreen[6],
              transition: 'unset',
            }}
            onNodesChange={(...args) => {
              onNodesChange?.(...args);

              // NOTE: canUndo가 true라면, 초기 렌더링이 아니라 추가적인 변경이 있다는 의미이므로, canUndo가 true일 때만 actionEvent를 발생시킵니다.
              if (currentHTML.current === args[0].serialize()) {
                return;
              }

              if (args[0].history.canUndo()) {
                currentHTML.current = args[0].serialize();
                fireActionEvent();
              }
            }}
            resolver={resolver}>
            {children}
          </Editor>
        </EnvironmentValuesContext.Provider>
      </ExternalHandlerContext.Provider>
    </ImageUploadErrorModalProvider>
  );
};

export default Builder;
