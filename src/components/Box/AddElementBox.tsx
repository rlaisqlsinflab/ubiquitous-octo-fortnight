import type { UserComponent } from '@craftjs/core';
import { useEditor, useNode } from '@craftjs/core';
import { Box, Button, Icon, Menu } from '@inflearn/ds-react';
import { faCirclePlus, faImage, faSquareInfo, faVideo } from '@inflearn/pro-solid-svg-icons';
import type { ReactNode } from 'react';
import { useContext, useMemo, useRef } from 'react';

import { TextIcon } from './TextIcon';
import { ActionMenuContext } from '../../context/ActionMenuContext';
import type { ElementType } from '../../context/ExternalHandlerContext';
import { ELEMENT_TYPE } from '../../context/ExternalHandlerContext';
import { ExternalHandlerContext } from '../../context/ExternalHandlerContext';
import { useBlock } from '../../hooks/useBlock';
import { dashedBorderStyle } from '../../styles/dashedBorderStyle';
import { getBlockType } from '../../utils/getBlockType';
import { ImageText } from '../ImageText/ImageText';
import { InfoBox } from '../InfoBox/InfoBox';
import { Text } from '../Text/Text';
import { VideoText } from '../VideoText/VideoText';

export const ADD_ELEMENT_BOX_CLASS_NAME = 'box';

type AddableComponent = {
  type: ElementType;
  name: string;
  icon: ReactNode;
  component: UserComponent;
  props?: Record<string, any>;
};

const addableComponents: AddableComponent[] = [
  {
    type: ELEMENT_TYPE.TEXT,
    name: '텍스트',
    icon: <TextIcon />,
    component: Text,
    props: {
      focusWhenCreated: true,
    },
  },
  {
    type: ELEMENT_TYPE.INFO_BOX,
    name: '정보 박스',
    icon: <Icon icon={faSquareInfo} />,
    component: InfoBox,
    props: {
      focusWhenCreated: true,
    },
  },
  {
    type: ELEMENT_TYPE.IMAGE_TEXT,
    name: '이미지',
    icon: <Icon icon={faImage} />,
    component: ImageText,
  },
  {
    type: ELEMENT_TYPE.VIDEO_TEXT,
    name: '동영상',
    icon: <Icon icon={faVideo} />,
    component: VideoText,
  },
];

const AddElementBox = () => {
  const { id } = useNode();
  const {
    query: { parseFreshNode, getSerializedNodes },
    actions: { add, history },
  } = useEditor();
  const { onClickElementButtons } = useContext(ExternalHandlerContext);
  const { findBlockElement } = useBlock();

  const addElementBoxRef = useRef<HTMLDivElement | null>(null);
  const { setPreventHoverEffect } = useContext(ActionMenuContext);

  const serializedNodes = getSerializedNodes();

  const parentId = useMemo(() => serializedNodes[id].parent, [id, serializedNodes]);

  const addNodeWithUserComponent = (
    userComponent: UserComponent,
    props?: Record<string, unknown>
  ) => {
    if (!parentId) {
      return;
    }

    const freshNode = {
      data: {
        type: userComponent,
        props: props ?? {},
      },
    };
    const node = parseFreshNode(freshNode).toNode();

    add(node, parentId);
  };

  const replaceComponent = (userComponent: UserComponent, props?: Record<string, unknown>) => {
    addNodeWithUserComponent(userComponent, props);
    history.throttle().delete(id);
  };

  const handleAddComponent =
    ({
      elementType,
      userComponent,
      props,
    }: {
      elementType: ElementType;
      userComponent: UserComponent;
      props?: Record<string, unknown>;
    }) =>
    () => {
      const $parentElement = addElementBoxRef.current?.parentElement;
      replaceComponent(userComponent, props);

      // replace된 후의 컴포넌트를 타켓으로 지정하기 위해서 setTimeout을 사용
      setTimeout(() => {
        if ($parentElement) {
          $parentElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }, 100);

      // GTM
      const blockElement = findBlockElement();
      const blockType = getBlockType(blockElement);

      onClickElementButtons?.({
        elementMenuType: 'add',
        elementType: elementType,
        blockType,
      });
    };

  return (
    <Box
      sx={[
        {
          position: 'relative',
          padding: '40px 0',
          width: '100%',
        },
        dashedBorderStyle,
      ]}
      className={ADD_ELEMENT_BOX_CLASS_NAME}
      ref={addElementBoxRef}>
      <Menu
        withBorder
        onOpen={() => {
          setPreventHoverEffect(true);
        }}
        onClose={() => {
          setPreventHoverEffect(false);
        }}>
        <Menu.Target>
          <Button
            className="box__add-element-button"
            leftIcon={<Icon icon={faCirclePlus} />}
            variant="light"
            color="gray"
            radius="md"
            size="sm">
            요소 추가
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          {addableComponents.map(({ type, name, icon, component, props }) => (
            <Menu.Item
              onClick={handleAddComponent({ userComponent: component, props, elementType: type })}
              key={name}
              styles={{
                itemLabel: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              }}>
              <div className="box__add-element-button-menu-item-wrapper">
                <div className="box-add-element-button-menu-item-icon">{icon}</div>
                {name}
              </div>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};

export default AddElementBox;
