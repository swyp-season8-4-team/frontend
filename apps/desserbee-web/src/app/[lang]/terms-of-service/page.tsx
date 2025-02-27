export default async function TermsOfServicePage() {
  return (
    <div className="bg-white min-h-screen p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#393939] mb-6">디저비(DesserBee) 서비스 이용약관</h1>
        <p className="text-sm text-gray-500 mb-4">최종 업데이트: 2025년 3월 1일</p>
        <div className="h-1 w-20 bg-yellow-400 rounded-full mb-6"></div>
      </div>

      {/* 제1장 총칙 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4">제1장 총칙</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#393939] mb-2">제1조 (목적)</h3>
          <p className="text-gray-700 leading-relaxed">
            본 약관은 디저비(DesserBee, 이하 &quot;회사&quot;)가 제공하는 디저트 큐레이션, 가게 정보 관리, 직접 거래, 유료 서비스, 거래 중개, 배송 서비스 등(이하 &quot;서비스&quot;)의 이용과 관련하여, 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#393939] mb-2">제2조 (정의)</h3>
          <div className="space-y-3 text-gray-700">
            <p><span className="font-medium">이용자:</span> 회사가 제공하는 서비스를 이용하는 모든 자로, 회원과 비회원으로 구분됩니다.</p>
            
            <p><span className="font-medium">회원:</span> 회사에 개인정보를 제공하고 회원가입을 완료하여 지속적으로 서비스를 이용할 수 있는 자를 의미하며, 다음과 같이 구분됩니다.</p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-medium">일반 회원:</span> 지도 서비스, 가게 정보 열람, 서비스 내의 모든 저장 기능, 맛집 리뷰 작성 및 소통 기능, 디저트메이트, 스탬프 적립, 쿠폰 사용, 개인 맞춤형 필터링, 신고 기능 및 기타 플랫폼 내 제공되는 기능을 이용할 수 있습니다.</li>
              <li><span className="font-medium">사업자 회원:</span> 일반 회원 기능을 사용할 수 없으며, 가게 정보 등록 및 관리, 사진 및 정보 수정, 통계 자료 확인을 위한 전용 대시보드를 통해 서비스 이용</li>
            </ul>
            
            <p><span className="font-medium">비회원:</span> 회원가입 없이 제한된 범위 내에서 서비스를 이용하는 자로, 지도 서비스, 가게 정보 열람 및 기본 필터링 기능을 사용할 수 있습니다. 단, 개인 맞춤형 필터링은 제공되지 않으며, 신고 기능을 이용할 수 없습니다.</p>
            
            <p><span className="font-medium">가맹점:</span> 회사와 가맹 계약을 체결하고, 디저비 플랫폼 내에서 추가적인 마케팅 및 쿠폰 기능을 활용할 수 있는 사업자를 의미합니다.</p>
            
            <p><span className="font-medium">쿠폰:</span> 이용자가 특정 조건을 충족할 경우 제공받을 수 있는 할인권을 의미합니다. 회사는 프리미엄 쿠폰 발행 서비스를 통해 수수료를 받을 수 있습니다.</p>
            
            <p><span className="font-medium">스탬프:</span> 이용자가 가맹점을 방문하거나 특정 조건을 충족할 경우 적립할 수 있는 포인트로, 일정 개수 이상 적립 시 쿠폰 또는 혜택으로 교환할 수 있습니다. 회사는 스탬프 적립 및 교환 시스템을 운영하며, 이를 통해 이용자의 방문을 유도하고 가맹점과의 상호 작용을 촉진합니다.</p>
          </div>
        </div>
      </section>

      {/* 제2장 약관의 효력 및 변경 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4">제2장 약관의 효력 및 변경</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#393939] mb-2">제3조 (약관의 효력 및 변경)</h3>
          <ul className="space-y-3 text-gray-700">
            <li>본 약관은 이용자가 동의한 후 서비스에 가입하거나, 비회원으로 서비스를 이용하는 순간부터 효력이 발생합니다.</li>
            <li>회사는 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지사항 또는 이메일을 통해 사전 고지됩니다.</li>
            <li>변경된 약관에 대해 이용자가 거부할 권리를 가지며, 거부 시 서비스 이용이 제한될 수 있습니다.</li>
            <li>회사는 약관을 개정할 경우 적용일 최소 7일 전(불리한 경우 30일 전) 공지사항을 통해 회원에게 고지합니다.</li>
            <li>회원이 변경된 약관 시행일까지 명시적인 거부 의사를 표시하지 않을 경우, 변경된 약관에 동의한 것으로 간주됩니다.</li>
            <li>본 약관에서 정하지 않은 사항과 해석에 관하여는 전자상거래법, 개인정보 보호법, 정보통신망법 등 관계 법령 및 일반적인 상관례를 따릅니다.</li>
          </ul>
        </div>
      </section>

      {/* 나머지 장들도 같은 형식으로 구현 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4">제3장 회원가입 및 계정 관리</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-[#393939] mb-2">제4조 (회원가입 및 계정 보안)</h3>
          <ul className="space-y-3 text-gray-700">
            <li>회원가입은 이용자가 본 약관에 동의하고, 회사가 제공하는 가입 양식을 작성하여 신청한 후, 회사가 이를 승인함으로써 완료됩니다.</li>
            <li>회원은 자신의 계정 정보(아이디, 비밀번호)를 안전하게 관리할 책임이 있으며, 이를 제3자에게 공유하거나 양도할 수 없습니다.</li>
            <li>회원 계정의 부정 사용이 의심될 경우, 즉시 회사에 통보해야 합니다.</li>
            <li>회원의 과실로 발생한 계정 도용, 정보 유출 등의 손해에 대해 회사는 책임을 지지 않습니다.</li>
            <li>회원은 비밀번호를 분실한 경우, 본인 확인 절차를 거친 후 이메일을 통한 재설정 기능을 이용하여 비밀번호를 변경할 수 있습니다.</li>
          </ul>
        </div>
      </section>

      {/* 더 많은 섹션들... */}

      <div className="mt-12 border-t pt-6 text-center text-sm text-gray-500">
        <p>본 약관은 2025년 3월 1일부터 시행됩니다.</p>
        <p className="mt-2">© 2025 디저비(DesserBee). All rights reserved.</p>
      </div>
    </div>
  );
}
