import { useEditor, useNode } from '@craftjs/core';

import { GridHoc } from './GridHoc';
import OneColumnGridComponent from './OneColumnGrid';
import OneToTwoColumnGridComponent from './OneToTwoColumnGrid';
import ThreeColumnGridComponent from './ThreeColumnGrid';
import TwoColumnGridComponent from './TwoColumnGrid';
import TwoToOneColumnGridComponent from './TwoToOneColumnGrid';
import MarginComponent from '../Margin';
import SeparatorComponent from '../Separator/Separator';

type BlockProps = {
  scrollWhenCreated?: boolean;
};

export const OneColumnGrid = ({ scrollWhenCreated }: BlockProps) => {
  const editor = useEditor();
  const { id } = useNode();

  return (
    <GridHoc nodeId={id} editor={editor} scrollWhenCreated={scrollWhenCreated}>
      <OneColumnGridComponent />
    </GridHoc>
  );
};

export const TwoColumnGrid = ({ scrollWhenCreated }: BlockProps) => {
  const editor = useEditor();
  const { id } = useNode();

  return (
    <GridHoc nodeId={id} editor={editor} scrollWhenCreated={scrollWhenCreated}>
      <TwoColumnGridComponent />
    </GridHoc>
  );
};

export const TwoToOneColumnGrid = ({ scrollWhenCreated }: BlockProps) => {
  const editor = useEditor();
  const { id } = useNode();

  return (
    <GridHoc nodeId={id} editor={editor} scrollWhenCreated={scrollWhenCreated}>
      <TwoToOneColumnGridComponent />
    </GridHoc>
  );
};

export const OneToTwoColumnGrid = ({ scrollWhenCreated }: BlockProps) => {
  const editor = useEditor();
  const { id } = useNode();

  return (
    <GridHoc nodeId={id} editor={editor} scrollWhenCreated={scrollWhenCreated}>
      <OneToTwoColumnGridComponent />
    </GridHoc>
  );
};

export const ThreeColumnGrid = ({ scrollWhenCreated }: BlockProps) => {
  const editor = useEditor();
  const { id } = useNode();

  return (
    <GridHoc nodeId={id} editor={editor} scrollWhenCreated={scrollWhenCreated}>
      <ThreeColumnGridComponent />
    </GridHoc>
  );
};

export const Margin = ({ scrollWhenCreated }: BlockProps) => {
  const editor = useEditor();
  const { id } = useNode();

  return (
    <GridHoc nodeId={id} editor={editor} scrollWhenCreated={scrollWhenCreated}>
      <MarginComponent />
    </GridHoc>
  );
};

export const Separator = ({ scrollWhenCreated }: BlockProps) => {
  const editor = useEditor();
  const { id } = useNode();

  return (
    <GridHoc nodeId={id} editor={editor} scrollWhenCreated={scrollWhenCreated}>
      <SeparatorComponent />
    </GridHoc>
  );
};

export const GRID_CLASS_NAME = 'grid-wrapper';
