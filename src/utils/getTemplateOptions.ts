/**
 * 템플릿 드롭다운 옵션 생성 유틸리티
 */

/**
 * 미리 정의된 템플릿 라벨 맵
 * 특정 templateKey에 대해 괄호 텍스트를 표시합니다
 */
const PREDEFINED_TEMPLATE_LABELS: Record<string, string> = {
  PROBLEM: 'PROBLEM (문제해결형)',
  RESULT: 'RESULT (결과물 중심형)',
  STORY: 'STORY (강사 스토리형)',
};

/**
 * 템플릿 키 목록을 기반으로 드롭다운 옵션 생성
 *
 * @param templateKeys - API에서 받은 템플릿 키 배열
 * @returns 드롭다운 옵션 배열
 *
 * @example
 * const keys = ['STORY', 'PROBLEM', 'RESULT', 'CUSTOM', 'TEST'];
 * const options = generateTemplateOptions(keys);
 * // 결과:
 * // [
 * //   { value: 'STORY', label: 'STORY (강사 스토리형)' },
 * //   { value: 'PROBLEM', label: 'PROBLEM (문제해결형)' },
 * //   { value: 'RESULT', label: 'RESULT (결과물 중심형)' },
 * //   { value: 'CUSTOM', label: 'CUSTOM' },
 * //   { value: 'TEST', label: 'TEST' }
 * // ]
 */
export function generateTemplateOptions(
  templateKeys: string[]
): Array<{ value: string; label: string }> {
  return templateKeys.map((key) => ({
    value: key,
    label: PREDEFINED_TEMPLATE_LABELS[key] || key,
  }));
}

/**
 * 단일 템플릿 키에 대한 라벨 생성
 *
 * @param templateKey - 템플릿 키
 * @returns 라벨 텍스트
 *
 * @example
 * getTemplateLabel('STORY') // 'STORY (강사 스토리형)'
 * getTemplateLabel('CUSTOM') // 'CUSTOM'
 */
export function getTemplateLabel(templateKey: string): string {
  return PREDEFINED_TEMPLATE_LABELS[templateKey] || templateKey;
}

/**
 * 기본 템플릿 옵션 상수 (API 호출 실패 시 사용)
 */
export const DEFAULT_TEMPLATE_OPTIONS = [
  { value: 'PROBLEM', label: 'PROBLEM (문제해결형)' },
  { value: 'RESULT', label: 'RESULT (결과물 중심형)' },
  { value: 'STORY', label: 'STORY (강사 스토리형)' },
  { value: 'CUSTOM', label: 'CUSTOM' },
  { value: 'TEST', label: 'TEST' },
];
