import type { WithoutPrivateActions, useEditorReturnType } from '@craftjs/core';
import { useShowNotification } from '@inflearn/ds-react';
import type { EditorEvents, UploadFormData } from '@inflearn/editor';
import { useTiptapEditor } from '@inflearn/editor';
import { debounce } from 'lodash-es';
import { useContext } from 'react';

import type { SetExtensions } from './types';
import { IMAGE_RESIZING_WIDTH } from '../../constants/size';
import { EnvironmentValuesContext } from '../../context/EnvironmentValuesContext';
import { fireActionEvent } from '../../utils/fireEvent';
import { setHeadingLevels } from '../../utils/setHeadingLevels';
import useUploadImage from '../../utils/uploadImage';
import { ImageUploadErrorContext } from '../Modals/ImageUploadErrorModal';

const changeContent = (setContentProp: (html: string) => void) =>
  debounce(({ editor: changedEditor }: EditorEvents['update']) => {
    // NOTE: 타이핑을 하는 동안 액션 이벤트를 발생시켜서 자동 저장을 지연시킵니다.
    fireActionEvent();

    setContentProp(changedEditor.getHTML());
  }, 300);

type Params = {
  nodeId: string;
  history: WithoutPrivateActions['history'];
  query: useEditorReturnType['query'];
  placeholder: string;
  content: string;
  setExtensions: SetExtensions;
};

export function useCreateInflearnEditor<T extends { content?: string }>({
  nodeId,
  history,
  query,
  placeholder,
  content,
  setExtensions,
}: Params) {
  const { showNotification } = useShowNotification();
  const { editorImageUploader } = useContext(EnvironmentValuesContext);

  const { openModal } = useContext(ImageUploadErrorContext);
  const { uploadImage } = useUploadImage({
    uploadImageAPI: editorImageUploader,
    onError: openModal,
  });

  const handleUploadImage: UploadFormData = async (formData: FormData) => {
    const url = (await uploadImage({ formData })) ?? '';

    return { url: `${url}?w=${IMAGE_RESIZING_WIDTH}` };
  };

  const setContentProp = (html: string) => {
    const serializedNodes = query.getSerializedNodes();

    if (!serializedNodes[nodeId]) {
      return;
    }

    history.ignore().setProp(nodeId, (props: T) => {
      props.content = html;
    });
  };

  const editor = useTiptapEditor({
    extensions: setExtensions({
      placeholder,
      showNotification,
      uploadImageFormData: handleUploadImage,
    }),
    content: content,
    onUpdate: changeContent(setContentProp),
    editorProps: {
      transformPastedHTML: (originHTML) =>
        setHeadingLevels(originHTML, [
          { from: [1, 2, 3], to: 3 },
          { from: [4, 5, 6], to: 4 },
        ]),
    },
    immediatelyRender: false,
  });

  return { editor, handleUploadImage };
}
