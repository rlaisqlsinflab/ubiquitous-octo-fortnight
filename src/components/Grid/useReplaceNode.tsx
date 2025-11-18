import { type FreshNode, useEditor, type UserComponent } from '@craftjs/core';

import { useDeleteNode } from './useDeleteNode';

export const useReplaceNode = () => {
  const { query, actions } = useEditor();
  const { deleteNode } = useDeleteNode();

  const replaceNode = ({
    Component,
    id,
    props,
  }: {
    Component: UserComponent;
    id: string;
    props?: Record<string, unknown>;
  }) => {
    try {
      const freshNode: FreshNode = {
        data: {
          type: Component,
          props: {
            scrollWhenCreated: true,
            focusWhenCreated: true,
            ...props,
          },
        },
      };

      const node = query.parseFreshNode(freshNode).toNode();
      const serializedNodes = query.getSerializedNodes();
      const serializedNode = serializedNodes[id];
      const parentId = serializedNode?.parent;

      if (!parentId) {
        console.error('Parent node not found for replacement');

        return;
      }

      const parentNode = serializedNodes[parentId];
      const currentIndex = parentNode?.nodes?.findIndex((nodeId) => nodeId === id) ?? -1;

      actions.add(node, parentId, currentIndex >= 0 ? currentIndex : undefined);

      deleteNode(id);

      return node;
    } catch (error) {
      console.error('freshNode를 parse하는 도중에 문제가 발생했습니다.', error);
    }
  };

  return { replaceNode };
};
