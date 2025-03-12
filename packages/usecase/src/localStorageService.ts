import type { StorageRepository } from '@repo/entity/src/storage';

export default class LocalStorageService {
  private readonly storageRepository: StorageRepository | null;

  constructor({
    storageRepository,
  }: {
    storageRepository?: StorageRepository;
  }) {
    this.storageRepository = storageRepository ?? null;
  }

  delete(key: string): void {
    if (!this.storageRepository) {
      throw new Error('storageRepository is not set');
    }

    this.storageRepository.delete(key);
  }

  get<T>(key: string): T | null {
    if (!this.storageRepository) {
      throw new Error('storageRepository is not set');
    }

    return this.storageRepository.get<T>(key);
  }

  set<T>(key: string, value: T): void {
    if (!this.storageRepository) {
      throw new Error('storageRepository is not set');
    }

    this.storageRepository.set<T>(key, value);
  }
}
