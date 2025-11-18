import { useEditor } from '@craftjs/core';

export const useDeleteNode = () => {
  const { actions } = useEditor();

  const deleteNode = (id: string) => {
    try {
      actions.history.throttle().delete(id);
    } catch (error) {
      console.error('node 를 제거하는 도중에 문제가 발생했습니다.', error);
    }
  };

  return { deleteNode };
};
