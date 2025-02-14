import { isServer } from '@repo/api';
import { type StorageRepository } from '@repo/entity/src/storage';

export default class SessionStorageRepository implements StorageRepository {
  delete(key: string): void {
    if (isServer) {
      return;
    }
    
    sessionStorage.removeItem(key);
  }

  get<T>(key: string): T | null {
    if (isServer) {
      return null;
    }

    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  set<T>(key: string, value: T): void {
    if (isServer) {
      return;
    }

    sessionStorage.setItem(key, JSON.stringify(value));
  }
}