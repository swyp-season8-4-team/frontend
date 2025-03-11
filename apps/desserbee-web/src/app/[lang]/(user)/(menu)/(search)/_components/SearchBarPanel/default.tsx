'use client';

import { useContext, useEffect, useState, useCallback } from 'react';
import { formatDateToHHMM } from '@repo/utility/src/date';
import { PopularItem } from './popularItem';
import { RecentItem } from './recentItem';
import {
  deleteRecentSearchKeywordsAll,
  getPopularSearchKeywords,
  getRecentSearchKeywords,
} from './action';
import type { GetPopularSearchDataResonse } from '@repo/entity/src/search';
import { UserContext } from '@/contexts/UserContext';

interface DefaultPanelProps {
  onSearch: (keyword: string) => void;
}

export function DefaultPanel({ onSearch }: DefaultPanelProps) {
  const { user } = useContext(UserContext);
  const [popularSearchData, setPopularSearchData] =
    useState<GetPopularSearchDataResonse>();
  const [recentSearchData, setRecentSearchData] = useState<string[]>([]);

  const handlePopularSearchDataFetch = useCallback(async () => {
    if (user) {
      try {
        const result = await getPopularSearchKeywords();
        setPopularSearchData(result);
      } catch (err) {
        console.log(err);
      }
    }
  }, [user]);

  const handleRecentKeywordAllDelete = useCallback(async () => {
    // 낙관적 업데이트
    const previousData = recentSearchData;
    setRecentSearchData([]);

    try {
      if (user) {
        // await deleteRecentSearchKeywordsAll();
      } else {
        localStorage.setItem('searchHistory', '[]');
      }
    } catch (err) {
      setRecentSearchData(previousData);
      console.log('전체 삭제 실패:', err);
    }
  }, [user, recentSearchData]);

  const handleRecentKeywordDelete = async (keywordToDelete: string) => {
    try {
      if (user) {
        // await deleteRecentSearchKeyword();
        setRecentSearchData((prev) =>
          prev.filter((keyword) => keyword !== keywordToDelete),
        );
      } else {
        const searchHistory = JSON.parse(
          localStorage.getItem('searchHistory') || '[]',
        );

        const updatedHistory = searchHistory.filter((encodedTerm: string) => {
          const decodedTerm = decodeURIComponent(atob(encodedTerm));
          return decodedTerm !== keywordToDelete;
        });

        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
        setRecentSearchData((prev) =>
          prev.filter((keyword) => keyword !== keywordToDelete),
        );
      }
    } catch (err) {
      console.log('최근 검색어 삭제 실패:', err);
    }
  };

  const getNotSignInSearchHistory = useCallback((): string[] => {
    try {
      const encodedHistory = JSON.parse(
        localStorage.getItem('searchHistory') || '[]',
      );
      return encodedHistory
        .map((encodedTerm: string) => {
          try {
            return decodeURIComponent(atob(encodedTerm));
          } catch {
            return '';
          }
        })
        .filter(Boolean);
    } catch (error) {
      console.error('Failed to get search history:', error);
      return [];
    }
  }, []);

  const handleRecentSearchDataFetch = useCallback(async () => {
    try {
      if (user) {
        const result = await getRecentSearchKeywords();
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
  }, []);

  if (!recentSearchData) return;

  return (
    <div className="w-full h-full pt-[21px] md:pt-7 pb-4">
      {popularSearchData && (
        <div className="px-base">
          <div className="w-full flex justify-between items-center">
            <div className="text-xs md:text-[22px] font-semibold">
              인기 검색어
            </div>
            <div className="text-[10px] md:text-lg">
              {formatDateToHHMM(popularSearchData.lastUpdatedTime)} 업데이트
            </div>
          </div>
          <div className="w-full flex justify-between mt-4 gap-[16.24px] md:gap-[37px] ">
            <div className="w-1/2 flex flex-col gap-y-[10px] md:gap-y-6">
              {popularSearchData.searches.slice(0, 5).map((popularKeyword) => (
                <button
                  onClick={() => {
                    onSearch(popularKeyword.keyword);
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
            <div className="w-1/2 flex flex-col gap-y-[10px] md:gap-y-6">
              {popularSearchData.searches.slice(5, 10).map((popularKeyword) => (
                <button
                  onClick={() => {
                    onSearch(popularKeyword.keyword);
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
      <div className="w-full h-[3px] md:h-[7px] bg-[#E8E8E8] my-[10px] md:my-[26px]"></div>
      <div>
        <div className="px-base">
          <div className="w-full flex justify-between items-center">
            <div className="text-xs md:text-[22px] font-semibold">
              최근 검색어
            </div>
            <button
              onClick={() => handleRecentKeywordAllDelete()}
              className="text-[10px] md:text-lg"
            >
              전체 삭제
            </button>
          </div>
          <div className="flex flex-col mt-[7px] md:mt-[22px] gap-[7px] md:gap-[22px] pb-[111px]">
            {recentSearchData.map((recentKeyword) => (
              <div
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onSearch(recentKeyword);
                }}
                key={recentKeyword}
              >
                <RecentItem
                  keyword={recentKeyword}
                  onDelete={() => handleRecentKeywordDelete(recentKeyword)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
