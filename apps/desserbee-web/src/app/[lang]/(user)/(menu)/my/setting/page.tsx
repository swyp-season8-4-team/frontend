import { MyPageSubMenuPageHeader } from "../_components/MyPageSubMenuPageHeader";
import ProfileSettingForm from "./_components/ProfileSettingForm";

export default function MySettingPage() {
  return (
    <div className="flex flex-col h-[100dvh] bg-gray-50">
      <MyPageSubMenuPageHeader title="프로필 설정" />
      <main className="flex-1 p-4">
        <ProfileSettingForm />
      </main>
    </div>
  )
}