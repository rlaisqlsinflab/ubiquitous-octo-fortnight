export const getYoutubeId = (url: string): string | null => {
  const urlObject = new URL(url);
  const pathname = urlObject.pathname;

  const searchParams = new URLSearchParams(urlObject.search);
  const id = searchParams.get('v');

  if (id) {
    return id;
  }

  if (/\/shorts\//.test(pathname)) {
    return pathname.split('/').pop() || null;
  }

  if (/\/(embed)|(v)\//.test(pathname)) {
    return pathname.split('/').pop() || null;
  }

  if (/\/.+/.test(pathname)) {
    return pathname.split('/')[1];
  }

  return null;
};
