import type { DrawerProps } from '@inflearn/ds-react';
import { Accordion, ScrollArea, Text } from '@inflearn/ds-react';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

import { VersionEmptyState } from './components/VersionHistoryEmptyState';
import { VersionErrorState } from './components/VersionHistoryErrorState';
import type {
  ChangeTitleSetter,
  PreviewSetter,
  RestoreSetter,
} from './components/VersionHistoryItem/types';
import { VersionHistoryItem } from './components/VersionHistoryItem/VersionHistoryItem';
import { VersionHistoryList } from './components/VersionHistoryList';
import { VersionHistoryGroupLoadingState } from './components/VersionHistoryLoadingState';
import { VersionHistoryPanel } from './components/VersionHistoryPanel';
import { VersionHistorySection } from './components/VersionHistorySection';
import type {
  ChangeTypeSelectSetter,
  VersionHistoryType,
} from './components/VersionHistoryTypeSelect';
import { VersionHistoryTypeSelect } from './components/VersionHistoryTypeSelect';
import { transformToAccordionHistorySections } from './dto/transformToAccordionHistorySections';
import { transformToHistorySections } from './dto/transformToHistorySections';
import type { History } from './types';
import { HISTORY_TYPE } from './types';

type Props = {
  // NOTE: History props
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  error: unknown;
  histories: History[];

  // NOTE: restore props
  isRestoreLoading: boolean;
  onClickRestore: RestoreSetter;

  // NOTE: preview props
  previewOriginUrl: string;
  onClickPreview?: PreviewSetter;

  // NOTE: title props
  onChangeTitle: ChangeTitleSetter;

  // NOTE: version type props
  versionHistoryType: VersionHistoryType[];
  defaultVersionHistoryType: string;
  onChangeVersionHistoryType?: ChangeTypeSelectSetter;

  // NOTE: accordion props
  accordion?: boolean;

  // NOTE: style & drawer component props
  withinPortal?: DrawerProps['withinPortal'];
  portalTarget?: DrawerProps['target'];
  portalProps?: DrawerProps['portalProps'];
  opened: boolean;
  close: () => void;
};

export function VersionHistoryManager(props: Props) {
  const { accordion, ...rest } = props;

  if (accordion) {
    return <AccordionVersionHistoryPanel {...rest} />;
  }

  return <BasicVersionHistoryPanel {...rest} />;
}

function BasicVersionHistoryPanel({
  isLoading,
  isError,
  refetch,
  error,
  histories,
  onClickRestore,
  onClickPreview,
  onChangeTitle,
  isRestoreLoading,
  previewOriginUrl,
  versionHistoryType,
  defaultVersionHistoryType,
  onChangeVersionHistoryType,
  withinPortal,
  portalTarget,
  portalProps,
  opened,
  close,
}: Omit<Props, 'accordion'>) {
  const historySections = transformToHistorySections(histories);
  const isEmpty = histories.length === 0;

  return (
    <VersionHistoryPanel
      withinPortal={withinPortal}
      portalTarget={portalTarget}
      portalProps={portalProps}
      opened={opened}
      close={close}>
      <VersionHistoryTypeSelect
        data={versionHistoryType}
        value={defaultVersionHistoryType}
        onChange={onChangeVersionHistoryType}
      />
      <VersionHistoryContent
        isEmpty={isEmpty}
        isError={isError}
        isLoading={isLoading}
        error={error}
        refetch={refetch}>
        <ScrollArea css={{ flex: 1 }}>
          {historySections.map((historySection) => (
            <Fragment key={historySection.date}>
              <VersionHistorySection>{historySection.date}</VersionHistorySection>
              <VersionHistoryList>
                {historySection.histories.map((history) => (
                  <VersionHistoryItem
                    component="li"
                    key={history.id}
                    history={history}
                    onClickRestore={onClickRestore}
                    onClickPreview={onClickPreview}
                    onChangeTitle={onChangeTitle}
                    previewOriginUrl={previewOriginUrl}
                    isRestoreLoading={isRestoreLoading}
                  />
                ))}
              </VersionHistoryList>
            </Fragment>
          ))}
        </ScrollArea>
      </VersionHistoryContent>
    </VersionHistoryPanel>
  );
}

function AccordionVersionHistoryPanel({
  isLoading,
  isError,
  refetch,
  error,
  histories,
  onClickRestore,
  onClickPreview,
  onChangeTitle,
  isRestoreLoading,
  previewOriginUrl,
  versionHistoryType,
  defaultVersionHistoryType,
  onChangeVersionHistoryType,
  withinPortal,
  portalTarget,
  portalProps,
  opened,
  close,
}: Omit<Props, 'accordion'>) {
  const accordionHistorySections = transformToAccordionHistorySections(histories);
  const isEmpty = histories.length === 0;

  return (
    <VersionHistoryPanel
      withinPortal={withinPortal}
      portalTarget={portalTarget}
      portalProps={portalProps}
      opened={opened}
      close={close}>
      <VersionHistoryTypeSelect
        data={versionHistoryType}
        value={defaultVersionHistoryType}
        onChange={onChangeVersionHistoryType}
      />
      <VersionHistoryContent
        isEmpty={isEmpty}
        isError={isError}
        isLoading={isLoading}
        error={error}
        refetch={refetch}>
        <ScrollArea css={{ flex: 1 }}>
          {accordionHistorySections.map((historySection) => (
            <>
              <VersionHistorySection>{historySection.date}</VersionHistorySection>
              <Accordion chevronPosition="left" multiple>
                {historySection.historyGroups.map((historyGroup) => {
                  if (historyGroup.name === HISTORY_TYPE.PUBLISH) {
                    return (
                      <VersionHistoryItem
                        key={historyGroup.histories[0].id}
                        history={historyGroup.histories[0]}
                        onClickRestore={onClickRestore}
                        onClickPreview={onClickPreview}
                        onChangeTitle={onChangeTitle}
                        previewOriginUrl={previewOriginUrl}
                        isRestoreLoading={isRestoreLoading}
                      />
                    );
                  }

                  return (
                    <Accordion.Item key={historyGroup.name} value={historyGroup.name}>
                      <Accordion.Control>
                        <Text color="gray.9" m={0} size="sm" fw={700}>
                          {dayjs(historyGroup.name).format('MM.DD HH:mm')}
                        </Text>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <VersionHistoryList>
                          {historyGroup.histories.map((history) => (
                            <VersionHistoryItem
                              component="li"
                              key={history.id}
                              history={history}
                              onClickRestore={onClickRestore}
                              onClickPreview={onClickPreview}
                              onChangeTitle={onChangeTitle}
                              previewOriginUrl={previewOriginUrl}
                              isRestoreLoading={isRestoreLoading}
                            />
                          ))}
                        </VersionHistoryList>
                      </Accordion.Panel>
                    </Accordion.Item>
                  );
                })}
              </Accordion>
            </>
          ))}
        </ScrollArea>
      </VersionHistoryContent>
    </VersionHistoryPanel>
  );
}

function VersionHistoryContent({
  isError,
  isEmpty,
  isLoading,
  error,
  refetch,
  children,
}: {
  isError: boolean;
  isEmpty: boolean;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
  children: ReactNode;
}) {
  if (isLoading) {
    return <VersionHistoryGroupLoadingState />;
  }

  if (isError) {
    return <VersionErrorState refetch={refetch} error={error} />;
  }

  if (isEmpty) {
    return <VersionEmptyState />;
  }

  return <>{children}</>;
}
