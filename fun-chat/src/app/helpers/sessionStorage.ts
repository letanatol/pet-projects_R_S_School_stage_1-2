import { UserType } from './types';

export class SessionStorageService {
  constructor(private storageKeyPrefix: string) {}

  private getStorageKey(key: string): string {
    return `${this.storageKeyPrefix}_${key}`;
  }

  public saveData<T>(key: string, data: T): void {
    const storageKey = this.getStorageKey(key);
    sessionStorage.setItem(storageKey, JSON.stringify(data));
  }

  public getData<T = string>(key: string): T | null {
    const storageKey = this.getStorageKey(key);
    const data = sessionStorage.getItem(storageKey);
    const parseData: T | null = data ? (JSON.parse(data) as T) : null;
    return parseData;
  }

  public getUserFromStorage(key: string): UserType | null {
    const user = this.getData<UserType>(key);

    if (user) {
      return user;
    }

    return null;
  }

  public addData(key: string, data: string[]): void {
    const storageKey = this.getStorageKey(key);
    const dataSessionStorage = sessionStorage.getItem(storageKey);
    const parseData = dataSessionStorage ? (JSON.parse(dataSessionStorage) as string[]) : null;
    if (parseData) {
      const updatedData = [...parseData, ...data];
      sessionStorage.setItem(storageKey, JSON.stringify(updatedData));
    } else {
      sessionStorage.setItem(storageKey, JSON.stringify(data));
    }
  }

  public clearData(): void {
    sessionStorage.clear();
  }

  public removeData(key: string): void {
    const storageKey = this.getStorageKey(key);
    sessionStorage.removeItem(storageKey);
  }
}

export const sessionStorageService = new SessionStorageService('letanatol');
