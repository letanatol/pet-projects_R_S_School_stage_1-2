export class StorageService {
  constructor(private storageKeyPrefix: string) {}

  private getStorageKey(key: string): string {
    return `${this.storageKeyPrefix}_${key}`;
  }

  public saveData<T>(key: string, data: T): void {
    const storageKey = this.getStorageKey(key);
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  public getData<T = string>(key: string): T | null {
    const storageKey = this.getStorageKey(key);
    const data = localStorage.getItem(storageKey);
    const parseData: T | null = data ? (JSON.parse(data) as T) : null;
    return parseData;
  }

  public clearData(): void {
    localStorage.clear();
  }
}

export const localStorageService = new StorageService('letanatol');
