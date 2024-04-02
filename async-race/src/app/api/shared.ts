export type ResponseType<T> = {
  data: T;
  status?: number;
  headers?: Headers;
};

export const objectToUrlParams = <T>(queryData: T): URLSearchParams => {
  const searchParams = new URLSearchParams();

  Object.entries(queryData as object).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });

  return searchParams;
};

export const parseResponse = async <T>(response: Response): Promise<ResponseType<T>> => {
  const data: T = (await response.json()) as T;
  const { headers, status } = response;

  return { data, status, headers };
};
