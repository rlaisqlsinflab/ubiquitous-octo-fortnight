import { ApiError } from '@inflearn/course-fetch';
import { Box, Button, EmptyStates, Flex, Skeleton, Text } from '@inflearn/ds-react';

import { MyTemplateButtonWrapper } from './MyTemplateButtonWrapper';
import type { CheckIsEmptyTemplateContent, Template } from '../types';

type Props = {
  topGap: number;
  error: unknown;
  templates: Template[];
  isError: boolean;
  isLoading: boolean;
  refetch: () => void;
  checkIsEmptyTemplateContent: CheckIsEmptyTemplateContent;
  onOpenCreateMyTemplateModal: () => void;
};

export function MyTemplateButtons({
  topGap,
  error,
  templates,
  isError,
  isLoading,
  refetch,
  checkIsEmptyTemplateContent,
  onOpenCreateMyTemplateModal,
}: Props) {
  if (isError) {
    const isApiError = error instanceof ApiError;

    return (
      <Flex h="100%" align="center" justify="center" p="md">
        <EmptyStates
          image="ERROR"
          title="불러오기 실패"
          body={
            <>
              <Text align="center" m={0}>
                템플릿을 불러올 수 없습니다.
              </Text>
              <Text align="center" m={0}>
                {isApiError
                  ? '문제가 지속되면 지원팀에 문의해주세요.'
                  : '네트워크 연결을 확인하고 다시 시도해주세요.'}
              </Text>
            </>
          }
          cta={
            isApiError ? null : (
              <Button variant="default" size="xs" onClick={refetch}>
                다시 불러오기
              </Button>
            )
          }
        />
      </Flex>
    );
  }

  if (isLoading) {
    return (
      <Flex gap="md" direction="column" p="md">
        <Skeleton w="100%" h={148} radius="xs" />
        <Skeleton w="100%" h={148} radius="xs" />
        <Skeleton w="100%" h={148} radius="xs" />
        <Skeleton w="100%" h={148} radius="xs" />
      </Flex>
    );
  }

  if (templates.length === 0) {
    return (
      <Flex h="100%" align="center" justify="center" p="md">
        <EmptyStates
          image="NO_DATA"
          title="MY 템플릿"
          body={
            <Flex direction="column" justify="center" align="center">
              <Text align="center" m={0}>
                아직 템플릿이 없어요.
              </Text>
              <Text align="center" mt={0} mb={16}>
                새로운 템플릿을 저장해보세요.
              </Text>
              <Button
                variant="default"
                color="infgreen"
                size="xs"
                onClick={onOpenCreateMyTemplateModal}>
                템플릿 저장
              </Button>
            </Flex>
          }
        />
      </Flex>
    );
  }

  return (
    <Box
      component="ul"
      css={{
        width: '100%',
        listStyle: 'none',
        padding: 0,
        margin: 0,
      }}>
      {templates.map((template) => (
        <MyTemplateButtonWrapper
          topGap={topGap}
          key={template.id}
          template={template}
          checkIsEmptyTemplateContent={checkIsEmptyTemplateContent}
        />
      ))}
    </Box>
  );
}
