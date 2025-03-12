import type { AuthRepository } from '@repo/entity/src/auth';
import type {
  DeleteRecentKeywordRequest,
  RecentSearchData,
  SearchRepository,
} from '@repo/entity/src/search';
import type { StorageRepository } from '@repo/entity/src/storage';
export default class SearchService {
  private readonly searchRepository: SearchRepository | null;
  private readonly authRepository: AuthRepository | null;
  private readonly storageRepository: StorageRepository | null;

  constructor({
    searchRepository,
    authRepository,
    storageRepository,
  }: {
    searchRepository: SearchRepository;
    authRepository?: AuthRepository;
    storageRepository?: StorageRepository;
  }) {
    this.searchRepository = searchRepository ?? null;
    this.authRepository = authRepository ?? null;
    this.storageRepository = storageRepository ?? null;
  }

  setRecentKeywordIfNotSignIn(updatedHistory: RecentSearchData[]) {
    if (!this.searchRepository) {
      throw new Error('searchRepository is not set');
    } else if (!this.storageRepository) {
      throw new Error('storageRepository is not set');
    }

    this.storageRepository.set('searchHistory', updatedHistory);
  }

  getRecentKeywordIfNotSignIn() {
    if (!this.searchRepository) {
      throw new Error('searchRepository is not set');
    } else if (!this.storageRepository) {
      throw new Error('storageRepository is not set');
    }

    return (
      this.storageRepository.get<RecentSearchData[]>('searchHistory') || []
    );
  }

  deleteRecentKeywordIfNotSignIn(updatedHistory: RecentSearchData[]) {
    if (!this.searchRepository) {
      throw new Error('searchRepository is not set');
    } else if (!this.storageRepository) {
      throw new Error('storageRepository is not set');
    }

    this.storageRepository.set('searchHistory', updatedHistory);
  }

  deleteRecentKeywordsAllIfNotSignIn() {
    if (!this.searchRepository) {
      throw new Error('searchRepository is not set');
    } else if (!this.storageRepository) {
      throw new Error('storageRepository is not set');
    }

    this.storageRepository.set<RecentSearchData[]>('searchHistory', []);
  }

  async getPopularKeywords() {
    if (!this.searchRepository) {
      throw new Error('searchRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();
    const result = await this.searchRepository.getPopularKeywords({
      authorization,
    });
    return result;
  }

  async getRecentKeywords() {
    if (!this.searchRepository) {
      throw new Error('searchRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const result = await this.searchRepository.getRecentKeywords({
      authorization,
    });

    return result;
  }

  async deleteRecentKeyword(params: DeleteRecentKeywordRequest) {
    if (!this.searchRepository) {
      throw new Error('searchRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const requestData = {
      data: params,
      ...(authorization && { authorization }),
    };

    const result = await this.searchRepository.deleteRecentKeyword(requestData);
  }

  async deleteRecentKeywordsAll() {
    if (!this.searchRepository) {
      throw new Error('searchRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const result = await this.searchRepository.deleteRecentKeywordsAll({
      authorization,
    });
  }
}
