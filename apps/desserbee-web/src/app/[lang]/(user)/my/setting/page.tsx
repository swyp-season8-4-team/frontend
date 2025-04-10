import { MyPageSubMenuPageHeader } from '../_components/MyPageSubMenuPageHeader';
import ProfileSettingForm from './_components/ProfileSettingForm';

export default function MySettingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-50">
      <MyPageSubMenuPageHeader title="프로필 설정" />
      <main className="flex-1 px-base pb-[100px]">
        <ProfileSettingForm />
      </main>
    </div>
  );
}
