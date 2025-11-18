import { useEditor } from '@craftjs/core';
import { isEqual } from 'lodash-es';
import { useContext, useState } from 'react';

import { useEditorData } from '../../../hooks/useEditorData/useEditorData';
import { checkIsEmptyContent } from '../checkIsEmptyContent/checkIsEmptyContent';
import { InflabTemplatesContext } from '../context/InflabTemplatesContext';
import { TemplateMarketingCallbackContext } from '../context/TemplateMarketingCallbackContext';
import type { CheckIsEmptyTemplateContent } from '../types';

export function useTemplateButton(
  templateTitle: string,
  templateJson: string,
  checkIsEmptyTemplateContent: CheckIsEmptyTemplateContent
) {
  const { templatesMetadata: inflabTemplatesMetadata } = useContext(InflabTemplatesContext);
  const { onApplyTemplate } = useContext(TemplateMarketingCallbackContext);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { actions, query } = useEditor();
  const { generateJson } = useEditorData();

  const handleClickTemplate = () => {
    const currentContentJson = generateJson();
    // NOTE: contents-builder 패키지에서 node에 등록된 user component의 prop등 정보가 변경되었다면 json 파일도 변경되었으므로 서버에 저장된 템플릿 json의 업데이트가 반드시 필요합니다.
    const isEmpty =
      checkIsEmptyTemplateContent(currentContentJson) ||
      checkIsEmptyContent(query.getSerializedNodes());

    // NOTE: 수정한 내역이 없고, 현재 적용중인 템플릿과 같은 템플릿 버튼을 클릭할 경우 아무런 액션을 취하지 않습니다.
    const isContentSameWithTemplate = isEqual(currentContentJson, templateJson);

    if (isContentSameWithTemplate) {
      return;
    }

    if (isEmpty) {
      applyTemplate();

      return;
    }

    setIsModalOpened(true);
  };

  const inflabTemplateTitles = inflabTemplatesMetadata.map((template) => template.title);
  const isInflabTemplate = inflabTemplateTitles.includes(templateTitle);

  const applyTemplate = () => {
    actions.deserialize(templateJson);
    onApplyTemplate?.(isInflabTemplate, templateTitle);
  };

  return {
    isModalOpened,
    setIsModalOpened,
    handleClickTemplate,
    applyTemplate,
  };
}
