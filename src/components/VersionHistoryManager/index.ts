import { VersionEmptyState } from './components/VersionHistoryEmptyState';
import { VersionErrorState } from './components/VersionHistoryErrorState';
import { VersionHistoryItem } from './components/VersionHistoryItem/VersionHistoryItem';
import { VersionHistoryList } from './components/VersionHistoryList';
import { VersionHistoryGroupLoadingState } from './components/VersionHistoryLoadingState';
import { VersionHistoryPanel } from './components/VersionHistoryPanel';
import { VersionHistorySection } from './components/VersionHistorySection';
import { VersionHistoryTypeSelect } from './components/VersionHistoryTypeSelect';
import { transformToAccordionHistorySections } from './dto/transformToAccordionHistorySections';
import { transformToHistorySections } from './dto/transformToHistorySections';
import { getHistoryName } from './utils';
import { VersionHistoryManager } from './VersionHistoryManager';

const VersionHistory = {
  Item: VersionHistoryItem,
  List: VersionHistoryList,
  Panel: VersionHistoryPanel,
  Section: VersionHistorySection,
  TypeSelect: VersionHistoryTypeSelect,
  EmptyState: VersionEmptyState,
  ErrorState: VersionErrorState,
  LoadingState: VersionHistoryGroupLoadingState,
};

export {
  VersionHistoryManager,
  VersionHistory,
  transformToHistorySections,
  transformToAccordionHistorySections,
  getHistoryName,
};
