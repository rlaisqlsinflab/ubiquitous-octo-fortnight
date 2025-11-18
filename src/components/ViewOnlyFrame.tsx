import { Fragment, useState, useEffect } from 'react';
import { Editor, Frame as CraftFrame } from '@craftjs/core';

// Import all components needed for rendering
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
import Paywall from './Paywall/Paywall';
import NewSeparator from './Separator/NewSeparator';
import { ColumnText } from './Text/ColumnText';
import { Text } from './Text/Text';
import { VideoText } from './VideoText/VideoText';

// Create resolver for CraftJS
const resolver = {
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

export const BUILDER_ROOT_ID = 'builder-root';

type ViewOnlyFrameProps = {
  json?: string;
  data?: string;
};

const ViewOnlyFrame = ({ json, data }: ViewOnlyFrameProps) => {
  const content = data || json;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [content]);

  return (
    <div id={BUILDER_ROOT_ID}>
      {error && (
        <div style={{
          padding: '16px',
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          borderRadius: '4px',
          color: '#991b1b',
          fontSize: '13px',
          marginBottom: '12px'
        }}>
          <strong>렌더링 오류:</strong> {error}
        </div>
      )}
      <Editor
        resolver={resolver}
        enabled={false}
        onNodesChange={() => {}}
        onError={(error) => {
          console.error('CraftJS Error:', error);
          setError(error.message || '렌더링 중 오류가 발생했습니다');
        }}
      >
        <CraftFrame data={content}>
          {/* Frame content is rendered from the data prop */}
        </CraftFrame>
      </Editor>
    </div>
  );
};

export default ViewOnlyFrame;
