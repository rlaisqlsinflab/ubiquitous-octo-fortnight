/**
 * 템플릿 관련 API 서비스
 *
 * API Base: /v1/internal/course/description
 */

interface TemplateListItem {
  templateKey: string;
  exampleCount: number;
  promptCount: number;
  hasCurriculum: boolean;
  historyCount: number;
  createdAt: string;
  updatedAt: string;
}

interface TemplateListResponse {
  statusCode: string;
  message: string;
  data: {
    totalCount: number;
    templates: TemplateListItem[];
  };
}

interface UpdateTemplatePayload {
  jsonBody?: string;
  originalTemplateJsonBody?: string;
  examples?: string[];
  curriculum?: {
    name: string;
    description: string;
    content: string;
  };
  prompts?: Array<{
    id: string;
    description: string;
    content: string;
    textCount: number;
  }>;
}

interface TemplateApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

interface UpdateTemplateResponse {
  id: string;
  templateKey: string;
  promptCount: number;
  exampleCount: number;
  curriculum?: {
    name: string;
    description: string;
    content: string;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * 템플릿 수정 API
 * PUT /api/v1/internal/course/description/templates/{templateKey}
 */
export async function updateTemplatePrompt(
  templateKey: string,
  payload: UpdateTemplatePayload
): Promise<TemplateApiResponse<UpdateTemplateResponse>> {
  const response = await fetch(
    `/api/v1/internal/course/description/templates/${templateKey}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to update template: ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * 템플릿 조회 API
 * GET /api/v1/internal/course/description/templates/{templateKey}
 */
export async function getTemplate(
  templateKey: string
): Promise<TemplateApiResponse<unknown>> {
  const response = await fetch(
    `/api/v1/internal/course/description/templates/${templateKey}`
  );

  if (!response.ok) {
    throw new Error(`Failed to get template: ${response.statusText}`);
  }

  return response.json();
}

/**
 * 템플릿 히스토리 조회 API
 * GET /api/v1/internal/course/description/templates/{templateKey}/history
 */
export async function getTemplateHistory(
  templateKey: string
): Promise<TemplateApiResponse<unknown>> {
  const response = await fetch(
    `/api/v1/internal/course/description/templates/${templateKey}/history`
  );

  if (!response.ok) {
    throw new Error(`Failed to get template history: ${response.statusText}`);
  }

  return response.json();
}

/**
 * 템플릿 삭제 API (Soft Delete)
 * DELETE /api/v1/internal/description/templates/{templateKey}
 */
export async function deleteTemplate(
  templateKey: string
): Promise<TemplateApiResponse<null>> {
  const response = await fetch(
    `/v1/internal/description/templates/${templateKey}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to delete template: ${response.statusText}`);
  }

  return response.json();
}

/**
 * 템플릿 목록 조회 API
 * GET /api/v1/internal/course/description/templates
 * 모든 템플릿을 최신순(updatedAt 기준)으로 정렬하여 반환
 */
export async function listTemplates(): Promise<TemplateListResponse> {
  const response = await fetch('/v1/internal/course/description/templates');

  if (!response.ok) {
    throw new Error(`Failed to list templates: ${response.statusText}`);
  }

  return response.json();
}

interface AutoCreateTemplatePayload {
  craftJson: string;
  templateKey: string;
  examples?: string[];
  prompts?: Array<{
    id: string;
    description: string;
    content: string;
    textCount: number;
  }>;
  curriculum?: {
    name: string;
    description: string;
    content: string;
  };
}

/**
 * 템플릿 자동 생성 API
 * POST /api/v1/internal/course/description/templates/auto
 * CraftJSON 기반으로 템플릿을 자동으로 생성합니다
 */
export async function autoCreateTemplate(
  payload: AutoCreateTemplatePayload
): Promise<TemplateApiResponse<UpdateTemplateResponse>> {
  const response = await fetch(
    '/api/v1/internal/course/description/templates/auto',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to create template: ${response.statusText}`
    );
  }

  return response.json();
}
