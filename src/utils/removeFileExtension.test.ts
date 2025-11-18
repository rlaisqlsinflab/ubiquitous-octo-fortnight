import { removeFileExtension } from './removeFileExtension';

describe('removeFileExtension', () => {
  it('파일 확장자를 제거한 문자열을 반환한다.', () => {
    const filePath = 'document.docx';
    expect(removeFileExtension(filePath)).toBe('document');
  });

  it('파일 확장자가 없으면 그대로 반환한다.', () => {
    const filePath = 'fileWithoutExtension';
    expect(removeFileExtension(filePath)).toBe(filePath);
  });

  it('마지막 점이 경로의 끝에 위치하면 그대로 반환한다.', () => {
    const filePath = 'path/with.dot.';
    expect(removeFileExtension(filePath)).toBe(filePath);
  });
});
