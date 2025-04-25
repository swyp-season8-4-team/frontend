'use client';

import { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { formatDateToHHMM, formatDateToMMDD } from '@repo/utility/src/date';
import { PopularItem } from './popularItem';
import { RecentItem } from './recentItem';
import {
  deleteRecentKeyword,
  deleteRecentKeywordsAll,
  getPopularKeywords,
  getRecentKeywords,
} from './action';
import type {
  GetPopularSearchDataResonse,
  RecentSearchData,
} from '@repo/entity/src/search';
import { UserContext } from '@/contexts/UserContext';
import LocalStorageRepository from '@repo/infrastructures/src/repositories/localStorageRepository';
import SearchService from '@repo/usecase/src/searchService';
import SearchAPIRepository from '@repo/infrastructures/src/repositories/searchAPIRepository';

interface DefaultPanelProps {
  onSearchAction: (keyword: string) => void;
}

const searchService = new SearchService({
  searchRepository: new SearchAPIRepository(),
  storageRepository: new LocalStorageRepository(),
});

export function DefaultPanel({ onSearchAction }: DefaultPanelProps) {
  const { user } = useContext(UserContext);
  const [popularSearchData, setPopularSearchData] =
    useState<GetPopularSearchDataResonse>();
  const [recentSearchData, setRecentSearchData] = useState<RecentSearchData[]>(
    [],
  );

  const handlePopularSearchDataFetch = useCallback(async () => {
    try {
      const result = await getPopularKeywords();
      setPopularSearchData(result);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleRecentKeywordAllDelete = useCallback(async () => {
    const previousData = recentSearchData;
    setRecentSearchData([]);

    try {
      if (user) {
        await deleteRecentKeywordsAll();
      } else {
        searchService.deleteRecentKeywordsAllIfNotSignIn();
      }
    } catch (err) {
      setRecentSearchData(previousData);
      console.log('전체 삭제 실패:', err);
    }
  }, [user, recentSearchData]);

  const handleRecentKeywordDelete = async (keywordIdToDelete: number) => {
    try {
      if (user) {
        await deleteRecentKeyword(keywordIdToDelete);
        setRecentSearchData((prev: RecentSearchData[]) =>
          prev.filter(
            (item: RecentSearchData) => item.id !== keywordIdToDelete,
          ),
        );
      } else {
        const searchHistory = searchService.getRecentKeywordIfNotSignIn() || [];
        const updatedHistory = searchHistory.filter(
          (item: RecentSearchData) => item.id !== keywordIdToDelete,
        );

        searchService.deleteRecentKeywordIfNotSignIn(updatedHistory);
        setRecentSearchData((prev: RecentSearchData[]) =>
          prev.filter(
            (item: RecentSearchData) => item.id !== keywordIdToDelete,
          ),
        );
      }
    } catch (err) {
      console.log('최근 검색어 삭제 실패:', err);
    }
  };

  const getNotSignInSearchHistory = useCallback((): RecentSearchData[] => {
    try {
      const searchHistory = searchService.getRecentKeywordIfNotSignIn();

      if (!searchHistory) {
        return [];
      }

      return searchHistory;
    } catch (error) {
      console.error('Failed to get search history:', error);
      return [];
    }
  }, []);

  const handleRecentSearchDataFetch = useCallback(async () => {
    try {
      if (user) {
        // const result = await getRecentKeywords();
        const result = await getRecentKeywords();
        setRecentSearchData(result);
      } else {
        setRecentSearchData(getNotSignInSearchHistory());
      }
    } catch (err) {
      console.log(err);
    }
  }, [user, getNotSignInSearchHistory]);

  useEffect(() => {
    handlePopularSearchDataFetch();
    handleRecentSearchDataFetch();
  }, [handlePopularSearchDataFetch, handleRecentSearchDataFetch]);

  if (!popularSearchData || !recentSearchData) return;

  return (
    <div className="h-full w-full pb-4 pt-[21px] md:pt-7">
      {popularSearchData && (
        <div className="px-base">
          <div className="flex w-full items-center justify-between">
            <div className="text-xs font-semibold md:text-[22px]">
              인기 검색어
            </div>
            <div className="text-[10px] md:text-lg">
              {formatDateToHHMM(popularSearchData.lastUpdatedTime)} 업데이트
            </div>
          </div>
          <div className="mt-4 flex w-full justify-between gap-[16.24px] md:gap-[37px]">
            <div className="flex w-1/2 flex-col gap-y-[10px] md:gap-y-6">
              {popularSearchData.searches.slice(0, 5).map((popularKeyword) => (
                <button
                  onClick={() => {
                    onSearchAction(popularKeyword.keyword);
                  }}
                  key={popularKeyword.keyword}
                >
                  <PopularItem
                    keyword={popularKeyword.keyword}
                    rank={popularKeyword.rank}
                    difference={popularKeyword.difference}
                  />
                </button>
              ))}
            </div>
            <div className="flex w-1/2 flex-col gap-y-[10px] md:gap-y-6">
              {popularSearchData.searches.slice(5, 10).map((popularKeyword) => (
                <button
                  onClick={() => {
                    onSearchAction(popularKeyword.keyword);
                  }}
                  key={popularKeyword.keyword}
                >
                  <PopularItem
                    keyword={popularKeyword.keyword}
                    rank={popularKeyword.rank}
                    difference={popularKeyword.difference}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="my-[10px] h-[3px] w-full bg-[#E8E8E8] md:my-[26px] md:h-[7px]"></div>
      <div>
        <div className="px-base">
          <div className="flex w-full items-center justify-between">
            <div className="text-xs font-semibold md:text-[22px]">
              최근 검색어
            </div>
            <button
              onClick={() => handleRecentKeywordAllDelete()}
              className="text-[10px] md:text-lg"
            >
              전체 삭제
            </button>
          </div>
          <div className="mt-[7px] flex flex-col gap-[7px] pb-[111px] md:mt-[22px] md:gap-[22px]">
            {recentSearchData.map((recentKeyword) => (
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onSearchAction(recentKeyword.keyword);
                }}
                key={recentKeyword.id}
              >
                <RecentItem
                  keyword={recentKeyword.keyword}
                  createdAt={formatDateToMMDD(recentKeyword.createdAt)}
                  onDelete={() => handleRecentKeywordDelete(recentKeyword.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
