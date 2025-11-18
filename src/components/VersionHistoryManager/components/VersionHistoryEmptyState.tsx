import { EmptyStates, Flex, Text } from '@inflearn/ds-react';

export function VersionEmptyState() {
  return (
    <Flex h="100%" align="center" justify="center">
      <EmptyStates
        image="NO_DATA"
        title="버전 기록"
        body={
          <>
            <Text align="center" m={0}>
              아직 버전 기록이 없어요.
            </Text>
            <Text align="center" m={0}>
              새로운 버전을 저장해보세요.
            </Text>
          </>
        }
      />
    </Flex>
  );
}
