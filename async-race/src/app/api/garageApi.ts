// import { CarType } from '@helpers/types';
import { CreateCarType, deleteData, getData, postData, putData } from './request';
import { ResponseType, objectToUrlParams, parseResponse } from './shared';

const ENDPOINT = 'http://localhost:3000/garage/';

export type GetCarsType = {
  _page?: number;
  _limit?: number;
};

export type CarType = {
  name: string;
  color: string;
  id: number;
};

export const getCars = async (options: GetCarsType): Promise<ResponseType<CarType[]>> => {
  const response = await getData(ENDPOINT, objectToUrlParams<GetCarsType>(options));

  return parseResponse<CarType[]>(response);
};

export const createCar = async (data: CreateCarType): Promise<ResponseType<CreateCarType>> => {
  const response = await postData(ENDPOINT, data);

  return parseResponse<CreateCarType>(response);
};

export const updateCar = async (id: number, data: CreateCarType): Promise<ResponseType<CreateCarType>> => {
  const response = await putData(ENDPOINT, id, data);

  return parseResponse<CreateCarType>(response);
};

export const deleteCar = async (id: number): Promise<ResponseType<CreateCarType>> => {
  const response = await deleteData(ENDPOINT, id);
  return parseResponse<CreateCarType>(response);
};
