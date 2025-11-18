import { ApiError } from '@inflearn/course-fetch';
import { EmptyStates, Flex, Text } from '@inflearn/ds-react';
import { Button } from '@mantine/core';

type Props = {
  refetch: () => void;
  error: unknown;
};

export function VersionErrorState({ refetch, error }: Props) {
  const isHandledError = error instanceof ApiError;

  return (
    <Flex h="100%" align="center" justify="center">
      <EmptyStates
        image="ERROR"
        title="불러오기 실패"
        body={
          <>
            <Text align="center" m={0}>
              버전기록을 불러올 수 없습니다.
            </Text>
            <Text align="center" m={0}>
              {isHandledError
                ? '문제가 지속되면 지원팀에 문의해주세요.'
                : '네트워크 연결을 확인하고 다시 시도해주세요.'}
            </Text>
          </>
        }
        cta={
          isHandledError ? (
            ''
          ) : (
            <Button variant="default" size="xs" onClick={refetch}>
              다시 불러오기
            </Button>
          )
        }
      />
    </Flex>
  );
}
