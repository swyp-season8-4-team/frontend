import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type { AuthRepository } from '@repo/entity/src/auth';
import type {
  DeleteRecentKeywordRequest,
  SearchRepository,
} from '@repo/entity/src/search';
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
