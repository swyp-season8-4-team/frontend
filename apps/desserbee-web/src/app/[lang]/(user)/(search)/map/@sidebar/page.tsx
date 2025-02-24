import { SideBarContainer } from './_components/SidebarContainer';

interface SideBarPageProps {
  searchParams: Promise<{
    sidebar?: boolean;
  }>;
}

export default async function SideBarPage({ searchParams }: SideBarPageProps) {
  const { sidebar } = await searchParams;
  const showSidebar = sidebar;

  if (!showSidebar) return null;
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

  return (
    <SideBarContainer
      showSidebar={showSidebar}
      totalSavedList={totalSavedList}
    />
  );
}
