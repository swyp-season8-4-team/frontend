import SignInButtons from "../../../_components/SignInButton";

interface Props {
  onClickA: () => void;
  onClickB: () => void;
}

export default function PreferencesIntro({ onClickA, onClickB }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center">
      <p className="text-2xl font-bold mb-6">회원가입이 완료되었습니다!</p>
      <p className="text-lg mb-2">이제 개인 맞춤 필터링을 생성하고 <br />나에게 딱 맞는 디저트를 찾아볼까요?</p>
      <p className="text-sm text-gray-500 mb-8">
        선택한 취향은 마이페이지에서 언제든 변경할 수 있어요.
      </p>
      <SignInButtons firstButtonText="내 취향 선택하러 갈래요" secondButtonText="다음에 할래요" onClickA={onClickA} onClickB={onClickB} />
    </div>
  )
}