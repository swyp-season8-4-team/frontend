import { isServer } from '@repo/api';
import { type StorageRepository } from '@repo/entity/src/storage';

export default class LocalStorageRepository implements StorageRepository {
  delete(key: string): void {
    if (isServer) {
      return;
    }

    localStorage.removeItem(key);
  }

  get<T>(key: string): T | null {
    if (isServer) {
      return null;
    }

    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  set<T>(key: string, value: T): void {
    if (isServer) {
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }
}
