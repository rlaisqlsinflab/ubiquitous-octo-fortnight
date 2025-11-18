export function readableFileSize(bytes: number) {
  return bytes > 1024 ** 3
    ? `${parseFloat((bytes / 1024 ** 3).toFixed(1))}GB`
    : bytes > 1024 ** 2
    ? `${parseFloat((bytes / 1024 ** 2).toFixed(1))}MB`
    : bytes > 1024
    ? `${parseFloat((bytes / 1024).toFixed(1))}KB`
    : `${bytes}B`;
}
