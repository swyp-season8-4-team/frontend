'use client';

import { useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useRegister } from '../_contexts/RegisterContext';
import { registerStore } from './action';
import { NavigationPathname } from '@repo/entity/src/navigation';
import MapService from '@repo/usecase/src/mapService';
import KakaoMapController from '@repo/infrastructures/src/controllers/kakaoMapController';
import { KakaoMapAdapter } from '@repo/infrastructures/src/adapters/kakaoMapAdapter';
import Script from 'next/script';
import type { RegisterStoreFromData } from '@repo/entity/src/store';
import { UserContext } from '@/contexts/UserContext';
import { HTTPError } from '@repo/api/src/error';

const KAKAO_MAP_API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;

export default function RegisterLoadingPage() {
  const { user } = useContext(UserContext);

  const router = useRouter();
  const { formData, storeData, updateBasicInfo } = useRegister();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [mapService, setMapService] = useState<MapService | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 첫 번째 렌더링에서만 실행되도록 ref 사용
  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (isScriptLoaded && !mapService) {
      kakao.maps.load(() => {
        const tempDiv = document.createElement('div');
        const map = new kakao.maps.Map(tempDiv, {
          center: new kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        });

        const adapter = new KakaoMapAdapter(map);
        const controller = new KakaoMapController();
        controller['map'] = adapter;

        setMapService(new MapService({ mapController: controller }));
      });
    }
  }, [isScriptLoaded, mapService]);

  useEffect(() => {
    const submitForm = async () => {
      // 이미 제출했거나 mapService가 없으면 실행하지 않음
      if (!mapService || hasSubmitted.current) return;

      // 제출 상태 표시
      hasSubmitted.current = true;

      try {
        const coordinates = await mapService.convertAddressToCoordinates(
          storeData.address,
        );

        if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
          console.error('주소를 좌표로 변환하는데 실패했습니다.');
          alert(
            '주소를 지도 좌표로 변환하는데 실패했습니다. 다시 시도해주세요.',
          );
          router.back();
          return;
        }

        updateBasicInfo({
          name: storeData.name,
          phone: storeData.phone,
          address: storeData.address,
          detailAddress: storeData.detailAddress,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        });

        const formattedMenus = storeData.menus.map((menu) => ({
          name: menu.name,
          price: menu.price,
          description: menu.description || '',
          isPopular: false,
          ...(menu.imageFileKey ? { imageFileKey: menu.imageFileKey } : {}),
        }));

        const updatedStoreFormData: RegisterStoreFromData = {
          request: {
            userUuid: user?.id as string,
            name: storeData.name,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            phone: storeData.phone,
            address: `${storeData.address} ${storeData.detailAddress}`.trim(),
            storeLinks: storeData.storeLinks || [],

            // 특성 정보를 최상위에 직접 포함
            animalYn: storeData.animalYn,
            tumblerYn: storeData.tumblerYn,
            parkingYn: storeData.parkingYn,

            averageRating: 0,
            // status: 'PENDING',

            // 운영 정보
            operatingHours: storeData.operatingHours,
            holidays: storeData.holidays || [],

            // 메뉴 정보
            menus: formattedMenus,

            // 설명 및 기타 정보
            description: storeData.description || '',
            tagIds: storeData.tagIds || [],
          },
          // 파일 데이터
          storeImageFiles: storeData._storeImageFiles,
          ownerPickImageFiles: storeData._ownerPickImageFiles,
          menuImageFiles: Array.from(storeData.menuImageMap.values()),
        };

        await registerStore(updatedStoreFormData);
        // console.log(updatedStoreFormData);
        router.push(`${NavigationPathname.OwnerRegisterComplete}`);
      } catch (error) {
        // 오류 발생 시 제출 상태 초기화
        hasSubmitted.current = false;
        if (error instanceof HTTPError) {
          console.log(error.data);
        }
        if (error instanceof Error) {
          console.log(error.message);
        }
        alert('가게 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
        router.back();
      }
    };

    submitForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapService]);

  return (
    <>
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        async
        src={KAKAO_MAP_API_URL}
        onReady={() => {
          if (!isScriptLoaded) {
            setIsScriptLoaded(true);
          }
        }}
      />
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg font-semibold">가게 등록 중...</div>
          <div className="text-sm text-gray-500">잠시만 기다려주세요</div>
        </div>
      </div>
    </>
  );
}
