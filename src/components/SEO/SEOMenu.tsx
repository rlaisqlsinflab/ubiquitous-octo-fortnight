import type { HoverCardProps } from '@inflearn/ds-react';
import { HoverCard } from '@inflearn/ds-react';
import type { FloatingPosition } from '@mantine/core/lib/Floating';
import type { ReactNode } from 'react';

import { SEOHoverCard } from './SEOHoverCard';
import { SEOHoverTarget } from './SEOHoverTarget';
import { SEOResultContextProvider, useSEOResultContext } from './SEOResultContext';
import type { SEORuleGroup } from '../../utils/SEO/SEORule';

type Props = {
  html: string;
  rules: SEORuleGroup;
  children?: ReactNode;
  position?: FloatingPosition;
  withinPortal?: boolean;
  styles?: HoverCardProps['styles'];
  title?: string;
  isLoading?: boolean;
};

const _SEOMenu = ({
  children,
  position = 'right',
  withinPortal = true,
  title,
  isLoading = false,
}: Props) => {
  const { retry } = useSEOResultContext();

  return (
    <HoverCard
      position={position}
      withinPortal={withinPortal}
      onOpen={retry}
      styles={{
        dropdown: {
          maxWidth: 712,
        },
      }}>
      {children ?? (
        <>
          <SEOHoverTarget isLoading={isLoading} />
          <SEOHoverCard title={title} />
        </>
      )}
    </HoverCard>
  );
};

export const SEOMenu = (props: Props) => {
  return (
    <SEOResultContextProvider rules={props.rules} html={props.html}>
      <_SEOMenu {...props}>{props.children}</_SEOMenu>
    </SEOResultContextProvider>
  );
};
