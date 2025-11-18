import { filterNodesWithResolver } from './filterNodesWithResolver';

const emptyStub = '{}';

describe('filterNodesWithResolver', () => {
  it('null값이 들어오면 그대로 반환한다', () => {
    expect(filterNodesWithResolver(null)).toBe(null);
  });

  it('빈 json값을 넣으면 빈 json을 그대로 반환한다', () => {
    expect(filterNodesWithResolver(emptyStub)).toBe(emptyStub);
  });

  it('resolver에 등록되어 있는 type을 가진 node는 stringify json을 반환한다', () => {
    const stubResolver = {
      test1: 'test1',
    };
    const stub = JSON.stringify({
      test1: {
        type: {
          resolvedName: 'test1',
        },
        props: {},
        displayName: 'test1',
        parent: 'ROOT',
        nodes: [],
      },
    });

    const result = filterNodesWithResolver(stub, stubResolver);
    expect(result).toBe(stub);
  });

  it('resolver에 등록되어 있지 않은 type을 가진 node는 stringify json에 포함되지 않는다.', () => {
    const stubResolver = {
      test2: 'test2',
    };
    const stub = JSON.stringify({
      test1: {
        type: {
          resolvedName: 'test1',
        },
        props: {},
        displayName: 'test1',
        parent: 'ROOT',
        nodes: [],
      },
    });

    const result = filterNodesWithResolver(stub, stubResolver);

    expect(result).toBe(emptyStub);
  });
});
