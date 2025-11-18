import '@inflearn/editor/dist/style.css';
import './index.scss';
import { useState, useEffect } from 'react';
import { decompressFromBase64 } from 'lz-string';
import ViewOnlyFrame from './components/ViewOnlyFrame';
import './App.css';
import { listTemplates, getTemplate } from './hooks/useEditorData/templateService';
import { generateTemplateOptions, DEFAULT_TEMPLATE_OPTIONS } from './utils/getTemplateOptions';

interface ApiRequestState {
  courseId: string;
  templateKey: string;
  language: string;
  prompt: string;
  jsonBody: string;
  isLoading: boolean;
  apiError: string | null;
}

interface DirectJsonState {
  encodedJson: string;
  error: string | null;
}

interface PreviewState {
  jsonData: string;
  encodedJson: string;
  error: string | null;
}

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'vi', label: 'Tiếng Việt' },
  { value: 'ko', label: '한국어' },
];

function App() {
  const [apiState, setApiState] = useState<ApiRequestState>({
    courseId: '335826',
    templateKey: 'STORY',
    language: 'ko',
    prompt: '',
    jsonBody: '',
    isLoading: false,
    apiError: null,
  });

  const [previewState, setPreviewState] = useState<PreviewState>({
    jsonData: '',
    encodedJson: '',
    error: null,
  });

  const [directJsonState, setDirectJsonState] = useState<DirectJsonState>({
    encodedJson: '',
    error: null,
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const [templateOptions, setTemplateOptions] = useState(DEFAULT_TEMPLATE_OPTIONS);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [templatesList, setTemplatesList] = useState<Array<{
    templateKey: string;
    exampleCount: number;
    promptCount: number;
    hasCurriculum: boolean;
    historyCount: number;
    createdAt: string;
    updatedAt: string;
  }>>([]);
  const [currentTemplate, setCurrentTemplate] = useState<any>(null);
  const [isLoadingCurrentTemplate, setIsLoadingCurrentTemplate] = useState(false);

  // 템플릿 목록 조회
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await listTemplates();
        console.log('Templates API Response:', response);

        if (response?.data?.templates && Array.isArray(response.data.templates)) {
          const templates = response.data.templates;
          console.log('Loaded templates:', templates);
          const templateKeys = templates.map((t) => t.templateKey);
          const options = generateTemplateOptions(templateKeys);
          setTemplateOptions(options);
          setTemplatesList(templates);
        } else {
          console.warn('Invalid response structure:', response);
          setTemplateOptions(DEFAULT_TEMPLATE_OPTIONS);
          setTemplatesList([]);
        }
      } catch (error) {
        console.error('Failed to load templates:', error);
        // API 실패 시 기본값 사용
        setTemplateOptions(DEFAULT_TEMPLATE_OPTIONS);
        setTemplatesList([]);
      } finally {
        setIsLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, []);

  // 선택된 템플릿 상세 정보 조회
  useEffect(() => {
    const fetchCurrentTemplate = async () => {
      if (!apiState.templateKey) return;

      setIsLoadingCurrentTemplate(true);
      try {
        const response = await getTemplate(apiState.templateKey);
        console.log('Current template:', response);
        if (response?.data) {
          setCurrentTemplate(response.data);
        }
      } catch (error) {
        console.error('Failed to load current template:', error);
        setCurrentTemplate(null);
      } finally {
        setIsLoadingCurrentTemplate(false);
      }
    };

    fetchCurrentTemplate();
  }, [apiState.templateKey]);

  // API 로딩 중 경과 시간 업데이트
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (apiState.isLoading) {
      setElapsedTime(0);
      setCompletionTime(null);
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [apiState.isLoading]);

  // 로딩 완료 후 완료 시간 처리
  useEffect(() => {
    if (!apiState.isLoading && elapsedTime > 0) {
      setCompletionTime(elapsedTime);
    }
  }, [apiState.isLoading, elapsedTime]);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleCopyEncodedJson = () => {
    if (previewState.encodedJson) {
      navigator.clipboard.writeText(previewState.encodedJson);
      showMessage('success', 'Encoded JSON이 복사되었습니다.');
    }
  };

  const handleApiInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Omit<ApiRequestState, 'isLoading' | 'apiError'>) => {
    setApiState((prev) => ({
      ...prev,
      [field]: e.target.value,
      apiError: null,
    }));
  };

  const handleApiRequest = async () => {
    if (!apiState.courseId.trim() || !apiState.templateKey.trim()) {
      setApiState((prev) => ({
        ...prev,
        apiError: 'courseId와 templateKey는 필수입니다',
      }));
      return;
    }

    // 상태 초기화
    setPreviewState({
      jsonData: '',
      encodedJson: '',
      error: null,
    });

    // 새로운 API 요청 시 이전 요청 완료 시간 초기화
    setCompletionTime(null);

    setApiState((prev) => ({
      ...prev,
      isLoading: true,
      apiError: null,
    }));

    try {
      const requestBody: any = {
        templateKey: apiState.templateKey,
        language: apiState.language,
      };

      if (apiState.prompt.trim()) {
        requestBody.prompt = apiState.prompt;
      }

      if (apiState.jsonBody.trim()) {
        requestBody.jsonBody = apiState.jsonBody;
      }

      const url = new URL(
        // `https://internal-devops-api.inflearn.com/v1/internal/course/${apiState.courseId}/description/generations`
        `http://localhost:8080/v1/internal/course/${apiState.courseId}/description/generations`
      );
      url.searchParams.append('language', apiState.language);

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();

      let jsonBody = responseData.data?.jsonBody || responseData.jsonBody;

      if (jsonBody) {
        // Base64 인코딩된 상태이므로 자동으로 디코딩
        let decodedJson = jsonBody;
        try {
          const decompressedResult = decompressFromBase64(jsonBody);
          if (decompressedResult && decompressedResult !== '') {
            decodedJson = decompressedResult;
          }
        } catch (e) {
          decodedJson = jsonBody;
        }

        setPreviewState({
          jsonData: decodedJson,
          encodedJson: jsonBody,
          error: null,
        });

        showMessage('success', `API 요청 성공! (${elapsedTime}s) jsonBody를 렌더링했습니다.`);
      } else {
        throw new Error('응답에 jsonBody가 없습니다. 응답: ' + JSON.stringify(responseData));
      }

      setApiState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      setApiState((prev) => ({
        ...prev,
        isLoading: false,
        apiError: `오류: ${errorMessage}`,
      }));
      showMessage('error', errorMessage);
    }
  };

  const handleRenderDirectJson = () => {
    if (!directJsonState.encodedJson.trim()) {
      setDirectJsonState((prev) => ({
        ...prev,
        error: 'Encoded JSON을 입력해주세요',
      }));
      return;
    }

    try {
      let decodedJson = directJsonState.encodedJson;

      // Base64로 인코딩된 JSON 디코딩 시도
      try {
        const decompressedResult = decompressFromBase64(directJsonState.encodedJson);
        if (decompressedResult && decompressedResult !== '') {
          decodedJson = decompressedResult;
        }
      } catch (e) {
        // 압축이 안되어있으면 그대로 사용
        decodedJson = directJsonState.encodedJson;
      }

      // JSON 형식 검증
      JSON.parse(decodedJson);

      setPreviewState({
        jsonData: decodedJson,
        encodedJson: directJsonState.encodedJson,
        error: null,
      });

      setDirectJsonState((prev) => ({
        ...prev,
        error: null,
      }));

      showMessage('success', 'Encoded JSON을 성공적으로 렌더링했습니다.');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      setDirectJsonState((prev) => ({
        ...prev,
        error: `디코딩 오류: ${errorMessage}`,
      }));
      showMessage('error', errorMessage);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Description Builder Preview</h1>
          <p>course-frontend와 동일한 렌더링을 제공하는 프리뷰 도구</p>
        </div>
      </header>

      <main className="app-main">
        <div className="layout">
          <div className="input-panel">
            <div className="api-section">
              <h3>API 요청</h3>
              <div className="api-input-group">
                <input
                  type="text"
                  value={apiState.courseId}
                  onChange={(e) => handleApiInputChange(e, 'courseId')}
                  placeholder="courseId"
                  className="api-input"
                />
                <select
                  value={apiState.templateKey}
                  onChange={(e) => setApiState((prev) => ({ ...prev, templateKey: e.target.value, apiError: null }))}
                  className="api-input"
                >
                  {templateOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <select
                  value={apiState.language}
                  onChange={(e) => setApiState((prev) => ({ ...prev, language: e.target.value, apiError: null }))}
                  className="api-input"
                >
                  {LANGUAGE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {apiState.templateKey === 'CUSTOM' && (
                  <>
                    <textarea
                      value={apiState.prompt}
                      onChange={(e) => setApiState((prev) => ({ ...prev, prompt: e.target.value, apiError: null }))}
                      placeholder="prompt (CUSTOM에서만 사용)"
                      className="api-input api-textarea"
                      rows={4}
                    />
                    <textarea
                      value={apiState.jsonBody}
                      onChange={(e) => setApiState((prev) => ({ ...prev, jsonBody: e.target.value, apiError: null }))}
                      placeholder="jsonBody - Base64 encoded JSON (CUSTOM에서만 사용)"
                      className="api-input api-textarea"
                      rows={3}
                    />
                  </>
                )}
              </div>

              {apiState.apiError && (
                <div className="error-message">
                  <strong>Error:</strong> {apiState.apiError}
                </div>
              )}

              <button
                onClick={handleApiRequest}
                disabled={apiState.isLoading}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                {apiState.isLoading ? `API 요청 중... (${elapsedTime}s)` : 'API 요청'}
              </button>
            </div>

            <div className="prompt-edit-section">
              <h3>프롬프트 수정</h3>
              {isLoadingCurrentTemplate ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  프롬프트를 불러오는 중...
                </div>
              ) : currentTemplate?.prompts && currentTemplate.prompts.length > 0 ? (
                <div className="prompts-list">
                  {currentTemplate.prompts.map((prompt: any, index: number) => (
                    <div key={prompt.id || index} className="prompt-item">
                      <div className="prompt-header">
                        <strong>{prompt.id}</strong>
                        <span className="prompt-count">({prompt.textCount}개)</span>
                      </div>
                      <div className="prompt-description">{prompt.description}</div>
                      <textarea
                        value={prompt.content}
                        readOnly
                        className="api-input api-textarea"
                        rows={4}
                        style={{ backgroundColor: '#f5f5f5', cursor: 'default' }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  선택된 템플릿에 프롬프트가 없습니다.
                </div>
              )}
            </div>

            <div className="templates-section">
              <h3>템플릿 목록</h3>
              {isLoadingTemplates ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  템플릿 목록을 불러오는 중...
                </div>
              ) : templatesList.length > 0 ? (
                <div className="templates-table-wrapper">
                  <table className="templates-table">
                    <thead>
                      <tr>
                        <th>Template Key</th>
                        <th>프롬프트</th>
                        <th>예제</th>
                        <th>커리큘럼</th>
                        <th>히스토리</th>
                        <th>수정 시간</th>
                      </tr>
                    </thead>
                    <tbody>
                      {templatesList.map((template) => (
                        <tr key={template.templateKey}>
                          <td style={{ fontWeight: 'bold', color: '#0066cc' }}>
                            {template.templateKey}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {template.promptCount}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {template.exampleCount}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {template.hasCurriculum ? '✓' : '✗'}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {template.historyCount}
                          </td>
                          <td style={{ fontSize: '12px', color: '#666' }}>
                            {new Date(template.updatedAt).toLocaleDateString('ko-KR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  조회할 템플릿이 없습니다.
                </div>
              )}
            </div>

            <div className="direct-json-section">
              <h3>직접 JSON 입력</h3>
              <div className="direct-json-input-group">
                <textarea
                  value={directJsonState.encodedJson}
                  onChange={(e) => setDirectJsonState((prev) => ({ ...prev, encodedJson: e.target.value, error: null }))}
                  placeholder="Base64 encoded JSON 또는 일반 JSON을 여기에 붙여넣으세요"
                  className="api-input api-textarea"
                  rows={6}
                />
              </div>

              {directJsonState.error && (
                <div className="error-message">
                  <strong>Error:</strong> {directJsonState.error}
                </div>
              )}

              <button
                onClick={handleRenderDirectJson}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                JSON 렌더링
              </button>
            </div>
          </div>

          <div className="preview-panel">
            <div className="preview-header">
              <h2>Preview</h2>
              {completionTime && (
                <div className="completion-time-badge">
                  이전 요청: {completionTime}s
                </div>
              )}
            </div>
            {previewState.jsonData && !previewState.error ? (
              <>
                <div className="preview-toolbar">
                  {previewState.encodedJson && (
                    <button
                      onClick={handleCopyEncodedJson}
                      className="btn btn-toolbar"
                      title="렌더링된 Encoded JSON 복사"
                    >
                      📋 복사
                    </button>
                  )}
                </div>
                <ViewOnlyFrame json={previewState.jsonData} />
              </>
            ) : (
              <div className="empty-preview">
                <p>API 요청을 통해 jsonBody를 가져오세요</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {message && (
        <div className={`toast toast-${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}

export default App;
