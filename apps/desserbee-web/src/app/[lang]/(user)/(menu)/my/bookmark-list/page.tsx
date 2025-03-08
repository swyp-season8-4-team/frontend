import { BookMarkListContainer } from './_components/BookMarkListContainer';
import MateService from '@repo/usecase/src/mateService';
import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';

export default async function MyBookmarkListPage() {
  const mateService = new MateService({
    mateRepository: new MateAPIRepository(),
  });

  let savedDessertMate;
  // try {
  //   savedDessertMate = await mateService.getSavedMateList({
  //     from: 0,
  //     to: 4,
  //   });
  // } catch (err) {
  //   console.log(err);
  // }

  if (!savedDessertMate) console.log('디저트 메이트 불러오기 오류');

  return <BookMarkListContainer savedDessertMate={savedDessertMate ?? []} />;
}
