import { CallbackFn, Endpoints } from "src/app/helper/types";

type RequestOptions = {
  apiKey: string;
}

type RequestSources = {
  sources?: string;
}

type UrlOptions = RequestOptions & RequestSources;

enum RequestMethods {
  'GET' = 'GET'
}

enum ResponseStatusCode {
  'NO_FOUND' = 404,
  'UNAUTH' = 401,
}

export type Request = {
  endpoint: Endpoints;
  options?: RequestSources;
}

class Loader {
  constructor(private readonly baseLink: string, private readonly options: RequestOptions) {
  }

  public getResp(
    { endpoint, options = {} }: Request,
    callback = (): void => {
      console.error('No callback for GET response');
    }
  ) {
    this.load(RequestMethods.GET, endpoint, callback, options);
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if ([
        ResponseStatusCode.UNAUTH,
        ResponseStatusCode.NO_FOUND
      ].includes(res.status)) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }

      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: Partial<RequestSources>, endpoint: Endpoints): string {
    const urlOptions: UrlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key: string) => {
      const value = urlOptions[key as keyof RequestSources];

      if (value) {
        url += `${key}=${value}&`;
      }
    });

    return url.slice(0, -1);
  }

  private load(method: RequestMethods, endpoint: Endpoints, callback: CallbackFn, options: Partial<RequestSources> = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
