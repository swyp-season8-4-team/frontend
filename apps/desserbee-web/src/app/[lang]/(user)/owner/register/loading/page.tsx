'use client';

import { useContext, useEffect, useState } from 'react';
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

const KAKAO_MAP_API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;

export default function RegisterLoadingPage() {
  const { user } = useContext(UserContext);

  const router = useRouter();
  const { formData, updateFormData, storeData } = useRegister();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [mapService, setMapService] = useState<MapService | null>(null);

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
      if (!mapService) return;

      try {
        // 주소를 좌표로 변환
        const coordinates = await mapService.convertAddressToCoordinates(
          storeData.address,
        );

        const {
          _storeImageFiles,
          _ownerPickImageFiles,
          _menuImageFiles,
          detailAddress,
          menuImageMap,
          menuThumbnailUrls,
        
          ...rest
        } = storeData;

        const updatedStoreFormData: RegisterStoreFromData = {
          request: {
            ...rest,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            address: `${storeData.address} ${storeData.detailAddress}`.trim(),
            userUuid: user?.id as string,
          },
          storeImageFiles: _storeImageFiles,
          ownerPickImageFiles: _ownerPickImageFiles,
          menuImageFiles: _menuImageFiles,
        };

        console.log(updatedStoreFormData);
        // 서버 액션 실행
        await registerStore(updatedStoreFormData);

        router.push(`${NavigationPathname.OwnerRegisterComplete}`);
      } catch (error) {
        console.error('가게 등록 중 오류 발생:', error);
        router.back();
      }
    };

    if (mapService) {
      submitForm();
    }
  }, [mapService, formData, router, storeData, user?.id]);

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
