import { SHORT_URL_DOMAIN } from '../../appConfig';

interface WrapLinkBatch {
  url: string;
  set_referrer: boolean;
}

interface FetchWrapLinksResponse {
  data: {
    [key: string]: string;
  };
}

export const fetchWrapLinks = async (urls: WrapLinkBatch[]) => {
  const response = await fetch(`${SHORT_URL_DOMAIN}/batch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    credentials: 'include',
    body: JSON.stringify(urls),
  });

  const { data } = (await response.json()) as FetchWrapLinksResponse;

  return data;
};
