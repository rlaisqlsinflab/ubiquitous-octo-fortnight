# 템플릿 매니저 컴포넌트 사용법

- [사용법](#사용법)
  - [`<TemplateManager />` prop 명세](#templatemanager--prop-명세)
  - [1. 템플릿 매니저 초기 세팅](#1-템플릿-매니저-초기-세팅)
    - [`useTemplateManager`](#usetemplatemanager)
    - [type `TemplatePanelMode`](#type-templatepanelmode)
  - [2. basic, my 템플릿 쿼리 작성 및 전달](#2-basic-my-템플릿-쿼리-작성-및-전달)
  - [3. my 템플릿 mutation 작성 및 전달](#3-my-템플릿-mutation-작성-및-전달)
- [API](#api)
  - [템플릿 데이터](#템플릿-데이터)
    - [1. 서버에 저장된 템플릿 데이터:](#1-서버에-저장된-템플릿-데이터)
    - [2. 템플릿 데이터의 메타 정보](#2-템플릿-데이터의-메타-정보)
  - [이벤트 콜백 API](#이벤트-콜백-api)
    - [onOpenMyTemplateSaveModal](#onopenmytemplatesavemodal)
    - [onTemplateManagerOpened](#ontemplatemanageropened)
    - [onClickCreateMyTemplateButton](#onclickcreatemytemplatebutton)
    - [onApplyTemplate](#onapplytemplate)
- [FAQ](#faq)
  - [마케팅 스크립트](#마케팅-스크립트)
  - [my 템플릿 생성 모달 열기](#my-템플릿-생성-모달-열기)


`@inflearn/contents-builder`에서는 Block으로 작성한 콘텐츠의 양식을 **템플릿**이라는 개념으로 저장하고 사용할 수 있게 하는 **템플릿 매니저** 기능을 지원합니다.

`<TemplateManager />` 컴포넌트를 비롯한 관련 API 사용 방법을 확인해보세요.

## 사용법
템플릿 매니저는 디자인 시스템 Drawer를 이용해 오른쪽에 패널이 열리는 UI로 제공됩니다. `<TemplateManager />` 컴포넌트를 사용해 템플릿 매니저를 추가하세요.

### `<TemplateManager />` prop 명세
각 prop은 아래에서 더 자세하게 설명합니다.

| Props                         | Required | Type                                                         | Default | Description |
|-------------------------------|:-:|---------------------------------------------------------------------|-------|-------------|
| **style & Drawer component props**|   |                                                                     |       |  |
| topGap                        | X | `number`                                                            |  0    |템플릿 패널의 top margin |
| withinPortal                  | X | `boolean` &vert; `HTMLElement`                                      | false |템플릿 패널을 Portal로 렌더링할지 유무 |
| portalTarget                  | X | `string` &vert; `HTMLElement`                                       | root div |withinPortal true일 때 portal target 지정|
| portalProps                   | X | Omit<PortalProps, "children" &vert; "target" &vert; "withinPortal"> |       |withinPortal true일 때 portal 설정 전달|
| **foundations**               |   |                                                                     |       |  |
| mode                          | O | `TemplatePanelMode`                                                 |       |템플릿 패널의 현재 탭 |
| changeMode                    | O | `ChangeMode`                                                        |       |템플릿 패널의 현재 탭 전환 함수 |
| opened                        | O | `boolean`                                                           |       |템플릿 패널의 열림 여부 |
| inflabTemplatesMetadata        | O | `inflabTemplatesMetadata: InflabTemplatesContextType['templatesMetadata'];`                                            |       |inflab 템플릿 메타 정보 - 템플릿 썸네일 컴포넌트, 템플릿별 미리보기 노출 여부를 결정합니다. |
| inflabTemplatesResponse        | O | `TemplatesQueryResponse`                                            |       |inflab 템플릿 목록 쿼리 결과 |
| myTemplatesResponse           | O | `TemplatesQueryResponse`                                            |       |my 템플릿 목록 쿼리 결과 |
| createTemplate                | O | `CreateTemplate`                                                    |       |새로운 템플릿을 생성하는 API 리액트쿼리 mutateAsync |
| updateTemplate                | O | `UpdateTemplate`                                                    |       |템플릿 이름을 업데이트하는 API 리액트쿼리 mutateAsync |
| deleteTemplate                | O | `DeleteTemplate`                                                    |       |템플릿을 삭제하는 API 리액트쿼리 mutateAsync |
| **event callbacks**           |   |                                                                     |       |  |
| onOpenMyTemplateSaveModal     | X | `() => void`                                                        |       |my 템플릿 저장 모달이 열릴 때 실행시킬 콜백 함수를 전달합니다.|
| onTemplateManagerOpened       | X | `() => void`                                                        |       |템플릿 매니저 패널이 열릴 때 실행시킬 콜백 함수를 전달합니다.|
| onClickCreateMyTemplateButton | X | `(templateTitle: string) => void`                                   |       |my 템플릿 제출 버튼을 클릭할 때 실행시킬 콜백 함수를 전달합니다.|
| onApplyTemplate               | X | `(isInflabTemplate: boolean, templateTitle: string) => void`         |       |템플릿을 적용할 때 실행시킬 콜백 함수를 전달합니다. |

다음 단계를 따라 `<TemplateManager />` 컴포넌트를 구성하세요.

### 1. 템플릿 매니저 초기 세팅
템플릿 매니저는 운영팀에서 작성한 basic 템플릿과, 유저가 직접 작성한 my 템플릿을 탭으로 제공합니다. 

제공되는 `useTemplateManager` 훅을 사용해 템플릿 매니저의 **초기 탭을 설정**하고, 탭의 열림 상태에 접근하세요. 

훅에서 제공하는 `changeMode`를 이용해 특정 UI에 템플릿 매니저를 열고 닫는 이벤트를 등록할 수 있습니다.

```tsx
// 기본 탭으로 열고 닫기를 토글하는 UI
const { mode, changeMode } = useTemplateManager({
  defaultMode: 'my'
});

return (
  <Button onClick={() => {
    if (mode === 'close') {
      changeMode('my');
      return;
    }
    changeMode('close');
  }} />
)

// 특정 탭으로 여는 UI
const { changeMode } = useTemplateManager({
  defaultMode: 'my'
});

return (
  <Button onClick={() => changeMode('inflab')} />
)
```

그리고 훅에서 반환하는 값들을 `<TemplateManager />` 컴포넌트의 prop으로 전달합니다.

```tsx
const Example = () => {
  const templateManagerValues = useTemplateManager({
    defaultMode: 'my';
  });
  
  return (
    <TemplateManager 
      {...templateManagerValues}
    />
  )
}
```

#### `useTemplateManager`
|필수값|파라미터 명   |타입                |기본값 |설명                 |
|----|-----------|-------------------|-----|--------------------|
|X   |defaultMode|`TemplatePanelMode`|basic|탭의 초기 값을 설정합니다.|


|리턴 값     |타입|기본값|설명|
|----------|--------------------------------------|-----|------------|
|mode      |`TemplatePanelMode`                   |basic|현재 열려있는 탭|
|changeMode|`ChangeMode = (newMode: TemplatePanelMode) => void`| -   |현재 열려있는 탭을 전환하는 함수|
|opened    |boolean                               |basic|패널의 열림 유무|

#### type `TemplatePanelMode`
- `my`: 유저가 작성한 템플릿
- `basic`: 운영팀에서 작성한 템플릿
- `close`: 템플릿 닫힘 상태


### 2. basic, my 템플릿 쿼리 작성 및 전달
각 서비스 API를 이용해 basic 템플릿과 my 템플릿을 요청하는 쿼리를 작성하고, 그 결과를 `TemplatesQueryResponse`로게 만들어서 넘겨주세요.

```tsx
type TemplatesQueryResponse = {
  templatesPagination: TemplatesPagination;
  isInitialLoading: boolean;
  isError: boolean;
  refetch: () => void;
  error: unknown;
};
```

API의 응답 스펙은 `TemplatesPagination`과 반드시 같아야 합니다.

```tsx
type TemplatesPagination = {
    pageNumber: number;
    totalPage: number;
    pageSize: number;
    totalCount: number;
    items?: {
        createdAt: string;
        htmlBody: string;
        authorType: CourseContentTemplateAuthorType;
        jsonBody: string;
        id: number;
        title: string;
    }[] | undefined;
}
```

아래는 강의 소개글 빌더에서 basic 템플릿을 쿼리하는 코드 예제입니다.
```tsx
  // NOTE: 쿼리가 호출되면, 이 파일은 다시 렌더링되며
  const inflabTemplateQuery = useV1CourseContentTemplateQuery({
    queryKey: [API_ENDPOINT.V1_COURSE_CONTENT_TEMPLATE, CourseContentTemplateAuthorType.INFLAB],
    url: `${API_ENDPOINT.V1_COURSE_CONTENT_TEMPLATE}?${new URLSearchParams({
      authorType: CourseContentTemplateAuthorType.INFLAB,
    })}`,
    options: {
      // NOTE: opened 값과 mode 값을 이용해 패널 열릴때만 쿼리할 수 있습니다.
      enabled: opened && mode === 'inflab',
      staleTime: ONE_MINUTE,
    },
  });

  // NOTE: 값이 다시 계산됩니다.
  const inflabTemplatesResponse = {
    templatesPagination: inflabTemplateQuery.data,
    isInitialLoading: inflabTemplateQuery.isInitialLoading,
    isError: inflabTemplateQuery.isError,
    refetch: () => inflabTemplateQuery.refetch,
    error: inflabTemplateQuery.error
  }
  
  // NOTE: 다시 계산된 값이 전달되어 업데이트된 값으로 렌더링됩니다.
  return (
    <TemplateManager 
      mode={mode} 
      changeMode={changeMode} 
      // here
      inflabTemplatesResponse={inflabTemplatesResponse} 
    />
  )
```
### 3. my 템플릿 mutation 작성 및 전달
템플릿 매니저에서 my 템플릿은 생성,삭제 및 이름 수정 기능을 지원합니다. 이를 위해 사용처에서 mutation 함수를 반드시 props로 넘겨주어야 합니다. 템플릿 매니저는 전달받은 mutation 함수를 템플릿 매니저만 알 수 있는 템플릿 관련 값과 함께 호출하고, 템플릿과 관련된 성공/실패 후처리를 수행합니다. 그외 모든 것은 사용처에서 정의하여 props로 넘겨주면 됩니다.

|props|required|type|description|
|-----|--------|----|-----------|
|`createTemplate`     |O|`CreateTemplate = (title: string) => Promise<void>`|새로운 템플릿을 생성하는 API 리액트쿼리 mutateAsync|
|`updateTemplate`     |O|`UpdateTemplate = (title: string, templateId: number) => Promise<void>`|템플릿 이름을 업데이트하는 API 리액트쿼리 mutateAsync|
|`deleteTemplate`     |O|`DeleteTemplate = (templateId: number) => Promise<void>;`|템플릿을 삭제하는 API 리액트쿼리 mutateAsync|

- mutation은 반드시 `mutateAsync`를 사용해야합니다.
  - `onSuccess`, `onFail`과 같은 option을 따로 작성하지 않아도 됩니다.
- 템플릿과 관련된 success, fail 후처리는 라이브러리에서 담당합니다. 템플릿과 관련없는 성공 후 로직, 에러 처리 로직은 사용처에서 작성하면 됩니다.
  - 템플릿 매니저에서 담당하는 후처리
    - success: 성공 노티피케이션 노출
    - error: 에러 노티피케이션 노출
    - 공통: 모달 닫기

아래는 강의 소개글 빌더에서의 코드 예시입니다.

```tsx
// 템플릿 생성
const { mutateAsync: createTemplate } =
useV1CourseContentTemplateCreateMutation({
  url: API_ENDPOINT.V1_COURSE_CONTENT_TEMPLATE,
});

const handleCreateTemplate = async (title) => {
  try {
    await createTemplate({
      title,
      courseId,
      jsonBody: generateJsonBody(),
      htmlBody: generateHtmlBody(),
    })
    // 성공 노티피케이션은 템플릿 매니저가 띄웁니다.
    // 성공 후 템플릿 리스트를 다시 불러오는 것은 사용처에서 진행합니다.
    queryClient.invalidateQueries(myTemplatesQueryKey);
  } catch (error) {
    // 템플릿과 관련없는 사용처만의 에러가 throw됩니다. 이 에러를 잡아 에러처리 하세요.
  }
}

// 템플릿 수정
const { mutateAsync: updateTemplate } = useV1CourseContentTemplateIdUpdateMutation({
  url: API_ENDPOINT.V1_COURSE_CONTENT_TEMPLATE_ID,
});

const handleUpdateTemplate = async (title, id) => {
  try {
    await updateTemplate(title, id);
    // 성공 노티피케이션은 템플릿 매니저가 띄웁니다.
    // 성공 후 템플릿 리스트를 다시 불러오는 것은 사용처에서 진행합니다.
    queryClient.invalidateQueries(myTemplatesQueryKey);
    } catch (error) {
      // 템플릿과 관련없는 사용처만의 에러가 throw됩니다. 이 에러를 잡아 에러처리 하세요.
    }
  }
}

// 템플릿 삭제
const { mutateAsync: deleteTemplate } = useV1CourseContentTemplateIdDeleteMutation({
  url: API_ENDPOINT.V1_COURSE_CONTENT_TEMPLATE_ID,
});

const handleDeleteTemplate = async (id) => {
  try {
    await deleteTemplate(id);
    // 성공 노티피케이션은 템플릿 매니저가 띄웁니다.
    // 성공 후 템플릿 리스트를 다시 불러오는 것은 사용처에서 진행합니다.
    queryClient.invalidateQueries(myTemplatesQueryKey);
  } catch (error) {
    // 템플릿과 관련없는 사용처만의 에러가 throw됩니다. 이 에러를 잡아 에러처리 하세요.
  }
}

return (
  <TemplateManager 
    ...
    // my 템플릿 mutation 이벤트 전달
    createTemplate={handleCreateTemplate}
    updateTemplate={handleUpdateTemplate}
    deleteTemplate={deleteTemplate}
  />
)
```


## API

### 템플릿 데이터

템플릿 매니저는 inflab 템플릿, my 템플릿 두 가지 카테고리를 탭으로 제공합니다.

- inflab 템플릿: 운영팀이 작성한 템플릿으로 유저에게 기본으로 제공되는 템플릿.
- my 템플릿: 지식공유자 또는 학습자가 작성한 템플릿. 서비스(강의/멘토링/로드맵 등) 간 공유되지 않습니다.

템플릿 매니저를 사용하기 위해서는 각 카테고리 별로 두 가지 데이터를 반드시 넘겨주어야 합니다.

#### 1. 서버에 저장된 템플릿 데이터: 
API 패칭을 통해 받아온 템플릿 데이터를 아래 타입 `TemplatesPagination`을 준수하여 가공해서 템플릿 매니저에 넘겨주세요.  
`inflabTemplatesResponse`, `myTemplatesResponse`prop의 `templatesPagination` 프로퍼티를 통해 전달됩니다.

```ts
export const enum TemplateAuthorType {
  'INFLAB' = 'INFLAB',
  'MY' = 'MY',
}

export type AuthorType = keyof typeof TemplateAuthorType;

export type Template = {
  createdAt: string;
  htmlBody: string;
  authorType: AuthorType;
  /**
   * decompress되지 않은 상태, 압축되어 서버에 저장된 상태 그대로 전달해주어야 합니다. 
   */
  jsonBody: string;
  id: number;
  title: string;
};

export type TemplatesPagination = {
  pageNumber: number;
  totalPage: number;
  pageSize: number;
  totalCount: number;
  items?: Template[] | undefined;
};
```
#### 2. 템플릿 데이터의 메타 정보
템플릿 매니저는 템플릿 제목을 기준으로 API 패칭을 통해 받아온 템플릿 데이터와 메타 정보를 대조하여 패널에서 템플릿 썸네일 UI와 템플릿 미리보기를 노출합니다.

[1번](#1-서버에-저장된-템플릿-데이터)의 데이터 중 `title`값을 기준으로 메타 정보 배열을 만들어 `inflabTemplatesMetadata` prop으로 넘겨주세요.

```ts
type InflabTemplatesMetadata = {
  /**
   * @description 믹스패널 데이터가 ~형을 제외한 값으로 수집되고 있어서, "기본형"이 제목인 경우 "기본"으로만 전달.
   * 서버에 저장된 title과 동일한 값이어야 합니다. title을 기준으로 thumbnail, showPreview값이 적용됩니다.
   */
  title: string;
  /**
   * 템플릿 적용 버튼에 표시될 썸네일 UI
   */
  thumbnail: ReactNode;
  /**
   * 템플릿 미리보기를 보여줄지 여부
   */
  showPreview: boolean;
}[];

```

### 이벤트 콜백 API

#### onOpenMyTemplateSaveModal
type: `() => void;`  
description: 유저 템플릿 저장 모달이 열릴 때 실행시킬 콜백 함수를 전달합니다.

#### onTemplateManagerOpened
type: `() => void;`  
description: 템플릿 매니저 패널이 열릴 때 실행시킬 콜백 함수를 전달합니다.

#### onClickCreateMyTemplateButton
type: `(templateTitle: string) => void;`  
description: 새로운 유저 템플릿 생성 모달에서 제출 버튼을 클릭할 때 실행시킬 콜백 함수를 전달합니다.

#### onApplyTemplate
type: `(isInflabTemplate: boolean, templateTitle: string) => void;`  
description: 템플릿을 적용할 때 실행시킬 콜백 함수를 전달합니다.

## FAQ

### 마케팅 스크립트
[이벤트 콜백 API](#이벤트-콜백-api)를 참고하여 마케팅 스크립트를 적절한 이벤트 콜백에 전달해 호출하세요

### my 템플릿 생성 모달 열기

특정 버튼에서 my 템플릿을 생성하는 모달을 열어야할 경우, 다음과 같이 할 수 있습니다.

```tsx
const { myTemplateCreateModalHandler } = useTemplateManager({
  defaultMode: 'my';
});

return (
  <Button onClick={myTemplateCreateModalHandler.open} />
)
```