import type { StoresInSavedListData } from '@repo/entity/src/store';
import { SideBarContainer } from './_components/SidebarContainer';
import { StoreListContainer } from './_components/StoreListContainer';
// import { cookies } from 'next/headers';

interface SideBarPageProps {
  searchParams: Promise<{
    sidebar?: boolean;
    listId?: number;
  }>;
}

export default async function SideBarPage({ searchParams }: SideBarPageProps) {
  const { sidebar, listId } = await searchParams;

  const showSidebar = sidebar;
  const showStoreList = !!listId;

  if (!listId && !showSidebar) return null;

  // 나중에 실제 API 호출로 대체
  async function getSavedLists() {
    // const token = cookies().get('token')?.value;
    // const response = await fetch('/api/lists', {
    //   headers: { Authorization: `Bearer ${token}` },
    //   // 캐시 무효화를 위한 설정
    //   cache: 'no-store',
    // });
    // return response.json();

    //TODO: 로그인 토큰의 userUuid 받는지 확인 후 api 요청
    // TODO: totalSavedList api
    const totalSavedList = [
      {
        listId: 1,
        userUuid: 'user-uuid-123',
        iconColorId: 1,
        listName: '비건 맛집',
        storeCount: 22,
      },
      {
        listId: 2,
        userUuid: 'user-uuid-123',
        iconColorId: 2,
        listName: '다이어터를 위한 곳',
        storeCount: 15,
      },
      {
        listId: 3,
        userUuid: 'user-uuid-123',
        iconColorId: 3,
        listName: '배고프다',
        storeCount: 31,
      },
      {
        listId: 4,
        userUuid: 'user-uuid-123',
        iconColorId: 4,
        listName: '이게 디저트지',
        storeCount: 18,
      },
      {
        listId: 5,
        userUuid: 'user-uuid-123',
        iconColorId: 1,
        listName: '할미 입맛',
        storeCount: 25,
      },
    ];

    return totalSavedList;
  }

  async function getSavedStoresInList(listId: number) {
    const storesInSavedList: StoresInSavedListData[] = [
      {
        userUuid: 'user-uuid-123',
        storeUuid: 'store-uuid-001',
        listName: '비건 맛집',
        storeName: '베지테리안 가든',
        storeAddress: '서울시 강남구 테헤란로 123',
        imageUrls: [
          'https://picsum.photos/id/292/400/300',
          'https://picsum.photos/id/431/400/300',
          'https://picsum.photos/id/433/400/300',
        ],
      },
      {
        userUuid: 'user-uuid-123',
        storeUuid: 'store-uuid-002',
        listName: '비건 맛집',
        storeName: '그린플레이트',
        storeAddress: '서울시 마포구 홍대로 45-1',
        imageUrls: [
          'https://picsum.photos/id/225/400/300',
          'https://picsum.photos/id/429/400/300',
          'https://picsum.photos/id/410/400/300',
        ],
      },
      {
        userUuid: 'user-uuid-123',
        storeUuid: 'store-uuid-003',
        listName: '다이어터를 위한 곳',
        storeName: '살롱드핏',
        storeAddress: '서울시 서초구 방배로 78',
        imageUrls: [
          'https://picsum.photos/id/488/400/300',
          'https://picsum.photos/id/493/400/300',
          'https://picsum.photos/id/420/400/300',
        ],
      },
      {
        userUuid: 'user-uuid-123',
        storeUuid: 'store-uuid-004',
        listName: '다이어터를 위한 곳',
        storeName: '단백질 천국',
        storeAddress: '서울시 강남구 선릉로 156',
        imageUrls: [
          'https://picsum.photos/id/102/400/300',
          'https://picsum.photos/id/139/400/300',
          'https://picsum.photos/id/411/400/300',
        ],
      },
      {
        userUuid: 'user-uuid-123',
        storeUuid: 'store-uuid-005',
        listName: '배고프다',
        storeName: '황제보쌈',
        storeAddress: '서울시 송파구 올림픽로 299',
        imageUrls: [
          'https://picsum.photos/id/292/400/300',
          'https://picsum.photos/id/312/400/300',
          'https://picsum.photos/id/330/400/300',
        ],
      },
      {
        userUuid: 'user-uuid-123',
        storeUuid: 'store-uuid-006',
        listName: '배고프다',
        storeName: '육회본가',
        storeAddress: '서울시 종로구 인사동길 12',
        imageUrls: [
          'https://picsum.photos/id/429/400/300',
          'https://picsum.photos/id/431/400/300',
          'https://picsum.photos/id/120/400/300',
        ],
      },
      {
        userUuid: 'user-uuid-123',
        storeUuid: 'store-uuid-007',
        listName: '이게 디저트지',
        storeName: '르쁘띠',
        storeAddress: '서울시 용산구 이태원로 27-1',
        imageUrls: [
          'https://picsum.photos/id/431/400/300',
          'https://picsum.photos/id/452/400/300',
          'https://picsum.photos/id/140/400/300',
        ],
      },
      {
        userUuid: 'user-uuid-123',
        storeUuid: 'store-uuid-008',
        listName: '이게 디저트지',
        storeName: '슈가플러스',
        storeAddress: '서울시 마포구 양화로 100',
        imageUrls: [
          'https://picsum.photos/id/292/400/300',
          'https://picsum.photos/id/488/400/300',
          'https://picsum.photos/id/428/400/300',
        ],
      },
      {
        userUuid: 'user-uuid-123',
        storeUuid: 'store-uuid-009',
        listName: '할미 입맛',
        storeName: '할매 순대국',
        storeAddress: '서울시 중구 을지로 45',
        imageUrls: [
          'https://picsum.photos/id/488/400/300',
          'https://picsum.photos/id/292/400/300',
          'https://picsum.photos/id/222/400/300',
        ],
      },
      {
        userUuid: 'user-uuid-123',
        storeUuid: 'store-uuid-010',
        listName: '할미 입맛',
        storeName: '옛날 손칼국수',
        storeAddress: '서울시 광진구 능동로 33',
        imageUrls: [
          'https://picsum.photos/id/225/400/300',
          'https://picsum.photos/id/431/400/300',
          'https://picsum.photos/id/421/400/300',
        ],
      },
    ];

    const listDetail = {
      listName: '할미 입맛',
      iconColorId: 1,
      storeData: storesInSavedList,
    };

    return listDetail;
  }

  const totalSavedList = await getSavedLists();
  // const storesInSavedList = listId ? await getSavedStoresInList(listId) : [];

  const storesInSavedList = listId
    ? await getSavedStoresInList(listId)
    : { listName: '', iconColorId: 0, storeData: [] };

  return (
    <>
      {showSidebar ? (
        <SideBarContainer
          showSidebar={showSidebar}
          totalSavedList={totalSavedList}
        />
      ) : null}
      {showStoreList ? (
        <StoreListContainer
          showStoreList={showStoreList}
          storesInSavedList={storesInSavedList}
        />
      ) : null}
    </>
  );
}
