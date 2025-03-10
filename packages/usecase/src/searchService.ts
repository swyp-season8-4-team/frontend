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

  async getPopularSearchKeywords() {
    try {
      if (!this.searchRepository) {
        throw new Error('searchRepository is not set');
      } else if (!this.authRepository) {
        throw new Error('authRepository is not set');
      }

      const authorization = await this.authRepository.getAuthorization();
      const result = await this.searchRepository.getPopularSearchKeywords({
        authorization,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getRecentSearchKeywords() {
    try {
      if (!this.searchRepository) {
        throw new Error('searchRepository is not set');
      } else if (!this.authRepository) {
        throw new Error('authRepository is not set');
      }

      const authorization = await this.authRepository.getAuthorization();

      const result = await this.searchRepository.getRecentSearchKeywords({
        authorization,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  //TODO:api 명세서 나오면 params 추가
  async deleteRecentSearchKeyword() {
    try {
      if (!this.searchRepository) {
        throw new Error('searchRepository is not set');
      } else if (!this.authRepository) {
        throw new Error('authRepository is not set');
      }

      const authorization = await this.authRepository.getAuthorization();

      const result = await this.searchRepository.deleteRecentSearchKeyword({
        authorization,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  //TODO:api 명세서 나오면 params 추가
  async deleteRecentSearchKeywordsAll() {
    try {
      if (!this.searchRepository) {
        throw new Error('searchRepository is not set');
      } else if (!this.authRepository) {
        throw new Error('authRepository is not set');
      }

      const authorization = await this.authRepository.getAuthorization();

      const result = await this.searchRepository.deleteRecentSearchKeywordsAll({
        authorization,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
