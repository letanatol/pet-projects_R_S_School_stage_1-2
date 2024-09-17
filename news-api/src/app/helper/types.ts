export interface Source {
  id: string;
  name: string;
}

export interface Article {
  author?: string;
  description?: string;
  id?: string;
  name?: string;
  publishedAt?: string;
  source?: Source;
  title?: string;
  url?: string;
  urlToImage?: string;
}

export interface Data {
  articles: Article[];
  sources: Source[];
};

export enum Endpoints {
  sources = 'sources',
  everything = 'everything',
};

export type CallbackFn = (data?: Data) => void;
