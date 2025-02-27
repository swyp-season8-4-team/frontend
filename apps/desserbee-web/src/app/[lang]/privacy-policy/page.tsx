export default async function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#393939] mb-6">디저비(DesserBee) 개인정보 취급방침</h1>
        <p className="text-sm text-gray-500 mb-4">최종 업데이트: 2025년 2월 15일</p>
        <div className="h-1 w-20 bg-yellow-400 rounded-full mb-6"></div>
      </div>

      <div className="text-gray-700 leading-relaxed mb-8">
        디저비(DesserBee)(이하 &quot;회사&quot;)는 개인정보 보호법 등 관련 법령을 준수하며, 이용자의 개인정보 보호를 위해 최선을 다합니다. 본 개인정보 처리방침은 회사가 제공하는 서비스(이하 &quot;서비스&quot;) 이용과 관련하여 이용자의 개인정보가 어떻게 수집, 이용, 보관, 보호되는지 안내합니다.
      </div>

      {/* 1. 개인정보의 수집 항목 및 수집 방법 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4 flex items-center">
          <span className="flex items-center justify-center bg-yellow-400 text-white rounded-full w-7 h-7 mr-2 text-sm font-bold">1</span>
          개인정보의 수집 항목 및 수집 방법
        </h2>
        
        <div className="mb-6 pl-9">
          <h3 className="text-lg font-medium text-[#393939] mb-3">(1) 수집하는 개인정보 항목</h3>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-800 mb-2">필수 수집 정보</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>회원가입 시: 이메일, 비밀번호, 닉네임, 전화번호</li>
              <li>서비스 이용 시: 접속 로그, 기기 정보, IP 주소</li>
              <li>유료 서비스 이용 시: 결제 정보(카드사, 결제 승인번호 등)</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-800 mb-2">선택 수집 정보</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>프로필 사진, 관심 카테고리, 주소(배송 서비스 이용 시)</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-800 mb-2">자동 수집 정보</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>서비스 이용 기록, 접속 IP 정보, 기기 정보, 자동로그인 유지 정보(최대 1개월)</li>
            </ul>
          </div>
        </div>
        
        <div className="pl-9">
          <h3 className="text-lg font-medium text-[#393939] mb-3">(2) 개인정보 수집 방법</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>회원가입 및 서비스 이용 과정에서 이용자가 직접 입력</li>
            <li>서비스 이용 시 자동 수집(쿠키, 접속 로그 등)</li>
            <li>고객 문의, 이벤트 참여 등에서 이용자가 직접 제공</li>
          </ul>
        </div>
      </section>

      {/* 2. 개인정보 이용 목적 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4 flex items-center">
          <span className="flex items-center justify-center bg-yellow-400 text-white rounded-full w-7 h-7 mr-2 text-sm font-bold">2</span>
          개인정보 이용 목적
        </h2>
        
        <div className="pl-9">
          <p className="mb-3 text-gray-700">회사는 수집한 개인정보를 다음과 같은 목적으로 활용합니다.</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li><span className="font-medium">회원 관리:</span> 회원 식별, 계정 관리, 고객 문의 응대</li>
            <li><span className="font-medium">서비스 제공:</span> 맞춤형 큐레이션, 결제 및 정산, 리뷰 및 소통 기능</li>
            <li><span className="font-medium">트렌드 리포트 제작:</span> 익명화된 검색 기록 및 위치 기반 데이터를 활용하여 지역별 인기 디저트 트렌드를 분석하고, 이를 바탕으로 트렌드 리포트를 제작 및 제공</li>
            <li><span className="font-medium">보안 및 부정 이용 방지:</span> 서비스 부정 이용 방지, 보안 강화</li>
            <li><span className="font-medium">마케팅 및 광고 활용 (선택 동의 시):</span> 신규 서비스 안내, 이벤트 정보 제공</li>
          </ul>
        </div>
      </section>

      {/* 3. 개인정보 보관 및 파기 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4 flex items-center">
          <span className="flex items-center justify-center bg-yellow-400 text-white rounded-full w-7 h-7 mr-2 text-sm font-bold">3</span>
          개인정보 보관 및 파기
        </h2>
        
        <div className="mb-6 pl-9">
          <h3 className="text-lg font-medium text-[#393939] mb-3">(1) 개인정보 보관 기간</h3>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-800 mb-2">법령상 필수 보관 정보</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>계약 또는 청약철회 기록: 5년 (전자상거래법)</li>
              <li>대금 결제 및 재화 공급 기록: 5년 (전자상거래법)</li>
              <li>소비자 불만 및 분쟁 처리 기록: 3년 (전자상거래법)</li>
              <li>전자금융 거래 기록: 5년 (전자금융거래법)</li>
              <li>로그인 기록 (IP 등): 3개월 (통신비밀보호법)</li>
            </ul>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-800 mb-2">일반 회원 정보 보관</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>회원 탈퇴 시 즉시 삭제</li>
              <li>장기 미이용자(1년 이상 접속 없음): 1년 후 자동 파기</li>
              <li>자동로그인 정보: 1개월 후 자동 삭제</li>
            </ul>
          </div>
        </div>
        
        <div className="pl-9">
          <h3 className="text-lg font-medium text-[#393939] mb-3">(2) 개인정보 파기 절차 및 방법</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>전자적 파일: 복구 불가능한 방식으로 완전 삭제</li>
            <li>종이 문서: 분쇄 또는 소각</li>
          </ul>
        </div>
      </section>

      {/* 4. 개인정보 제3자 제공 및 위탁 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4 flex items-center">
          <span className="flex items-center justify-center bg-yellow-400 text-white rounded-full w-7 h-7 mr-2 text-sm font-bold">4</span>
          개인정보 제3자 제공 및 위탁
        </h2>
        
        <div className="mb-6 pl-9">
          <h3 className="text-lg font-medium text-[#393939] mb-3">(1) 제3자 제공</h3>
          <p className="mb-3 text-gray-700">회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.</p>
          <p className="mb-2 text-gray-700">단, 다음과 같은 경우 이용자의 동의 하에 개인정보를 제공할 수 있습니다.</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>결제 서비스 이용 시 PG사(결제 대행사)와 결제 정보 공유</li>
            <li>배송 서비스 이용 시 배송업체와 배송 정보 공유</li>
          </ul>
        </div>
        
        <div className="pl-9">
          <h3 className="text-lg font-medium text-[#393939] mb-3">(2) 개인정보 처리 위탁</h3>
          <p className="mb-3 text-gray-700">회사는 원활한 서비스 제공을 위해 일부 업무를 외부 업체에 위탁할 수 있으며, 위탁 업체는 다음과 같습니다.</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>AWS (Amazon Web Services): 데이터 보관 및 관리</li>
            <li>PG사 (토스페이먼츠, 카카오페이 등): 결제 처리 및 정산</li>
          </ul>
        </div>
      </section>

      {/* 5. 이용자의 권리 및 행사 방법 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4 flex items-center">
          <span className="flex items-center justify-center bg-yellow-400 text-white rounded-full w-7 h-7 mr-2 text-sm font-bold">5</span>
          이용자의 권리 및 행사 방법
        </h2>
        
        <div className="pl-9">
          <p className="mb-3 text-gray-700">이용자는 자신의 개인정보를 열람, 수정, 삭제 요청할 수 있으며, 요청 시 회사는 지체 없이 조치합니다.</p>
          
          <h4 className="font-medium text-gray-800 mb-2">권리 행사 방법</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>서비스 내 개인정보 수정 메뉴에서 직접 변경</li>
            <li>고객센터를 통해 열람, 정정, 삭제 요청 가능</li>
            <li>회원 탈퇴 시 개인정보 즉시 삭제</li>
          </ul>
        </div>
      </section>

      {/* 6. 쿠키(Cookie) 사용 및 관리 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4 flex items-center">
          <span className="flex items-center justify-center bg-yellow-400 text-white rounded-full w-7 h-7 mr-2 text-sm font-bold">6</span>
          쿠키(Cookie) 사용 및 관리
        </h2>
        
        <div className="pl-9">
          <p className="mb-3 text-gray-700">회사는 서비스 개선 및 맞춤형 광고 제공을 위해 쿠키를 사용할 수 있습니다.</p>
          <p className="text-gray-700">이용자는 쿠키 사용을 거부할 수 있으며, 브라우저 설정을 통해 차단할 수 있습니다.</p>
        </div>
      </section>

      {/* 7. 개인정보 보호를 위한 보안 조치 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4 flex items-center">
          <span className="flex items-center justify-center bg-yellow-400 text-white rounded-full w-7 h-7 mr-2 text-sm font-bold">7</span>
          개인정보 보호를 위한 보안 조치
        </h2>
        
        <div className="pl-9">
          <p className="mb-3 text-gray-700">회사는 이용자의 개인정보 보호를 위해 다음과 같은 보안 조치를 시행합니다.</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>데이터 암호화: 비밀번호 및 주요 정보 암호화 저장</li>
            <li>접근 제한: 개인정보 접근 권한 최소화 및 관리</li>
            <li>보안 시스템 운영: 방화벽 및 침입 탐지 시스템 운영</li>
          </ul>
        </div>
      </section>

      {/* 8. 개인정보 보호책임자 및 연락처 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4 flex items-center">
          <span className="flex items-center justify-center bg-yellow-400 text-white rounded-full w-7 h-7 mr-2 text-sm font-bold">8</span>
          개인정보 보호책임자 및 연락처
        </h2>
        
        <div className="pl-9">
          <p className="mb-3 text-gray-700">회사는 이용자의 개인정보 보호를 위해 개인정보 보호책임자를 지정하고 있습니다.</p>
          <ul className="list-none space-y-1 text-gray-700">
            <li><span className="font-medium">개인정보 보호책임자:</span> 전채연</li>
            <li><span className="font-medium">이메일:</span> jcystory1@gmail.com</li>
            <li><span className="font-medium">연락처:</span> 010-9988-2978</li>
          </ul>
        </div>
      </section>

      {/* 9. 개인정보 처리방침 변경 안내 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4 flex items-center">
          <span className="flex items-center justify-center bg-yellow-400 text-white rounded-full w-7 h-7 mr-2 text-sm font-bold">9</span>
          개인정보 처리방침 변경 안내
        </h2>
        
        <div className="pl-9">
          <p className="mb-3 text-gray-700">본 개인정보 처리방침은 법령 변경 및 회사 정책에 따라 개정될 수 있으며, 변경 시 사전에 공지합니다.</p>
          <ul className="list-none space-y-1 text-gray-700">
            <li><span className="font-medium">시행일:</span> 2025년 3월 1일</li>
            <li><span className="font-medium">최근 개정일:</span> 2025년 2월 15일</li>
          </ul>
        </div>
      </section>

      <div className="mt-12 border-t pt-6 text-center text-sm text-gray-500">
        <p>© 2025 디저비(DesserBee). All rights reserved.</p>
      </div>
    </div>
  );
}