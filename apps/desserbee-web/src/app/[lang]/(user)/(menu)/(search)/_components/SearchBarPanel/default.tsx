import { formatTimeToHHMM } from './_utils/formatTime';
import { PopularItem } from './popularItem';
export function DefaultPanel() {
  //mock
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
              <PopularItem
                keyword={popularKeyword.keyword}
                key={popularKeyword.keyword}
                rank={popularKeyword.rank}
                difference={popularKeyword.difference}
              />
            ))}
          </div>
          <div className="w-1/2 flex flex-col gap-y-[10px] md:gap-y-6">
            {popularSearchData.searches.slice(5, 10).map((popularKeyword) => (
              <PopularItem
                keyword={popularKeyword.keyword}
                key={popularKeyword.keyword}
                rank={popularKeyword.rank}
                difference={popularKeyword.difference}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-[3px] md:h-[7px] bg-[#E8E8E8] my-[10px] md:my-[26px]"></div>
      <div></div>
    </div>
  );
}
