import { type FreshNode, useEditor, type UserComponent } from '@craftjs/core';
import { isNil } from 'lodash-es';

import { useBlockElement } from './useBlock/useBlockElement';

export const useAddNode = ({ id }: { id?: string }) => {
  const { query, actions } = useEditor();
  const { findBlockElement } = useBlockElement();

  const addNode = (Component: UserComponent) => {
    try {
      const freshNode: FreshNode = {
        data: {
          type: Component,
          props: {
            scrollWhenCreated: true,
            focusWhenCreated: true,
          },
        },
      };

      const node = query.parseFreshNode(freshNode).toNode();

      const state = query.getState();
      const nodes = state.nodes.ROOT.data.nodes;
      const lastIndex = nodes.length;

      if (isNil(id)) {
        actions.add(node, 'ROOT', lastIndex);

        return node;
      }

      const blockParent = findBlockElement({ id });

      if (isNil(blockParent)) {
        actions.add(node, 'ROOT', lastIndex);

        return node;
      }
      const currentIndex = nodes.findIndex((nodeId) => nodeId === blockParent.id);

      const insertIndex = currentIndex === -1 ? lastIndex : currentIndex + 1;
      actions.add(node, 'ROOT', insertIndex);

      return node;
    } catch (error) {
      console.error('freshNode를 parse하는 도중에 문제가 발생했습니다.', error);
    }
  };

  return { addNode };
};
