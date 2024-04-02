// import { CarType } from '@helpers/types';
import { EngineData } from '../helpers/types';
import { patchData } from './request';
import { ResponseType, objectToUrlParams, parseResponse } from './shared';

const ENDPOINT = 'http://localhost:3000/engine/';

export type EngineStatus = 'started' | 'stopped';

export type CarEngine = {
  id: number;
  status: EngineStatus;
};

export const setEngineStatus = async (carEngine: CarEngine): Promise<ResponseType<EngineData>> => {
  const response = await patchData(ENDPOINT, objectToUrlParams<CarEngine>(carEngine));

  return parseResponse<EngineData>(response);
};
