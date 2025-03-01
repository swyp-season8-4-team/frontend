import { SideBarContainer } from './_components/SidebarContainer';
import { StoreListContainer } from './_components/StoreListContainer';

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

  return (
    <>
      {showSidebar ? <SideBarContainer showSidebar={showSidebar} /> : null}
      {showStoreList ? (
        <StoreListContainer listId={listId} showStoreList={showStoreList} />
      ) : null}
    </>
  );
}
