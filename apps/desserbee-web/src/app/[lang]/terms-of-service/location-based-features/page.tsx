export default function LocationBasedServicesPage() {
  return (
    <div className="bg-white min-h-screen p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#393939] mb-6">위치기반 서비스 이용약관</h1>
        <p className="text-sm text-gray-500 mb-4">최종 업데이트: 2025년 2월 15일</p>
        <div className="h-1 w-20 bg-yellow-400 rounded-full mb-6"></div>
      </div>

      <div className="text-gray-700 leading-relaxed mb-8">
        디저비(DesserBee)(이하 &quot;회사&quot;)는 이용자의 위치 정보를 활용하여 맞춤형 서비스를 제공하기 위해, 위치기반서비스 이용약관(이하 &quot;본 약관&quot;)을 제공합니다.
      </div>
      
      <div className="text-gray-700 leading-relaxed mb-8">
        본 약관은 회사가 제공하는 위치기반서비스(이하 &quot;서비스&quot;)를 이용함에 있어 회사와 이용자의 권리, 의무 및 기타 필요한 사항을 규정합니다.
      </div>

      {/* 1. 위치기반서비스의 목적 및 내용 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4 flex items-center">
          <span className="flex items-center justify-center bg-yellow-400 text-white rounded-full w-7 h-7 mr-2 text-sm font-bold">1</span>
          위치기반서비스의 목적 및 내용
        </h2>
        
        <div className="pl-9">
          <p className="mb-3 text-gray-700">회사는 이용자의 동의를 받아 위치정보를 활용하여 다음과 같은 서비스를 제공합니다.</p>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>이용자의 현재 위치를 기반으로 디저트 탐색, 추천, 필터링 및 지도 서비스 제공</li>
            <li>이용자의 방문 이력을 기반으로 맞춤형 큐레이션 서비스 제공</li>
            <li>이용자의 위치를 활용한 이벤트 및 프로모션 정보 제공</li>
          </ol>
        </div>
      </section>

      {/* 2. 위치정보의 수집 및 이용 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4 flex items-center">
          <span className="flex items-center justify-center bg-yellow-400 text-white rounded-full w-7 h-7 mr-2 text-sm font-bold">2</span>
          위치정보의 수집 및 이용
        </h2>
        
        <div className="pl-9">
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>회사는 이용자가 서비스 이용 시 GPS, Wi-Fi, 네트워크 정보를 이용하여 위치정보를 수집할 수 있습니다.</li>
            <li>이용자는 모바일 기기의 설정을 통해 위치정보 수집을 거부할 수 있으며, 거부 시 일부 필터링 및 지도 기능 이용이 제한될 수 있습니다.</li>
            <li>회사는 이용자의 위치정보를 서비스 제공 목적 외의 용도로 이용하지 않습니다.</li>
          </ol>
        </div>
      </section>

      {/* 3. 위치정보 보관 및 파기 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4 flex items-center">
          <span className="flex items-center justify-center bg-yellow-400 text-white rounded-full w-7 h-7 mr-2 text-sm font-bold">3</span>
          위치정보 보관 및 파기
        </h2>
        
        <div className="pl-9">
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>회사는 서비스 제공 후 즉시 위치정보를 삭제하는 것을 원칙으로 합니다.</li>
            <li>단, 이용자의 지속적인 위치기반 서비스 이용을 위해 최대 6개월 동안 위치정보를 보관할 수 있으며, 이후 자동 삭제됩니다.</li>
            <li>법령에 따라 보관이 필요한 경우, 해당 법령에 따라 일정 기간 보관될 수 있습니다.</li>
          </ol>
        </div>
      </section>

      {/* 4. 위치정보 제공 및 공유 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4 flex items-center">
          <span className="flex items-center justify-center bg-yellow-400 text-white rounded-full w-7 h-7 mr-2 text-sm font-bold">4</span>
          위치정보 제공 및 공유
        </h2>
        
        <div className="pl-9">
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>회사는 이용자의 동의 없이 위치정보를 제3자에게 제공하지 않습니다.</li>
            <li>단, 법령에 따라 수사기관 등의 요청이 있을 경우, 관련 법령에 따라 제공될 수 있습니다.</li>
          </ol>
        </div>
      </section>

      {/* 5. 이용자의 권리 및 거부 방법 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4 flex items-center">
          <span className="flex items-center justify-center bg-yellow-400 text-white rounded-full w-7 h-7 mr-2 text-sm font-bold">5</span>
          이용자의 권리 및 거부 방법
        </h2>
        
        <div className="pl-9">
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>이용자는 서비스 내 설정을 통해 위치정보 제공을 거부하거나 동의를 철회할 수 있습니다.</li>
            <li>위치정보 제공을 거부하면 일부 디저트 탐색, 추천, 필터링 및 지도 기능 이용이 제한될 수 있습니다.</li>
          </ol>
        </div>
      </section>

      {/* 6. 위치정보관리책임자 및 문의 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4 flex items-center">
          <span className="flex items-center justify-center bg-yellow-400 text-white rounded-full w-7 h-7 mr-2 text-sm font-bold">6</span>
          위치정보관리책임자 및 문의
        </h2>
        
        <div className="pl-9">
          <p className="mb-3 text-gray-700">위치정보와 관련된 문의사항이 있을 경우, 회사의 위치정보관리책임자에게 연락하실 수 있습니다.</p>
          <ul className="list-none space-y-1 text-gray-700">
            <li><span className="font-medium">책임자:</span> 전채연</li>
            <li><span className="font-medium">이메일:</span> jcystory1@gmail.com</li>
            <li><span className="font-medium">연락처:</span> 010-9988-2978</li>
          </ul>
        </div>
      </section>

      {/* 7. 약관 변경 및 고지 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[#393939] mb-4 flex items-center">
          <span className="flex items-center justify-center bg-yellow-400 text-white rounded-full w-7 h-7 mr-2 text-sm font-bold">7</span>
          약관 변경 및 고지
        </h2>
        
        <div className="pl-9">
          <p className="mb-3 text-gray-700">본 약관은 법령 및 회사 정책에 따라 변경될 수 있으며, 변경 시 사전에 공지됩니다.</p>
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
