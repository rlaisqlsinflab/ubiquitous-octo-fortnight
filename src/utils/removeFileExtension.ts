export function removeFileExtension(filePath: string): string {
  const lastDotIndex = filePath.lastIndexOf('.');

  if (lastDotIndex === -1 || lastDotIndex === filePath.length - 1) {
    return filePath;
  }

  return filePath.slice(0, lastDotIndex);
}
