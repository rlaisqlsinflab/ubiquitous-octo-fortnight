import type { Node, useEditorReturnType } from '@craftjs/core';
import { useNode } from '@craftjs/core';
import { ActionIcon, Badge, Icon, Menu, Text } from '@inflearn/ds-react';
import {
  faPlus,
  faSquareInfo,
  faText,
  faTrashCan,
  faImage,
  faVideo,
  faWallet,
} from '@inflearn/pro-regular-svg-icons';
import type { ReactNode } from 'react';
import { useContext, useEffect, useRef } from 'react';

import { Handle } from './ActionButtons/Handle';
import {
  OneToTwoColumnIcon,
  SeparatorIcon,
  ThreeColumnIcon,
  TwoColumnIcon,
  TwoToOneColumnIcon,
} from './ActionButtons/Icons';
import OneColumnImageText from './OneColumnImageText';
import OneColumnInfoBox from './OneColumnInfoBox';
import OneColumnPaywall from './OneColumnPaywall';
import OneColumnSeparator from './OneColumnSeparator';
import OneColumnText from './OneColumnText';
import OneColumnVideoText from './OneColumnVideoText';
import OneToTwoColumnText from './OneToTwoColumnText';
import ThreeColumnText from './ThreeColumnText';
import TwoColumnText from './TwoColumnText';
import TwoToOneColumnText from './TwoToOneColumnText';
import type { BlockProps } from './utils';
import { isBlockTypeName } from './utils';
import {
  type BlockButtonEventType,
  type BlockButtonsType,
  ExternalHandlerContext,
} from '../../context/ExternalHandlerContext';
import { useAddNode } from '../../hooks/useAddNode';
import { useHasPaywall } from '../../hooks/useHasPaywall';
import { getBlockName } from '../../utils/getBlockName';
import { LeftActionMenu } from '../LeftActionMenu';

import { GRID_CLASS_NAME } from './index';

// GridHoc
type Props = {
  children?: ReactNode;
  scrollWhenCreated?: boolean;
  nodeId: string;
  editor: useEditorReturnType;
  className?: string;
};

export const GridHoc = ({ children, nodeId: id, editor, scrollWhenCreated, className }: Props) => {
  const { actions, query } = editor;
  const {
    connectors: { connect },
  } = useNode();
  const { addNode } = useAddNode({ id });

  const { hasPaywall, enabledPaywallOption } = useHasPaywall();

  const gridWrapperRef = useRef<HTMLDivElement | null>(null);
  const { onClickBlockButtons } = useContext(ExternalHandlerContext);

  const { ROOT } = query.getSerializedNodes();
  const nodes = ROOT.nodes;
  const currentIndex = nodes.findIndex((nodeId) => nodeId === id);
  const isOnlyOne = nodes.length === 1;

  const nodeId = nodes[currentIndex];

  // nodeId가 유효한지 확인
  const nodeName =
    nodeId && currentIndex !== -1 ? getBlockName(query.node(nodeId).toSerializedNode()) : '';

  useEffect(() => {
    if (scrollWhenCreated) {
      // view가 업데이트 되기 전에 scrollIntoView를 실행하면 제대로  작동하지 않아서 setTimeout을 사용
      setTimeout(() => {
        gridWrapperRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });

        actions.history
          .ignore()
          .setProp(id, (prevProps: BlockProps) => (prevProps.scrollWhenCreated = false));
      }, 100);
    }
  }, [actions, id, scrollWhenCreated]);

  const onAddBlockClick = (node?: Node) => {
    if (!node || !onClickBlockButtons) {
      return;
    }

    const newNodeName = isBlockTypeName(node.data.displayName)
      ? node.data.displayName
      : node.data.name;

    onClickAddBlock({
      nodeName: newNodeName,
      onClickBlockButtons,
      eventType: 'add',
    });
  };
  const addButtons = (
    <Menu.Dropdown>
      <Menu.Label>삽입 요소</Menu.Label>
      <Menu.Item
        icon={<Icon icon={faText} size="sm" />}
        onClick={() => {
          const node = addNode(OneColumnText);

          onAddBlockClick(node);
        }}>
        <Text size="xs" weight={500}>
          텍스트
        </Text>
      </Menu.Item>
      <Menu.Item
        icon={<Icon icon={faSquareInfo} size="sm" />}
        onClick={() => {
          const node = addNode(OneColumnInfoBox);

          onAddBlockClick(node);
        }}>
        <Text size="xs" weight={500}>
          정보박스
        </Text>
      </Menu.Item>
      <Menu.Item
        icon={<Icon icon={faImage} size="sm" />}
        onClick={() => {
          const node = addNode(OneColumnImageText);

          onAddBlockClick(node);
        }}>
        <Text size="xs" weight={500}>
          이미지
        </Text>
      </Menu.Item>
      <Menu.Item
        icon={<Icon icon={faVideo} size="sm" />}
        onClick={() => {
          const node = addNode(OneColumnVideoText);

          onAddBlockClick(node);
        }}>
        <Text size="xs" weight={500}>
          동영상
        </Text>
      </Menu.Item>
      {enabledPaywallOption && (
        <Menu.Item
          disabled={hasPaywall}
          icon={<Icon icon={faWallet} size="sm" />}
          rightSection={
            hasPaywall && (
              <Badge variant="light" color="blue" size="xs" radius="xl">
                삽입됨
              </Badge>
            )
          }
          onClick={() => {
            const node = addNode(OneColumnPaywall);

            onAddBlockClick(node);
          }}>
          <Text size="xs" weight={500}>
            유료 구간
          </Text>
        </Menu.Item>
      )}
      <Menu.Divider />

      <Menu.Label>레이아웃</Menu.Label>
      <Menu.Item
        icon={<TwoColumnIcon />}
        onClick={() => {
          const node = addNode(TwoColumnText);

          onAddBlockClick(node);
        }}>
        <Text size="xs" weight={500}>
          2열
        </Text>
      </Menu.Item>
      <Menu.Item
        icon={<OneToTwoColumnIcon />}
        onClick={() => {
          const node = addNode(OneToTwoColumnText);

          onAddBlockClick(node);
        }}>
        <Text size="xs" weight={500}>
          2열 (1:2)
        </Text>
      </Menu.Item>
      <Menu.Item
        icon={<TwoToOneColumnIcon />}
        onClick={() => {
          const node = addNode(TwoToOneColumnText);

          onAddBlockClick(node);
        }}>
        <Text size="xs" weight={500}>
          2열 (2:1)
        </Text>
      </Menu.Item>
      <Menu.Item
        icon={<ThreeColumnIcon />}
        onClick={() => {
          const node = addNode(ThreeColumnText);

          onAddBlockClick(node);
        }}>
        <Text size="xs" weight={500}>
          3열
        </Text>
      </Menu.Item>
      <Menu.Item
        icon={<SeparatorIcon />}
        onClick={() => {
          const node = addNode(OneColumnSeparator);

          onAddBlockClick(node);
        }}>
        <Text size="xs" weight={500}>
          구분
        </Text>
      </Menu.Item>
    </Menu.Dropdown>
  );

  return (
    <div
      className={`${GRID_CLASS_NAME} ${className ?? ''}`}
      ref={(ref) => {
        if (ref) {
          connect(ref);
          gridWrapperRef.current = ref;
        }
      }}>
      <LeftActionMenu
        isRootBlock
        actionButtons={
          <>
            <ActionIcon
              variant="subtle"
              size="n-xs"
              w={20}
              h={24}
              miw="unset"
              mih="unset"
              radius="md"
              disabled={isOnlyOne}
              onClick={() => {
                if (isOnlyOne) {
                  return;
                }

                actions.delete(id);

                if (!onClickBlockButtons) {
                  return;
                }

                if (isBlockTypeName(nodeName)) {
                  onClickBlockButtons({
                    eventType: 'delete',
                    blockType: nodeName,
                  });
                }
              }}>
              <Icon icon={faTrashCan} size="2xs" color="gray.7" />
            </ActionIcon>
            <Menu
              withBorder
              closeOnItemClick
              closeDelay={300}
              position="bottom-start"
              width={160}
              styles={{
                label: { padding: '2px 8px' },
                item: { padding: '6px 8px' },
              }}>
              <Menu.Target>
                <ActionIcon
                  w={20}
                  h={24}
                  miw="unset"
                  mih="unset"
                  radius="md"
                  size="n-xs"
                  variant="subtle">
                  <Icon icon={faPlus} size="2xs" color="gray.7" />
                </ActionIcon>
              </Menu.Target>
              {addButtons}
            </Menu>
            <Handle />
          </>
        }>
        {children}
      </LeftActionMenu>
    </div>
  );
};

function onClickAddBlock({
  nodeName,
  onClickBlockButtons,
  eventType,
}: {
  nodeName: string;
  onClickBlockButtons: ({ eventType, blockType }: BlockButtonsType) => void;
  eventType: BlockButtonEventType;
}) {
  if (isBlockTypeName(nodeName)) {
    onClickBlockButtons({ eventType, blockType: nodeName });
  }
}
