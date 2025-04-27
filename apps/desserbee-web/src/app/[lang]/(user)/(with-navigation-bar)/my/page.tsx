import MyIconMenu from './_components/MyIconMenu';
import MenuSection from './_components/MenuSection';
import ProfileSection from './_components/ProfileSection';

export default async function MyPage() {
  return (
    <main className="flex h-full flex-col bg-white">
      <div className="p-6">
        <h1 className="mb-4 text-xl font-medium text-gray-700">마이 페이지</h1>

        <div className="rounded-lg bg-white p-6">
          <ProfileSection />
          <div className="mt-8">
            <MyIconMenu />
          </div>
          <hr className="my-6 border-t border-gray-200" />
          <MenuSection />
        </div>
      </div>
    </main>
  );
}
