import { ApiError } from '@inflearn/course-fetch';
import { Button, EmptyStates, Flex, Skeleton, Text } from '@inflearn/ds-react';
import { isNil } from 'lodash-es';
import { decompressFromBase64 } from 'lz-string';
import { useContext } from 'react';

import { InflabTemplateButton } from './InflabTemplateButton';
import {
  InflabTemplateButtonType,
  InflabTemplatesContext,
} from '../context/InflabTemplatesContext';
import type { CheckIsEmptyTemplateContent, Template } from '../types';

export const INFLAB_TEMPLATE_BUTTONS_PADDING = 16;

type Props = {
  topGap: number;
  error: unknown;
  templates: Template[];
  isError: boolean;
  isLoading: boolean;
  refetch: () => void;
  checkIsEmptyTemplateContent: CheckIsEmptyTemplateContent;
};

export function InflabTemplateButtons({
  topGap,
  error,
  isError,
  isLoading,
  templates,
  refetch,
  checkIsEmptyTemplateContent,
}: Props) {
  const { templatesMetadata } = useContext(InflabTemplatesContext);

  if (isError) {
    const isApiError = error instanceof ApiError;

    return <ErrorState isApiError={isApiError} refetch={refetch} />;
  }

  if (isLoading) {
    return <ButtonSkeleton />;
  }

  return (
    <Flex p={INFLAB_TEMPLATE_BUTTONS_PADDING} direction="column" gap="md">
      {templates.map((template) => {
        if (isNil(template)) {
          return null;
        }

        return (
          <InflabTemplateButton
            topGap={topGap}
            thumbnail={
              templatesMetadata.find((metadata) => metadata.title === template.title)?.thumbnail
            }
            type={
              templatesMetadata.find((metadata) => metadata.title === template.title)?.type ??
              InflabTemplateButtonType.default
            }
            key={template.title}
            templateHtml={template.htmlBody}
            templateJson={decompressFromBase64(template.jsonBody) ?? template.jsonBody}
            templateTitle={template.title}
            checkIsEmptyTemplateContent={checkIsEmptyTemplateContent}
          />
        );
      })}
    </Flex>
  );
}

const ButtonSkeleton = () => (
  <Flex gap="md" direction="column" p="md">
    <Skeleton w="100%" h={148} radius="xs" />
    <Skeleton w="100%" h={148} radius="xs" />
    <Skeleton w="100%" h={148} radius="xs" />
    <Skeleton w="100%" h={148} radius="xs" />
  </Flex>
);

type ErrorStateProps = {
  isApiError: boolean;
  refetch: () => void;
};

const ErrorState = ({ isApiError, refetch }: ErrorStateProps) => {
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
};
