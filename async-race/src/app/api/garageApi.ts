// import { CarType } from '@helpers/types';
import { CreateCarType, getData, postData } from './request';

const ENDPOINT = 'http://localhost:3000/garage/';

export type GetCarsType = {
  _page?: number;
  _limit?: number;
};

export type ResponseType<T> = {
  data: T;
  status?: number;
  headers?: Headers;
};

export type CarType = {
  name: string;
  color: string;
  id: number;
};

export const objectToUrlParams = (queryData: GetCarsType): URLSearchParams => {
  const searchParams = new URLSearchParams();

  Object.entries(queryData).forEach(([key, value]) => {
    searchParams.append(key, value.toString());
  });

  return searchParams;
};

export const parseResponse = async <T>(response: Response): Promise<ResponseType<T>> => {
  const data: T = (await response.json()) as T;
  const { headers, status } = response;

  return { data, status, headers };
};

export const getCars = async (options: GetCarsType): Promise<ResponseType<CarType[]>> => {
  const response = await getData(ENDPOINT, objectToUrlParams(options));

  return parseResponse<CarType[]>(response);
};

export const createCar = async (data: CreateCarType): Promise<ResponseType<CreateCarType>> => {
  const response = await postData(ENDPOINT, data);

  return parseResponse<CreateCarType>(response);
};
