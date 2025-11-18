/**
 * 템플릿 관련 API 서비스
 */

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
    `/api/v1/internal/description/templates/${templateKey}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to delete template: ${response.statusText}`);
  }

  return response.json();
}
