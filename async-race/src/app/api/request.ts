export enum RequestMethods {
  'GET' = 'GET',
  'POST' = 'POST',
}

export type CreateCarType = {
  name: string;
  color: string;
};

export const getData = (url: string, options?: URLSearchParams): Promise<Response> => {
  if (options) {
    return fetch(`${url}?${options.toString()}`, { method: RequestMethods.GET });
  }
  return fetch(url, { method: RequestMethods.GET });
};

export const postData = (url: string, data: CreateCarType): Promise<Response> =>
  fetch(url, {
    method: RequestMethods.POST,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
