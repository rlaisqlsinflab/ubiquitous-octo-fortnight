import { joinExtensions } from './joinExtensions';

describe('joinExtensions', () => {
  it('문자열 배열을 전달하면 확장자 형태로 조인한 결과를 반환합니다.', () => {
    const extensions = ['mp4', 'm4v', 'quicktime', 'mov'];

    expect(joinExtensions(extensions)).toBe('.mp4, .m4v, .quicktime, .mov');
  });
});
