import { ApiError } from '@inflearn/course-fetch';
import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Flex,
  Icon,
  Tabs,
  useShowNotification,
} from '@inflearn/ds-react';
import type { DrawerProps } from '@inflearn/ds-react';
import { faXmark } from '@inflearn/pro-regular-svg-icons';
import { isEqual, isNil } from 'lodash-es';
import { decompressFromBase64 } from 'lz-string';
import { useEffect } from 'react';

import type { ChangeTemplatePanelTab, TemplatePanelTab } from './fixtures';
import { TEMPLATE_PANEL_TAB_LOOKUP } from './fixtures';
import { InflabTemplatesContext } from '../context/InflabTemplatesContext';
import type { InflabTemplatesContextType } from '../context/InflabTemplatesContext';
import { MyTemplateApiContext } from '../context/MyTemplateApiContext';
import type { MyTemplateApiContextType } from '../context/MyTemplateApiContext';
import { TemplateMarketingCallbackContext } from '../context/TemplateMarketingCallbackContext';
import type { TemplateMarketingCallbackContextType } from '../context/TemplateMarketingCallbackContext';
import { InflabTemplateButtons } from '../inflab/InflabTemplateButtons';
import { MyTemplateButtons } from '../my/MyTemplateButtons';
import { MyTemplateSaveModal } from '../my/MyTemplateSaveModal';
import { HEADER_HEIGHT } from '../styleFixtures';
import type { TemplatesPagination } from '../types';

type Props = {
  // style & drawer component props
  topGap?: number;
  withinPortal?: DrawerProps['withinPortal'];
  portalTarget?: DrawerProps['target'];
  portalProps?: DrawerProps['portalProps'];
  // foundation
  tab: TemplatePanelTab;
  changeTab: ChangeTemplatePanelTab;
  opened: boolean;
  close: () => void;
  inflabTemplatesMetadata: InflabTemplatesContextType['templatesMetadata'];
  isMyTemplateCreateModalOpened: boolean;
  myTemplateCreateModalHandler: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
  inflabTemplatesResponse: TemplatesQueryResponse;
  myTemplatesResponse: TemplatesQueryResponse;
} & TemplateMarketingCallbackContextType &
  MyTemplateApiContextType;

const TEMPLATE_PANEL_WIDTH = 219;

type TemplatesQueryResponse = {
  templatesPagination?: TemplatesPagination;
  isInitialLoading: boolean;
  isError: boolean;
  refetch: () => void;
  error: unknown;
};

export const TemplatePanel = ({
  // style & drawer component props
  topGap = 0,
  withinPortal = false,
  portalTarget,
  portalProps,
  // foundation
  tab,
  changeTab,
  opened,
  close,
  inflabTemplatesMetadata,
  isMyTemplateCreateModalOpened,
  myTemplateCreateModalHandler,
  // templates query response
  inflabTemplatesResponse,
  myTemplatesResponse,
  // my template update/delete
  createTemplate,
  updateTemplate,
  deleteTemplate,
  // optional event callbacks
  onTemplateManagerOpened,
  onClickCreateMyTemplateButton,
  onApplyTemplate,
  onOpenMyTemplateSaveModal,
}: Props) => {
  const { showNotification } = useShowNotification();

  const {
    error: inflabTemplateError,
    templatesPagination: inflabTemplatesData,
    isInitialLoading: isTemplatesLoading,
    isError: isTemplatesError,
    refetch: templateRefetch,
  } = inflabTemplatesResponse;

  const {
    error: myTemplateError,
    templatesPagination: myTemplatesData,
    isInitialLoading: isMyTemplatesLoading,
    isError: isMyTemplatesError,
    refetch: myTemplatesRefetch,
  } = myTemplatesResponse;

  useEffect(() => {
    if (opened) {
      onTemplateManagerOpened?.();
    }
  }, [opened]);

  const handleRefetchTemplates = () => {
    templateRefetch();
  };

  const inflabTemplates = inflabTemplatesData?.items ?? [];
  const myTemplates = myTemplatesData?.items ?? [];

  const allTemplates = [...inflabTemplates, ...myTemplates];

  /**
   * @description
   * 현재 content json이 template json과 동일한지 체크
   * 템플릿 적용 이후 다른 템플릿 이동 시 수정 사항이 없다면 적용 확인 모달을 띄우지 않기 위한 함수
   * @param contentJson
   */
  const checkIsEmptyTemplateContent = (contentJson: string) => {
    const jsonBodies = allTemplates.map((template) => {
      if (isNil(template)) {
        return null;
      }

      return decompressFromBase64(template.jsonBody) ?? template.jsonBody;
    });

    const isEmpty = jsonBodies.some(
      (templateJsonBody) => !isNil(templateJsonBody) && isEqual(contentJson, templateJsonBody)
    );

    return isEmpty;
  };

  const handleCreateMyTemplate = async (title: string, onSuccess: () => void) => {
    try {
      // title외에 어떤 body가 필요한지 템플릿 패널은 알지 못한다.
      await createTemplate(title);

      changeTab(TEMPLATE_PANEL_TAB_LOOKUP.my);
      myTemplateCreateModalHandler.close();

      showNotification({
        title: '템플릿이 생성되었습니다.',
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
          title: '템플릿 제목, 내용을 확인해주세요.',
          type: 'error',
        });

        return;
      }

      // 그외 에러는 사용처에서 핸들링
      throw error;
    }
  };

  return (
    <InflabTemplatesContext.Provider value={{ templatesMetadata: inflabTemplatesMetadata }}>
      <MyTemplateApiContext.Provider
        value={{
          createTemplate,
          updateTemplate,
          deleteTemplate,
        }}>
        <TemplateMarketingCallbackContext.Provider
          value={{
            onOpenMyTemplateSaveModal,
            onTemplateManagerOpened,
            onClickCreateMyTemplateButton,
            onApplyTemplate,
          }}>
          <Drawer
            styles={{
              inner: {
                top: HEADER_HEIGHT,
                right: 0,
              },
              body: {
                padding: 0,
                height: '100%',
              },
            }}
            closeOnEscape={false}
            trapFocus
            portalProps={portalProps}
            target={portalTarget}
            withinPortal={withinPortal}
            position="right"
            lockScroll={false}
            withOverlay={false}
            withCloseButton={false}
            size={TEMPLATE_PANEL_WIDTH}
            opened={opened}
            onClose={close}>
            <ActionIcon
              aria-label="템플릿 패널 닫기"
              radius="md"
              size="n-sm"
              variant="subtle"
              color="gray"
              onClick={close}
              css={{
                position: 'absolute',
                top: '4px',
                right: '8px',
              }}>
              <Icon size="sm" icon={faXmark} />
            </ActionIcon>
            <Tabs
              radius={0}
              value={tab}
              onTabChange={changeTab}
              css={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}>
              <Tabs.List>
                <Tabs.Tab value={TEMPLATE_PANEL_TAB_LOOKUP.inflab}>기본 템플릿</Tabs.Tab>
                <Tabs.Tab value={TEMPLATE_PANEL_TAB_LOOKUP.my}>My</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel
                h="100%"
                value={TEMPLATE_PANEL_TAB_LOOKUP.inflab}
                css={{
                  overflowY: 'auto',
                }}>
                <Flex direction="column" w="100%" h="100%">
                  <InflabTemplateButtons
                    topGap={topGap}
                    error={inflabTemplateError}
                    isError={isTemplatesError}
                    isLoading={isTemplatesLoading}
                    templates={inflabTemplates}
                    refetch={handleRefetchTemplates}
                    checkIsEmptyTemplateContent={checkIsEmptyTemplateContent}
                  />
                </Flex>
              </Tabs.Panel>
              <Tabs.Panel
                h="100%"
                value={TEMPLATE_PANEL_TAB_LOOKUP.my}
                css={{
                  overflowY: 'auto',
                }}>
                {myTemplates.length === 0 ? null : (
                  <Box p="md">
                    <Button
                      variant="default"
                      color="infgreen"
                      size="xs"
                      w="100%"
                      onClick={() => {
                        onOpenMyTemplateSaveModal?.();
                        myTemplateCreateModalHandler.open();
                      }}>
                      지금 내용 템플릿으로 저장
                    </Button>
                  </Box>
                )}
                <MyTemplateButtons
                  topGap={topGap}
                  error={myTemplateError}
                  isError={isMyTemplatesError}
                  templates={myTemplates}
                  isLoading={isMyTemplatesLoading}
                  refetch={myTemplatesRefetch}
                  checkIsEmptyTemplateContent={checkIsEmptyTemplateContent}
                  onOpenCreateMyTemplateModal={myTemplateCreateModalHandler.open}
                />
              </Tabs.Panel>
            </Tabs>
          </Drawer>
          <MyTemplateSaveModal
            mode="create"
            opened={isMyTemplateCreateModalOpened}
            close={myTemplateCreateModalHandler.close}
            onSubmit={handleCreateMyTemplate}
          />
        </TemplateMarketingCallbackContext.Provider>
      </MyTemplateApiContext.Provider>
    </InflabTemplatesContext.Provider>
  );
};
