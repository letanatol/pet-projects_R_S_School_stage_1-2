// import { CarType } from '@helpers/types';
import { WinnerType } from '../helpers/types';
import { CreateCarType, CreateWinnerType, deleteData, getData, postData, putData } from './request';
import { ResponseType, objectToUrlParams, parseResponse } from './shared';

const ENDPOINT = 'http://localhost:3000/winners/';

export type GetWinnersType = {
  _page?: number;
  _limit?: number;
  _sort?: 'id' | 'wins' | 'time';
  _order?: 'ASC' | 'DESC';
};

export type CarType = {
  name: string;
  color: string;
  id: number;
};

export const getWinners = async (options: GetWinnersType): Promise<ResponseType<WinnerType[]>> => {
  const response = await getData(ENDPOINT, objectToUrlParams<GetWinnersType>(options));

  return parseResponse<WinnerType[]>(response);
};

export const getWinner = async (options: number): Promise<ResponseType<WinnerType>> => {
  const response = await getData(ENDPOINT, options);

  return parseResponse<WinnerType>(response);
};

export const createWinner = async (data: CreateWinnerType): Promise<ResponseType<CreateWinnerType>> => {
  const response = await postData(ENDPOINT, data);

  return parseResponse<CreateWinnerType>(response);
};

// TODO
export const updateCar = async (id: number, data: CreateCarType): Promise<ResponseType<CreateCarType>> => {
  const response = await putData(ENDPOINT, id, data);

  return parseResponse<CreateCarType>(response);
};

export const deleteWinner = async (id: number): Promise<ResponseType<unknown>> => {
  const response = await deleteData(ENDPOINT, id);

  return parseResponse<unknown>(response);
};
