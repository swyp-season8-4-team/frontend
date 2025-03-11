import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type { AuthRepository } from '@repo/entity/src/auth';
import type { SearchRepository } from '@repo/entity/src/search';
export default class SearchService {
  private readonly searchRepository: SearchRepository | null;
  private readonly authRepository: AuthRepository | null;

  constructor({
    searchRepository,
    authRepository,
  }: {
    searchRepository: SearchRepository;
    authRepository?: AuthRepository;
  }) {
    this.searchRepository = searchRepository ?? null;
    this.authRepository = authRepository ?? null;
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

  //TODO:api 명세서 나오면 params 추가
  async deleteRecentKeyword() {
    if (!this.searchRepository) {
      throw new Error('searchRepository is not set');
    } else if (!this.authRepository) {
      throw new Error('authRepository is not set');
    }

    const authorization = await this.authRepository.getAuthorization();

    const result = await this.searchRepository.deleteRecentKeyword({
      authorization,
    });
  }

  //TODO:api 명세서 나오면 params 추가
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
