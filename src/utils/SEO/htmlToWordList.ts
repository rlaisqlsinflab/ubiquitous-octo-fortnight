export const htmlToWordList = (html: string): string[] => {
  const htmlTagRemovedValue = html.replaceAll(/(<([^>]+)>)/gi, '\n');

  const multipleLineBreakRemovedValue = htmlTagRemovedValue.replaceAll(/\n{2,}/g, '\n');
  const wordList = multipleLineBreakRemovedValue
    .split('\n')
    .map((group) => group.split(' '))
    .flat();

  return wordList.filter((word) => word !== '');
};
