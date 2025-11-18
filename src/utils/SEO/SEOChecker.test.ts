import { SEOChecker } from './SEOChecker';
import type { SEORule } from './SEORule';

describe('SEOChecker', () => {
  it('SEOChecker에 넣은 rules를 모두 실행하고, 그에 따른 결과를 반환한다.', () => {
    const checker = new SEOChecker({ stub1: new StubRule1(), stub2: new StubRule2() });
    const result = checker.run('');
    expect(result).toEqual({
      stub1: {
        passed: true,
        description: '',
      },
      stub2: {
        passed: false,
        description: '',
      },
    });
  });
});

class StubRule1 implements SEORule {
  check() {
    return {
      passed: true,
      description: '',
    };
  }
}

class StubRule2 implements SEORule {
  check() {
    return {
      passed: false,
      description: '',
    };
  }
}
