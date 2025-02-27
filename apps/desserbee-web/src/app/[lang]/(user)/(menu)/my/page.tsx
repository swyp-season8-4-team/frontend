import MyIconMenu from './_components/MyIconMenu';
import MenuSection from './_components/MenuSection';
import ProfileSection from './_components/ProfileSection';

export default async function MyPage() {
  return (
    <main className="flex flex-col h-full bg-white">
      <div className="p-6">
        <h1 className="text-xl font-medium text-gray-700 mb-4">마이 페이지</h1>
        
        <div className="bg-white rounded-lg p-6">
          <ProfileSection />
          <div className="mt-8">
            <MyIconMenu />
          </div>
          
          <hr className="border-t border-gray-200 my-6" />
          
          <MenuSection />
        </div>
      </div>
    </main>
  );
}
