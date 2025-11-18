export const getVimeoId = (url: string): string | null => {
  const urlObject = new URL(url);
  const pathname = urlObject.pathname;

  if (/^\/.*/.test(pathname)) {
    return pathname.split('/').pop() || null;
  }

  return null;
};
