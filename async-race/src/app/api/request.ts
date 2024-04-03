export enum RequestMethods {
  'GET' = 'GET',
  'POST' = 'POST',
  'PUT' = 'PUT',
  'PATCH' = 'PATCH',
}

export type CreateCarType = {
  name: string;
  color: string;
};

export type CreateWinnerType = {
  id: number;
  wins: number;
  time: number;
};

export const getData = (url: string, options?: URLSearchParams | number): Promise<Response> => {
  if (options && options instanceof URLSearchParams) {
    return fetch(`${url}?${options.toString()}`, { method: RequestMethods.GET });
  }

  if (options && typeof options === 'number') {
    return fetch(`${url}${options.toString()}`, { method: RequestMethods.GET });
  }

  return fetch(url, { method: RequestMethods.GET });
};

export const postData = (url: string, data: CreateCarType | CreateWinnerType): Promise<Response> =>
  fetch(url, {
    method: RequestMethods.POST,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const putData = (url: string, id: number, data: CreateCarType): Promise<Response> =>
  fetch(`${url}${id}`, {
    method: RequestMethods.PUT,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const patchData = (url: string, options?: URLSearchParams): Promise<Response> => {
  if (options) {
    return fetch(`${url}?${options.toString()}`, { method: RequestMethods.PATCH });
  }
  return fetch(url, { method: RequestMethods.PATCH });
};

export const deleteData = (url: string, id: number): Promise<Response> => fetch(`${url}${id}`, { method: 'DELETE' });
