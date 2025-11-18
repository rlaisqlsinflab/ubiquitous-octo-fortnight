/**
 * 파일 업로드 요청
 * https://stackoverflow.com/a/69400632/7029796
 */
export const requestUpload = <Response>({
  method,
  url,
  file,
  onLoadStart,
  onProgress,
}: {
  method: 'POST';
  url: string;
  file: File;
  onLoadStart?: () => void;
  onProgress?: (progress: number) => void;
}) => {
  const xhr = new XMLHttpRequest();

  return new Promise<{
    success: boolean;
    data: Response;
    event: ProgressEvent<XMLHttpRequestEventTarget>;
  }>((resolve) => {
    const upload = xhr.upload;
    const formData = new FormData();

    upload.addEventListener('loadstart', () => {
      onLoadStart && onLoadStart();
    });

    upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        onProgress && onProgress(event.loaded / event.total);
      }
    });

    xhr.addEventListener('loadend', (event) => {
      resolve({
        success: xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
        data: JSON.parse(xhr.response || '{}'),
        event,
      });
    });

    xhr.open(method, url, true);
    xhr.withCredentials = true;

    formData.append('file', file);

    xhr.send(formData);
  });
};
