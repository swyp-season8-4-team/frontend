export default async function MarketingTermsPage() {
  return (
    <main className="max-w-screen-md mx-auto px-5 py-8 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#FDB813] mb-2">마케팅 정보 수신 동의</h1>
        <p className="text-sm text-gray-500">시행일자: 2025년 3월 1일</p>
      </div>

      {/* 제1조 */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-[#FDB813] flex items-center justify-center text-white font-bold mr-3">1</div>
          <h2 className="text-lg font-bold">목적</h2>
        </div>
        <div className="pl-14">
          <p className="text-gray-700 leading-relaxed">
            본 약관은 디저비(DesserBee, 이하 "회사")가 이용자에게 광고성 정보를 전송하기 위해 이용자의 동의를 받는 절차 및 권리, 거부 방법을 규정함을 목적으로 합니다.
          </p>
        </div>
      </section>

      {/* 제2조 */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-[#FDB813] flex items-center justify-center text-white font-bold mr-3">2</div>
          <h2 className="text-lg font-bold">수집하는 개인정보 항목</h2>
        </div>
        <div className="pl-14">
          <p className="text-gray-700 mb-3">회사는 마케팅 정보 제공을 위해 다음의 정보를 수집할 수 있습니다.</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>이름</li>
            <li>휴대전화번호</li>
            <li>이메일 주소</li>
            <li>푸시 알림 설정 여부</li>
          </ul>
        </div>
      </section>

      {/* 제3조 */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-[#FDB813] flex items-center justify-center text-white font-bold mr-3">3</div>
          <h2 className="text-lg font-bold">수집 및 이용 목적</h2>
        </div>
        <div className="pl-14">
          <p className="text-gray-700 mb-3">회사는 다음의 목적을 위해 광고성 정보를 발송할 수 있습니다.</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>신규 서비스 및 프로모션 안내</li>
            <li>할인 쿠폰 및 이벤트 소식 제공</li>
            <li>맞춤형 광고 및 추천 정보 제공</li>
            <li>기타 회사가 이용자에게 유용하다고 판단하는 마케팅 관련 정보 전달</li>
          </ul>
        </div>
      </section>

      {/* 제4조 */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-[#FDB813] flex items-center justify-center text-white font-bold mr-3">4</div>
          <h2 className="text-lg font-bold">전송 방법 및 빈도</h2>
        </div>
        <div className="pl-14">
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>회사는 이용자의 동의를 받은 경우에 한하여 광고성 정보를 전송할 수 있습니다.</li>
            <li><span className="font-medium">전송 방법:</span> SMS, 이메일, 앱 푸시 알림, 서비스 내 메시지</li>
            <li><span className="font-medium">전송 빈도:</span> <span className="text-[#FDB813] font-medium">이용자의 관심 및 서비스 운영 정책에 따라 변동될 수 있으며, 필요 시 발송됩니다.</span></li>
          </ol>
        </div>
      </section>

      {/* 제5조 */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-[#FDB813] flex items-center justify-center text-white font-bold mr-3">5</div>
          <h2 className="text-lg font-bold">마케팅 수신 동의 철회 방법</h2>
        </div>
        <div className="pl-14">
          <p className="text-gray-700 mb-3">이용자는 언제든지 다음의 방법으로 마케팅 정보 수신을 거부할 수 있습니다.</p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <ol className="list-decimal pl-5 space-y-3 text-gray-700">
              <li><span className="font-medium">앱 내 설정 → 알림 설정에서 수신 거부</span></li>
              <li><span className="font-medium">이메일 하단의 "수신 거부" 링크 클릭</span></li>
              <li><span className="font-medium">고객센터를 통해 요청</span> (문의: <a href="mailto:support@desserbee.com" className="text-[#FDB813] underline">support@desserbee.com</a>)</li>
            </ol>
          </div>
        </div>
      </section>

      {/* 제6조 */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-[#FDB813] flex items-center justify-center text-white font-bold mr-3">6</div>
          <h2 className="text-lg font-bold">보유 및 이용 기간</h2>
        </div>
        <div className="pl-14">
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>마케팅 수신 동의 정보는 <span className="font-medium">동의 철회 시까지 보관</span>됩니다.</li>
            <li>회원 탈퇴 시, 마케팅 수신 동의 정보는 자동으로 삭제됩니다.</li>
            <li>법령에서 별도로 정하는 경우, 해당 기간 동안 보관할 수 있습니다.</li>
          </ol>
        </div>
      </section>

      {/* 제7조 */}
      <section className="mb-12">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-[#FDB813] flex items-center justify-center text-white font-bold mr-3">7</div>
          <h2 className="text-lg font-bold">기타 사항</h2>
        </div>
        <div className="pl-14">
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>회사는 이용자의 개인정보를 보호하며, 관련 법령 및 개인정보처리방침을 준수합니다.</li>
            <li>본 약관에서 정하지 않은 사항은 정보통신망법, 개인정보 보호법 및 관련 법령을 따릅니다.</li>
            <li>본 약관은 <span className="font-medium">2025년 3월 1일부터 시행</span>됩니다.</li>
          </ol>
        </div>
      </section>

      {/* 하단 회사 정보 */}
      <footer className="border-t pt-6 text-center text-sm text-gray-500">
        <p>© 2025 DesserBee. All rights reserved.</p>
        <p className="mt-2">문의: support@desserbee.com</p>
      </footer>
    </main>
  );
}
