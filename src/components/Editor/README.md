# Editor

## 알아야 될 것

- Editor 구조
- Editor 에 작성한 데이터 들고오는 방식
- Preprocessor
- 스타일 코드 동작 방식

### Editor 구조

**구조**
- Builder 컴포넌트: Craft.js 기반의 편집 환경을 제공하며, 외부 핸들러와 환경 값을 컨텍스트를 통해 전달합니다.
- Frame 컴포넌트: Craft.js의 프레임워크 내에서 레이아웃이나 인터페이스를 생성하고 관리하기 위한 기본적인 구조를 제공하며, 필요한 경우 데이터를 역직렬화하여 초기 상태를 설정합니다.
- resolver 컴포넌트 객체:
  - 여러 컴포넌트를 포함하는 객체로, Craft.js의 Editor 컴포넌트에서 사용할 수 있도록 설정이 필요하며 Builder 컴포넌트에서 세팅합니다.
  - Text, TwoColumnGrid, TwoToOneColumnGrid, OneToTwoColumnGrid, ImageText, InfoBox 등의 컴포넌트를 의미합니다.

**위계**
- Builder 컴포넌트
  - Frame 컴포넌트
    - resolver 컴포넌트

```tsx
<Builder>
  <Frame>
    <Text />
    <TwoColumnGrid />
    <TwoToOneColumnGrid />
    <OneToTwoColumnGrid />
    <ImageText />
    <InfoBox />
  </Frame>
</Builder>
```

**예제**
다음 prop을 반드시 전달해야 합니다.
- `editorImageUploader`
  - @inflearn/editor에서 사용될 이미지 업로드 api 함수입니다.
  - @inflearn/editor에서는 gif를 mp4로 변환하지 않기 때문에 이를 구현한 함수를 넘겨주어야 합니다.
  - 업로드 제한 용량은 3MB입니다.
  - type: `contents-builder`에서 export 하는 `ImageUploader`
    ```tsx
    type ImageUploader = (formData: FormData) => Promise<{url: string;}>
    ```
- `imageTextImageUploader`
  - 콘텐츠 빌더 내 ImageText 요소에서 사용될 이미지 업로드 api 함수입니다.
  - gif를 업로드시 mp4로 변환하는 로직이 포함되어야 합니다.
  - 업로드 제한 용량은 20MB입니다.
  - type: `contents-builder`에서 export 하는 `ImageUploader`
    ```tsx
    type ImageUploader = (formData: FormData) => Promise<{url: string;}>
    ```
- `videoUploadAPIUrl`
  - 비디오 업로드 api endpoint입니다.
  - type: string

```tsx
import type { ImageUploader } from 'contents-builder';

function ContentsBuilder({ page }: { page: ReactElement }) {
  const { courseId } = useCourseId();

  const editorImageUploader: ImageUploader = async (formData) => {
    const {
      data: { url = '' },
    } = await postImage({
      url: API_ENDPOINT.V1_COURSE_CONTENT_COURSEID_IMAGE_UPLOAD_EDITOR(courseId),
      variables: formData,
    });

    return { url };
  };

  const imageTextImageUploader: ImageUploader = async (formData) => {
    const {
      data: { url = '' },
    } = await postImage({
      url: API_ENDPOINT.V1_COURSE_CONTENT_COURSEID_IMAGE_UPLOAD(courseId),
      variables: formData,
    });

    return { url };
  };

  return (
    <Builder
      imageTextImageUploader={imageTextImageUploader}
      editorImageUploader={editorImageUploader}
      videoUploadAPIUrl={`https://course.devinflearn.com/api/v1/course-content/${courseId}/video-upload`}>
      <Header>
        <section className="content-description__actions">
          <Button variant="default" size="md" radius="md">
            버전 기록
          </Button>
          <Button variant="default" size="md" radius="md">
            미리보기
          </Button>
          <SaveButton />
        </section>
      </Header>
      {page}
    </Builder>
  );
}
```

## Editor 에 작성한 데이터 들고오는 방식

Builder 컴포넌트 내부에서 `useEditorData` 라는 hook 을 이용하여 데이터를 가져올 수 있습니다. 데이터 형태는 json, html 두가지 형태를 제공하며 json 은 리액트, html 은 리액트가 아닌 영역(ant-man)에 사용됩니다.

리액트에서는 craft.js 가 Builder 의 내용을 읽어 만들어주는 json 데이터를 리액트 컴포넌트에 그대로 사용하면 되지만 ant-man 에서는 json 데이터를 사용할 수 없습니다. 그렇기 때문에 json, html 2가지 형태를 전부 제공합니다.

## Preprocessor
React 프로젝트에선 조회할 때 필요한 UI 를 craft.js 에서 json 형태로 제공해주지만 ant-man 프로젝트에선 해당 json 값을 이용할 수 없습니다. 그래서 작성할 때의 UI 를 html 형태로 추출하고 직접 전처리기를 실행해서 조회할 때 필요한 UI 의 html 값을 생성합니다. 이때 필요한 전처리기가 Preprocessor 입니다.

`useEditorData` hook 의 `generateHTML` 함수에서 사용됩니다. 데이터 저장 시에 API 호출하기 전에 `generateHTML` 을 호출하고 만들어진 html 을 요청 값에 넣어서 보내게 됩니다.

**예제**
```tsx
const { generateHTML } = useEditorData();

const onClick = async () => {
  const html = generateHTML();

  await mutate({ html });
}
```

**구조**
Preprocessor는 `Preprocessor`라는 Abstract class를 기반으로 여러 자식 Preprocessor가 있고, 이를 `PreprocessPipe`에서 묶어서 `useEditorData`에서 html을 export 할 때 PreprocessPipe를 실행시킵니다.

**추가 방법**

1. `src/utils/HTMLPreprocessor` 폴더에 신규 Preprocessor 파일을 추가합니다.
2. `Preprocessor`를 extends 하는 class를 추가합니다.
3. `Preprocessor`에서 제공하는 메소드들을 구현합니다. ex)
```typescript
import Preprocessor from './Preprocessor';
import { ACTION_MENU_CLASS_NAME } from '../../components/LeftActionMenu/LeftActionMenu';

export default class ExamplePreprocess extends Preprocessor {
  constructor() {
    super();
    // html에서 찾아낼 요소의 css query를 설정합니다.
    this.query = `.${ACTION_MENU_CLASS_NAME}`;
  }

  // 위에서 설정한 css query를 기반으로 탐색된 요소들을 순회하면서 실행되는 callback을 설정합니다.
  protected preprocessCallback($element: HTMLElement): void {
    // 해당 요소에 할 작업을 이 부분에 작성합니다.
    $element.remove();
  }

  // 만약 필요하다면, preprocessCallback을 실질적으로 실행하는 exec 메소드를 다시 작성합니다.
  exec() {
    // something..
  }
}
```
4. 추가한 preprocessor를 `PreprocessPipe`에 추가합니다.
```typescript
// 각 역할에 맞는 Preprocessor Group에 등록합니다.
const blockPreprocessorGroup = [new ActionMenuPreprocessor(), new GridPreprocessor()];

const normalPreprocessorGroup = [new TextPreprocessor()];

const elementPreprocessorGroup = [
  new BoxPreprocessor(),
  new InfoBoxPreprocess(),
  new ImageTextPreprocess(),
  new VideoTextPreprocess(),
];

const preprocess = [...elementPreprocessorGroup, ...normalPreprocessorGroup, ...blockPreprocessorGroup];

// 이 로직에서 preprocess를 총합해서 실행시킵니다.
const preprocessPipe = (stringifyHTML: string) => {
  const htmlWrapper = document.createElement('div');
  htmlWrapper.innerHTML = stringifyHTML;
  let html: HTMLElement = htmlWrapper;

  preprocess.forEach((process) => {
    html = process.exec(html);
  });

  return html.innerHTML;
};

export default preprocessPipe;

```

### 스타일 코드

`src/` 내 모든 .scss 파일을 찾아서 하나의 index.scss 파일을 만듭니다.
해당 파일은 Editor 로 만들어진 글을 조회하는 곳에서 스타일을 적용시키기 위해 필요합니다.

![index.scss](../../../assets/style.png)

만들어진 index.scss 파일은 에디터를 사용하는 각 프로젝트에서 가져다가 사용하게 되고

각 프로젝트마다 script 를 통해 빌드 이후 .bin/after-roadmap-build.js 과 같은 코드를 동작시켜서 빌드 파일안에  css-mapper.json 파일을 추가하게 됩니다. 해당 파일은 빌드타임마다 변경되는 css파일명을 담고 있습니다. 앤트맨에서 해당 json 파일을 조회하여, 내부의 css 파일명에 요청을 보내어, contents-builder style을 적용합니다.

```script
"build:prod": "NEXT_PRIVATE_LOCAL_WEBPACK=true env-cmd -f .env.production next build && node ./bin/after-roadmap-build.js",
```

그리고 빌더를 조회하는 페이지에서 사용할 때는 아래와 같이 스타일 코드를 불러와서 사용하게 됩니다. 아래 예시는 ant-man 에서 스타일 코드를 들고오는 예시입니다.

![ant-man-style](../../../assets/style2.png)