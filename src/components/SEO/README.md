# SEO
seo는 html을 제공되어 있는 rule이나 직접 rule을 만들어, html이 조건에 부합하는지 검증할 수 있도록 설계된 라이브러리 입니다.

## 구조
seo는 기본적으로, rule과 checker로 이루어져 있습니다.  
rule과 checker를 근본으로 하는 hook, component들을 이용할 수 있습니다.

### SEORule
html을 검증할 때 사용하는 규칙입니다.  
라이브러리 측에서 제공하는 룰도 있고, 이로도 부족하면 사용자가 커스텀한 룰을 넣어서 이용할 수도 있습니다.  
html을 받아서 passed와 description을 반환하는 `check` method를 구현하여야 합니다.  
`check` method의 반환값 중`passed`는 이 rule이 통과 되었는지 여부를 뜻하고, `description`은 그에 따른 설명을 기술하면 됩니다.

```typescript
// 예시
class TestRule implements SEORule {
  check(html: string) {
    const hasHTML = !!html;
    return {
      description: hasHTML ? "테스트 룰을 통과했습니다." : '테스트 룰에 위배됩니다',
      passed: hasHTML,
    }
  }
}
```

### SEOChecker
rule들을 받아서, html을 실질적으로 체크하는 class입니다.  
사용처에서 rule과 checker를 선언하고, checker의 `run` method를 실행하는 구조로 되어 있습니다.  

`run` method는 `SEOCheckResult` 타입의 결과를 반환합니다.

```tsx
const SEOTester = ({ html: string }) => {
  const rules = {
    rule1: new TestRule(),
  }
  const checker = new SEOChecker(rules);
  const result = checker.run(html);

  return (
    <div>
      {Object.entries(result).map(([key, value]) => {
        return <div>
          <p>{key, value.passed ? '성공!' : '실패!'}</p>
          <p>{value.description}</p>
        </div>
      })}
    </div>
  )
}
```

## 사용법

이 seo를 사용하는 방법에는 4가지 방법이 있습니다.

### 클래스 그대로 이용
가장 기본적인 사용법으로, 위의 예시에서 구현된 것 처럼 `SEOChecker` class를 선언해 사용합니다.

```tsx
const SEOTester = () => {
  const html = getHTML();
  const rules = {/** rule의 구현체들*/}
  const checker = new SEOChecker(rules);
  const result = checker.run(html);

  return (
    <div>
      {Object.entries(result).map(([key, value]) => {
        return <div>
          <p>{key, value.passed ? '성공!' : '실패!'}</p>
          <p>{value.description}</p>
        </div>
      })}
    </div>
  )
}
```

### useSEOChecker
컴포넌트 제공 없이 기능만이 담겨져 있는 훅입니다.
hook의 매개변수에 룰들을 넘기면, 그에 맞는 `check` 함수가 제공됩니다.

```tsx
const SEOTester = () => {
  const html = getHTML();
  const rules = {/** rule의 구현체들*/}
  const { check } = useSEOChecker(rules);
  const result = check(html);
  return (
    <div>
      {
        /** result를 이용한 구현체 */
      }
    </div>
  )
}
```

### SEOHeadlessWrapper
headless 컴포넌트로 children에 `SEOCheckerResult`를 내려주는 컴포넌트를 넘겨주어 이용할 수 있습니다.


```tsx
const SEOTester = () => {
  const html = getHTML();
  const rules = {/** rule의 구현체들*/}
  return (
    <SEOHeadlessWrapper rules={rules} content={html}>
      ({ result, updateSeo }) => {
        return (
          /** 구현 */
        )
      }
    </SEOHeadlessWrapper>
  )
}
```

### SEOMenu
rule과 html만 있으면 이용할 수 있는 view가 포함된 seo component로, 로드맵 빌더와 강의 콘텐츠 빌더에서 이용하는 형태입니다.  
조합형 컴포넌트로 구성되어있고, `useSEOResultContext` 훅을 이용해서 커스텀 컴포넌트를 제작할 수 있습니다.  
SEOMenu에서 context로 값을 들고 있고, 그 context를 내부의 컴포넌트에서 가져다 사용하는 형태입니다.  
**주의**
hover card 형태 이외로 사용해야 하면 위의 방법들을 사용해 주세요.

#### SEOHoverTarget
hover card의 target으로, 내부에 값이 없을 경우 기본 컴포넌트가 제공됩니다.
커스텀 컴포넌트 이용을 원할 시에 SEOHoverTarget의 children으로 prop을 넘겨주면 됩니다.
기본 컴포넌트를 커스텀 하고 싶으시다면, `SEOHoverDefaultHoverTarget`을 children으로 넘겨주세요.

**주의**  
hover card와 동일선상에 두기 위해서 zIndex가 301로 설정되어 있습니다.   
개발에 주의가 필요합니다.


#### SEOHoverDropdown
hover card의 Dropdown부분으로, 내부의 값이 없을 경우 기본 컴포넌트가 제공됩니다.
커스텀 컴포넌트 이용을 원할 시에 `SEOHoverDropdown`의 children으로 prop을 넘겨주면 됩니다.
기본 컴포넌트를 커스텀 하고 싶으시다면, `SEOHoverDefaultDropdown`을 children으로 넘겨주세요.

```tsx
  // 기본적인 사용법
  const SEOTester = () => {
    const html = getHTML();
    const rules = {/** rule의 구현체들*/}
    return (
      <SEOMenu rules={rules} content={html}>
      {/** hoverTarget과 hoverDropdown에 children을 넘기지 않을 경우 기본 컴포넌트 사용됨 */}
        <SEOHoverTarget />
        <SEOHoverDropdown />
      </SEOMenu>
    )
  }

  // 커스텀 컴포넌트 이용법
  const SEOTester2 = () => {
    const html = getHTML();
    const rules = {/** rule의 구현체들*/}

    return (
      <SEOMenu>
      {/** hover card target 영역 */}
        <SEOHoverTarget>
          <CustomHoverTarget />
        </SEOHoverTarget> 
        {/** hover card dropdown 영역 */}
        <SEOHoverDropdown>
          <CustomHoverCard />
        </SEOHoverDropdown>
      </SEOMenu>
    )
  }

// 커스텀 hover target 선언
  const CustomHoverTarget =  () => {
    const { result, retry } = useSEOResultContext();

    return (
      <div>
        {result.testRule.passed ? 'passed' : 'failed'}
      </div>
    )
  }

// 커스텀 hover card 선언
  const CustomHoverCard = () => {
    const { result, retry } = useSEOResultContext();

    return (
      <div>
        {Object.entries(result).map((key, value) => {
          return <div>
            <p>{key} {value.passed}</p>
            <p>{value.description}</p>
          </div>
        })}
      </div>
    )
  }
```
