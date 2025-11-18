import { ApiError } from '@inflearn/course-fetch';
import {
  ActionIcon,
  Box,
  COLOR_PALETTE,
  Ellipsis,
  Flex,
  Icon,
  Text,
  useShowNotification,
} from '@inflearn/ds-react';
import { faEdit, faTrash } from '@inflearn/pro-regular-svg-icons';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { compressToBase64, decompressFromBase64 } from 'lz-string';
import { useContext } from 'react';

import { DeleteMyTemplateModal } from './DeleteMyTemplateModal';
import { MyTemplateButton } from './MyTemplateButton';
import { MyTemplateSaveModal } from './MyTemplateSaveModal';
import { MyTemplateApiContext } from '../context/MyTemplateApiContext';
import type { CheckIsEmptyTemplateContent, Template } from '../types';
import { useEditorData } from '../../../hooks/useEditorData/useEditorData';

type Props = {
  topGap: number;
  template: Template;
  checkIsEmptyTemplateContent: CheckIsEmptyTemplateContent;
};

export function MyTemplateButtonWrapper({ topGap, template, checkIsEmptyTemplateContent }: Props) {
  const { updateTemplate, deleteTemplate, updateTemplateContent } = useContext(MyTemplateApiContext);
  const { generateJson, generateHTML } = useEditorData();
  const [deleteModalOpened, deleteModalHandler] = useDisclosure(false);
  const [editModalOpened, editModalHandler] = useDisclosure(false);
  const { showNotification } = useShowNotification();

  const handleClickDeleteTemplate = async () => {
    try {
      await deleteTemplate(template.id);

      showNotification({
        type: 'success',
        title: '템플릿이 삭제되었습니다.',
      });
    } catch (error) {
      if (!(error instanceof ApiError)) {
        return;
      }

      if (error.isNotFound) {
        showNotification({
          title: '템플릿을 찾을 수 없습니다.',
          type: 'error',
        });

        return;
      }

      throw error;
      // 그외 에러는 사용처에서 핸들링
    } finally {
      deleteModalHandler.close();
    }
  };

  const handleUpdateMyTemplate = async (title: string, onSuccess: () => void) => {
    try {
      await updateTemplate(title, template.id);
      // 템플릿과 관련한 노티만 핸들링. 커스터마이징? 나중에
      showNotification({
        title: '템플릿이 수정되었습니다.',
        type: 'success',
      });
      onSuccess();
    } catch (error) {
      if (!(error instanceof ApiError)) {
        return;
      }

      // 템플릿과 관련한 에러만 핸들링
      if (error.isBadRequest) {
        showNotification({
          title: '템플릿 이름을 입력해주세요.',
          type: 'error',
        });

        return;
      }

      if (error.isNotFound) {
        showNotification({
          title: '템플릿을 찾을 수 없습니다.',
          type: 'error',
        });

        return;
      }

      // 그외 에러는 사용처에서 핸들링
      throw error;
    } finally {
      editModalHandler.close();
    }
  };

  const handleUpdateTemplateWithContent = async (
    title: string,
    onSuccess: () => void,
    includeContent: boolean = false
  ) => {
    try {
      if (includeContent && updateTemplateContent) {
        const jsonBody = generateJson();
        const htmlBody = await generateHTML();

        // lz-string으로 jsonBody 인코딩
        const compressedJsonBody = compressToBase64(jsonBody);

        await updateTemplateContent(
          template.id,
          title,
          compressedJsonBody,
          htmlBody
        );

        showNotification({
          title: '템플릿 내용이 수정되었습니다.',
          type: 'success',
        });
      } else {
        await handleUpdateMyTemplate(title, onSuccess);
      }
      onSuccess();
    } catch (error) {
      if (!(error instanceof ApiError)) {
        return;
      }

      if (error.isBadRequest) {
        showNotification({
          title: '템플릿 정보를 입력해주세요.',
          type: 'error',
        });
        return;
      }

      if (error.isNotFound) {
        showNotification({
          title: '템플릿을 찾을 수 없습니다.',
          type: 'error',
        });
        return;
      }

      throw error;
    } finally {
      editModalHandler.close();
    }
  };

  return (
    <Flex
      component="li"
      justify="space-between"
      w="100%"
      css={{
        position: 'relative',
        '&:hover': {
          backgroundColor: COLOR_PALETTE.gray[0],
          '.my-template-panel': {
            display: 'flex',
          },

          '.my-template-info': {
            width: '66%',
          },
        },
        '.my-template-info': {
          width: '100%',
        },
      }}>
      <MyTemplateButton
        topGap={topGap}
        templateTitle={template.title}
        templateHtml={template.htmlBody}
        templateJson={decompressFromBase64(template.jsonBody) ?? template.jsonBody}
        checkIsEmptyTemplateContent={checkIsEmptyTemplateContent}>
        <Box className="my-template-info" p={16}>
          <Ellipsis>
            <Text m={0} size="xs" fw={700} color="gray.7">
              {template.title}
            </Text>
          </Ellipsis>
          <Text m={0} size="xs" color="gray.6">
            {dayjs(template.createdAt).format('YY.MM.DD')}
          </Text>
        </Box>
      </MyTemplateButton>
      <Flex
        className="my-template-panel"
        css={{
          position: 'absolute',
          display: 'none',
          top: 19,
          right: 16,
        }}>
        <ActionIcon
          variant="subtle"
          color="gray"
          size="n-xs"
          radius="md"
          onClick={() => {
            editModalHandler.open();
          }}>
          <Icon size="xs" icon={faEdit} />
        </ActionIcon>
        <MyTemplateSaveModal
          mode="update"
          opened={editModalOpened}
          close={editModalHandler.close}
          onSubmit={handleUpdateMyTemplate}
          onSubmitWithContent={(title, onSuccess) =>
            handleUpdateTemplateWithContent(title, onSuccess, true)
          }
          initialValue={template.title}
          showContentOption={true}
        />
        <ActionIcon
          variant="subtle"
          color="gray"
          size="n-xs"
          radius="md"
          onClick={() => {
            deleteModalHandler.open();
          }}>
          <Icon size="xs" icon={faTrash} />
        </ActionIcon>
        <DeleteMyTemplateModal
          opened={deleteModalOpened}
          onClose={deleteModalHandler.close}
          onClickDelete={handleClickDeleteTemplate}
        />
      </Flex>
    </Flex>
  );
}
