import type { SavedListData } from '@repo/entity/src/store';
import { SideBarContainer } from './_components/SidebarContainer';
import { StoreListContainer } from './_components/StoreListContainer';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import AuthService from '@repo/usecase/src/authService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import { cookies } from 'next/headers';

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

  const storeService = new StoreService({
    storeRepository: new StoreAPIReopository(),
  });

  const authService = new AuthService({
    authRepository: new AuthNextAppRouteRepository(),
  });

  const authorization = await authService.getAuthorization();

  let totalSavedList = [] as SavedListData[];

  const cookieStore = await cookies();
  const userUuid = cookieStore.get('userUuid');

  if (authorization && userUuid?.value) {
    totalSavedList = await storeService.getSavedListAll(
      authorization,
      userUuid.value,
    );
  }

  const listInfo =
    listId && authorization && userUuid?.value
      ? await storeService.getParentSavedList({
          listId: Number(listId),
          authorization,
        })
      : { listName: '', iconColorId: 0 };

  const storeData =
    listId && authorization && userUuid?.value
      ? await storeService.getStoresInSavedList({
          listId: Number(listId),
          authorization,
        })
      : [];

  const storeListContainerProps = {
    storesInSavedList: {
      listName: listInfo.listName,
      iconColorId: listInfo.iconColorId,
      storeData,
    },
    showStoreList,
  };
  return (
    <>
      {showSidebar ? (
        <SideBarContainer
          showSidebar={showSidebar}
          totalSavedList={totalSavedList}
        />
      ) : null}
      {showStoreList ? (
        <StoreListContainer {...storeListContainerProps} />
      ) : null}
    </>
  );
}
