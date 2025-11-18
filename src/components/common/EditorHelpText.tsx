import { Flex, Group, Kbd, Text } from '@inflearn/ds-react';
import type { ReactNode } from 'react';

/**
 * @see https://github.com/inflearn/course-frontend/pull/196#discussion_r1328233088
 */
export const EditorHelpText = () => {
  return (
    <Flex gap={8} justify="flex-end" align="center" sx={{ pointerEvents: 'none' }}>
      <ChangeLine />
      <Text weight={500} color="gray.6" component="span" size={10}>
        /
      </Text>
      <ChangeParagraph />
    </Flex>
  );
};

const ChangeLine = () => {
  return (
    <Group spacing="sm" align="center">
      <KBDWrapper>
        <Kbd size="xs">Shift</Kbd>+<Kbd size="xs">Enter</Kbd>
      </KBDWrapper>

      <Text component="span" weight={500} color="gray.7" m={0} size="xs">
        줄 바꾸기
      </Text>
    </Group>
  );
};

const ChangeParagraph = () => {
  return (
    <Group spacing="sm" align="center">
      <KBDWrapper>
        <Kbd size="xs">Enter</Kbd>
      </KBDWrapper>

      <Text component="span" weight={500} color="gray.7" m={0} size="xs">
        문단 바꾸기
      </Text>
    </Group>
  );
};

/**
 * span 텍스트와 KBD의 정렬(높이)을 맞추기 위해 지정
 */
const KBDWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      component="span"
      sx={{
        lineHeight: 1,
        height: 19,
      }}>
      {children}
    </Text>
  );
};
