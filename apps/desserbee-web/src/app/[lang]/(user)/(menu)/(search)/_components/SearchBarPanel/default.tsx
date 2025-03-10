'use client';

import { useContext, useEffect, useState, useCallback } from 'react';
import { formatTimeToHHMM } from './_utils/formatTime';
import { PopularItem } from './popularItem';
import { RecentItem } from './recentItem';
import {
  deleteRecentSearchKeywordsAll,
  getPopularSearchKeywords,
  getRecentSearchKeywords,
} from './action';
import type { GetPopularSearchDataResonse } from '@repo/entity/src/search';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/contexts/UserContext';

interface DefaultPanelProps {
  onSearch: (keyword: string) => void;
}

export function DefaultPanel({ onSearch }: DefaultPanelProps) {
  const { user } = useContext(UserContext);
  // const [popularSearchData, setPopularSearchData] =
  //   useState<GetPopularSearchDataResonse>();
  const [recentSearchData, setRecentSearchData] = useState<string[]>([]);

  // const handlePopularSearchDataFetch = async () => {
  //   try {
  //     const result = await getPopularSearchKeywords();
  //     setPopularSearchData(result);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
    handleRecentSearchDataFetch();
  }, [handleRecentSearchDataFetch]);

  const popularSearchData = {
    searches: [
      {
        keyword: '디저트',
        searchCount: 13,
        rank: 1,
        difference: 3,
      },
      {
        keyword: 'coffee',
        searchCount: 7,
        rank: 2,
        difference: 1,
      },
      {
        keyword: '디저트 비',
        searchCount: 6,
        rank: 3,
        difference: -5,
      },
      {
        keyword: '커피',
        searchCount: 2,
        rank: 4,
        difference: 1,
      },
      {
        keyword: '디저트2',
        searchCount: 13,
        rank: 5,
        difference: 2,
      },
      {
        keyword: 'coffee2',
        searchCount: 7,
        rank: 6,
        difference: 1,
      },
      {
        keyword: '디저트 비2',
        searchCount: 6,
        rank: 7,
        difference: -2,
      },
      {
        keyword: '커피2',
        searchCount: 2,
        rank: 8,
        difference: 0,
      },
      {
        keyword: '디저트 비3',
        searchCount: 6,
        rank: 9,
        difference: -8,
      },
      {
        keyword: '커피4',
        searchCount: 2,
        rank: 10,
        difference: 1,
      },
    ],
    lastUpdatedTime: '2025-03-10T16:05:09.885259Z',
  };

  if (!popularSearchData || !recentSearchData) return;

  return (
    <div className="w-full h-full pt-[21px] md:pt-7 pb-4">
      <div className="px-base">
        <div className="w-full flex justify-between items-center">
          <div className="text-xs md:text-[22px] font-semibold">
            인기 검색어
          </div>
          <div className="text-[10px] md:text-lg">
            {formatTimeToHHMM(popularSearchData.lastUpdatedTime)} 업데이트
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
                <RecentItem key={recentKeyword} keyword={recentKeyword} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
