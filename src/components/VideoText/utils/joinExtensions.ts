export const joinExtensions = (extensions: string[]) => {
  return extensions
    .map((extension) => {
      return `.${extension}`;
    })
    .join(', ');
};
