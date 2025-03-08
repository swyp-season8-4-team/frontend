import { MyPageSubMenuPageHeader } from "../_components/MyPageSubMenuPageHeader";
import ProfileSettingForm from "./_components/ProfileSettingForm";

export default function MySettingPage() {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <MyPageSubMenuPageHeader title="프로필 설정" />
      <div className="flex-1 p-4">
        <ProfileSettingForm />
      </div>
    </div>
  )
}