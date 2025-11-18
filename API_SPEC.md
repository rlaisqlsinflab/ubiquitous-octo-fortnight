# 코스 설명 템플릿 관리 API 스펙

## 개요

이 문서는 코스 설명 템플릿의 생성, 조회, 수정, 삭제 및 히스토리 관리에 대한 API 스펙을 정의합니다.

---

## 📚 완전한 템플릿 API 목록 (요약)

| 메서드    | 엔드포인트                                              | 설명
      |
|--------|----------------------------------------------------|-----------------------|
| GET    | /course/description/templates                      | 모든 템플릿 목록 조회 (최신순 정렬) |
| GET    | /course/description/templates/:templateKey         | 특정 템플릿 상세 조회 |
| GET    | /course/description/templates/:templateKey/history | 템플릿 변경 히스토리 조회 |
| PUT    | /course/description/templates/:templateKey         | 템플릿 수정 (히스토리 자동 저장) |
| DELETE | /description/templates/:templateKey                | 템플릿 삭제 (soft delete) |
| POST   | /course/description/templates/auto                 | CraftJSON으로 템플릿 자동 생성 |

---

## 1. 템플릿 목록 조회 (List Templates)

### 요청
```
GET /api/v1/internal/course/description/templates
```

### 파라미터
- 없음 (모든 템플릿을 최신순으로 반환)

### 응답
```json
{
  "code": "200",
  "message": "SUCCESS",
  "data": {
    "totalCount": 3,
    "templates": [
      {
        "templateKey": "story",
        "exampleCount": 5,
        "promptCount": 4,
        "hasCurriculum": true,
        "historyCount": 3,
        "createdAt": "2024-01-13T10:00:00Z",
        "updatedAt": "2024-01-20T15:30:00Z"
      },
      {
        "templateKey": "problem",
        "exampleCount": 4,
        "promptCount": 3,
        "hasCurriculum": true,
        "historyCount": 1,
        "createdAt": "2024-01-14T09:15:00Z",
        "updatedAt": "2024-01-18T11:20:00Z"
      },
      {
        "templateKey": "result",
        "exampleCount": 3,
        "promptCount": 2,
        "hasCurriculum": false,
        "historyCount": 0,
        "createdAt": "2024-01-15T14:20:00Z",
        "updatedAt": "2024-01-15T14:20:00Z"
      }
    ]
  }
}
```

### 설명
- 모든 템플릿을 최신 수정 시간(updatedAt) 기준 내림차순으로 반환
- 각 템플릿의 메타데이터 포함:
  - `templateKey`: 템플릿 고유 키
  - `exampleCount`: 예제 개수
  - `promptCount`: 프롬프트 그룹 개수
  - `hasCurriculum`: 커리큘럼 여부
  - `historyCount`: 변경 이력 개수

---

## 2. 템플릿 상세 조회 (Get Template)

### 요청
```
GET /api/v1/internal/course/description/templates/{templateKey}
```

### 파라미터
- `templateKey` (path): 템플릿 키 (예: "story", "problem", "result")

### 응답
```json
{
  "code": "200",
  "message": "SUCCESS",
  "data": {
    "id": "ObjectId",
    "templateKey": "story",
    "prompts": [
      {
        "id": "group_1",
        "description": "그룹 설명",
        "content": "프롬프트 내용",
        "textCount": 3
      }
    ],
    "examples": [
      "예제 텍스트 1",
      "예제 텍스트 2"
    ],
    "curriculum": {
      "name": "Curriculum Generation",
      "description": "섹션 레벨 커리큘럼 생성",
      "content": "프롬프트 내용"
    },
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-20T15:30:00Z"
  }
}
```

---

## 2. 템플릿 히스토리 조회 (Get Template History)

### 요청
```
GET /api/v1/internal/course/description/templates/{templateKey}/history
```

### 파라미터
- `templateKey` (path): 템플릿 키

### 응답
```json
{
  "code": "200",
  "message": "SUCCESS",
  "data": {
    "id": "ObjectId",
    "templateKey": "story",
    "totalHistory": 3,
    "history": [
      {
        "version": 3,
        "updatedAt": "2024-01-15T14:20:00Z",
        "examples": 5,
        "prompts": 4,
        "curriculum": true
      },
      {
        "version": 2,
        "updatedAt": "2024-01-14T09:15:00Z",
        "examples": 4,
        "prompts": 3,
        "curriculum": true
      },
      {
        "version": 1,
        "updatedAt": "2024-01-13T16:45:00Z",
        "examples": 3,
        "prompts": 2,
        "curriculum": false
      }
    ],
    "currentState": {
      "updatedAt": "2024-01-20T15:30:00Z",
      "examples": 5,
      "prompts": 4,
      "curriculum": true
    }
  }
}
```

---

## 3. 템플릿 수정 (Update Template)

### 요청
```
PUT /api/v1/internal/course/description/templates/{templateKey}
```

### 파라미터
- `templateKey` (path): 템플릿 키

### 요청 본문
```json
{
  "jsonBody": "lz-string encoded CraftJS JSON",
  "originalTemplateJsonBody": "원본 CraftJS JSON 문자열",
  "examples": [
    "예제 1",
    "예제 2"
  ],
  "curriculum": {
    "name": "Curriculum Generation",
    "description": "설명",
    "content": "프롬프트"
  },
  "prompts": [
    {
      "id": "group_1",
      "description": "그룹 설명",
      "content": "프롬프트 내용",
      "textCount": 3
    }
  ]
}
```

### 응답
```json
{
  "code": "200",
  "message": "SUCCESS",
  "data": {
    "id": "ObjectId",
    "templateKey": "story",
    "promptCount": 4,
    "exampleCount": 5,
    "curriculum": {
      "name": "Curriculum Generation",
      "description": "설명",
      "content": "프롬프트"
    },
    "createdAt": "2024-01-13T10:00:00Z",
    "updatedAt": "2024-01-20T15:30:00Z"
  }
}
```

### 주의사항
- **모든 필드는 선택사항입니다**
- 전송하지 않은 필드는 기존 값이 유지됩니다
- 수정할 때마다 이전 버전이 히스토리에 자동으로 저장됩니다
- `jsonBody`는 lz-string으로 인코딩된 형식이어야 합니다

---

## 4. 템플릿 삭제 (Soft Delete)

### 요청
```
DELETE /api/v1/internal/description/templates/{templateKey}
```

### 파라미터
- `templateKey` (path): 템플릿 키

### 응답
```json
{
  "code": "200",
  "message": "template deleted successfully",
  "data": null
}
```

### 주의사항
- **Soft delete 방식** (deletedAt 타임스탬프 추가)
- 물리적으로 삭제되지 않으며 조회 시 제외됩니다

---

## 📝 히스토리 메타데이터 설명

### History Item Fields
- `version`: 버전 번호 (최신 버전이 가장 높은 숫자)
- `updatedAt`: 해당 버전으로 수정된 시간
- `examples`: 예제 개수
- `prompts`: 프롬프트 그룹 개수
- `curriculum`: 커리큘럼 설정 여부

---

## 🔄 버전 히스토리 아키텍처

### 저장 구조
```
CourseDescriptionTemplatePrompt Document {
  _id: ObjectId
  templateKey: "story"
  jsonBody: "lz-encoded JSON"           (현재 버전)
  originalTemplateJsonBody: "..."       (현재 버전의 원본)
  examples: [...]                       (현재 버전)
  prompts: [...]                        (현재 버전)
  curriculum: {...}                     (현재 버전)
  history: [                            (이전 버전들)
    {
      jsonBody: "lz-encoded JSON",
      originalTemplateJsonBody: "...",
      examples: [...],
      prompts: [...],
      curriculum: {...},
      updatedAt: "2024-01-15T14:20:00Z"
    },
    ...
  ]
  createdAt: "2024-01-13T10:00:00Z"
  updatedAt: "2024-01-20T15:30:00Z"    (최근 수정 시간)
}
```

### 동작 방식
1. 템플릿 생성 시: 새 문서 생성, history 배열 비어있음
2. 템플릿 수정 시:
   - 현재 상태(jsonBody, examples, prompts, curriculum)를 history 배열에 추가
   - 새로운 데이터로 현재 필드 업데이트
   - updatedAt 갱신
3. 히스토리 조회 시: history 배열의 모든 항목 반환

---

## ⚠️ 에러 응답

### 400 Bad Request
```json
{
  "code": "400",
  "message": "templateKey is required"
}
```

### 404 Not Found
```json
{
  "code": "404",
  "message": "template not found"
}
```

### 500 Internal Server Error
```json
{
  "code": "500",
  "message": "failed to get template"
}
```

---

## 🚀 구현 가이드

### Frontend에서의 사용 예시

```typescript
import { updateTemplatePrompt } from '@/hooks/useEditorData/templateService';
import { compressToBase64 } from 'lz-string';

// 프롬프트(템플릿) 수정
async function updatePrompt(
  templateKey: string,
  title: string,
  jsonBody: string,
  htmlBody: string
) {
  try {
    const compressedJsonBody = compressToBase64(jsonBody);

    const response = await updateTemplatePrompt(templateKey, {
      jsonBody: compressedJsonBody,
      originalTemplateJsonBody: jsonBody,
      examples: ['예제 1', '예제 2'],
      curriculum: {
        name: 'Curriculum Generation',
        description: '설명',
        content: '프롬프트'
      },
      prompts: [
        {
          id: 'group_1',
          description: '그룹 설명',
          content: '프롬프트 내용',
          textCount: 3
        }
      ]
    });

    console.log('템플릿 수정 성공:', response);
  } catch (error) {
    console.error('템플릿 수정 실패:', error);
  }
}
```

---

## 5. 템플릿 자동 생성 (Auto Create Template)

### 요청
```
POST /api/v1/internal/course/description/templates/auto
```

### 요청 본문
```json
{
  "craftJson": "CraftJS JSON 문자열",
  "templateKey": "story",
  "examples": [
    "예제 1",
    "예제 2"
  ],
  "prompts": [
    {
      "id": "group_1",
      "description": "그룹 설명",
      "content": "프롬프트 내용",
      "textCount": 3
    }
  ],
  "curriculum": {
    "name": "Curriculum Generation",
    "description": "설명",
    "content": "프롬프트"
  }
}
```

### 응답
```json
{
  "code": "200",
  "message": "SUCCESS",
  "data": {
    "id": "ObjectId",
    "templateKey": "story",
    "promptCount": 4,
    "exampleCount": 5,
    "curriculum": {
      "name": "Curriculum Generation",
      "description": "설명",
      "content": "프롬프트"
    },
    "createdAt": "2024-01-13T10:00:00Z",
    "updatedAt": "2024-01-13T10:00:00Z"
  }
}
```

### 설명
- CraftJS JSON을 기반으로 새로운 템플릿을 자동으로 생성합니다
- 필드는 모두 선택사항입니다
- 자동 생성 후 필요시 수정 API로 업데이트 가능

---

## 🔄 사용 플로우 예시

### 1. 템플릿 목록 조회
```
GET /api/v1/internal/course/description/templates
→ 모든 템플릿의 메타데이터 반환
```

### 2. 원하는 템플릿 선택 후 상세 조회
```
GET /api/v1/internal/course/description/templates/story
→ 프롬프트, 예제, 커리큘럼 등 전체 정보 반환
```

### 3. 필요시 변경 이력 확인
```
GET /api/v1/internal/course/description/templates/story/history
→ 모든 이전 버전의 메타데이터 반환
```

### 4. 템플릿 수정 (또는 자동 생성)
```
PUT /api/v1/internal/course/description/templates/story
POST /api/v1/internal/course/description/templates/auto

Content-Type: application/json

{
  "examples": [...],
  "prompts": [...],
  "curriculum": {...}
}
```

---

## 📚 참고사항

- 모든 요청은 인증이 필요합니다 (Bearer Token)
- Timezone: UTC를 사용합니다
- 응답 시간: 일반적으로 100-500ms 소요
- Rate Limiting: 분당 100 요청 제한
- `templateKey`는 영문 소문자로 제한됩니다 (예: story, problem, result)

---

⏺ **모든 API가 구현되었습니다!** ✅

**주요 특징:**
- 템플릿 목록 조회 (최신순 정렬)
- 템플릿 버전 히스토리 자동 추적
- 히스토리 조회 API 지원
- Soft delete 방식 적용
- 필드별 선택적 수정 가능
- CraftJSON 기반 자동 생성 지원
