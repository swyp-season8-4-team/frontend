'use client';

import Script from 'next/script';
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import React from 'react';

import storeMarkerImage from '@/app/[lang]/(user)/(menu)/(search)/map/_assets/svg/icon-marker.svg';
import userMarkerImage from '@/app/[lang]/(user)/(menu)/(search)/map/_assets/svg/icon-current-marker.svg';

import { PreferenceTags } from '../PreferenceTags';
import { MapPanel } from '../MapPanel';

import type { MapPosition } from '@repo/entity/src/map';

import GeolocationService from '@repo/usecase/src/geolocationService';
import GeolocationController from '@repo/infrastructures/src/controllers/geolocationController';
import { KalmanLocationFilter } from '@repo/infrastructures/src/filters/locationFilter';
import { MovingAverageFilter } from '@repo/infrastructures/src/filters/movingAverageFilter';

import MapService from '@repo/usecase/src/mapService';
import KakaoMapController from '@repo/infrastructures/src/controllers/kakaoMapController';

import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import SessionStorageRepository from '@repo/infrastructures/src/repositories/SessionStorageRepository';

import { KAKAO_MAP_API_URL } from '../../_consts/map';
import {
  type NearByStoreData,
  type PreferenceData,
} from '@repo/entity/src/store';

import { LocationPermissionModal } from '../../_modals/LocationPermissionModal';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { useRouter } from 'next/navigation';
import { GeolocationPermissionError } from '@repo/usecase/src/geolocationService';
import { ReFetchStoreBtn } from '../ReFetchStoreBtn';
import { calculateDistance } from '../../_utils/distance';
import { useTag } from '../../../_hooks/useTag';

interface KakaoMapProps {
  preferenceCategories: PreferenceData[];
}

// 서비스가 모두 초기화되었는지 확인하는 헬퍼 함수
const areServicesInitialized = (services: {
  mapService: MapService | null;
  geoService: GeolocationService | null;
  storeService: StoreService | null;
}) => {
  return services.mapService && services.geoService && services.storeService;
};

export function KakaoMap({ preferenceCategories }: KakaoMapProps) {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<{
    mapService: MapService | null;
    geoService: GeolocationService | null;
    storeService: StoreService | null;
  }>({
    mapService: null,
    geoService: null,
    storeService: null,
  });

  const sessionStorageRepository = useMemo(
    () => new SessionStorageRepository(),
    [],
  );

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isFetchRequired, setIsFetchRequired] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [currentPosition, setCurrentPosition] = useState<MapPosition>({
    latitude: 0,
    longitude: 0,
  });
  const [mapCenter, setMapCenter] = useState<MapPosition>({
    latitude: 0,
    longitude: 0,
  });

  const [nearByStores, setNearByStores] = useState<NearByStoreData[]>([]);

  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRY = 3;
  const RETRY_DELAY = 3000;

  // 필터링 태그 관리
  const {
    selectedCategories,
    isMyPreferSelected,
    updateSelectedTag,
    handleMyPreferenceTagClick,
    selectedPreferenceTags,
    clearSelectedCategories,
  } = useTag();

  // 위치 권한 요청 모달
  const { push, pop } = useContext(PortalContext);

  const closeModal = useCallback(() => {
    pop('modal');
  }, [pop]);

  const openPermissionModal = useCallback(() => {
    push('modal', {
      component: <LocationPermissionModal onClose={closeModal} />,
    });
  }, [closeModal, push]);

  // 제일 먼저 서비스 초기화
  const initializeServices = () => {
    const mapService = new MapService({
      mapController: new KakaoMapController(),
    });

    const geoService = new GeolocationService({
      geolocationController: new GeolocationController(
        new KalmanLocationFilter(),
        new MovingAverageFilter(3),
      ),
    });

    const storeService = new StoreService({
      storeRepository: new StoreAPIReopository(),
    });

    return { mapService, geoService, storeService };
  };

  // 화면 내 거리 계산
  const calculateFetchRadius = useCallback(() => {
    if (!servicesRef.current.mapService) {
      return 4000; // 기본값
    }

    const bounds = servicesRef.current.mapService.getMapBound();
    const center = servicesRef.current.mapService.getMapCenter();

    // 각 경계 지점까지의 거리 계산
    const distances = [
      calculateDistance(center, bounds.ne),
      calculateDistance(center, bounds.sw),
      calculateDistance(center, {
        latitude: bounds.ne.latitude,
        longitude: bounds.sw.longitude,
      }), // nw
      calculateDistance(center, {
        latitude: bounds.sw.latitude,
        longitude: bounds.ne.longitude,
      }), // se
    ];

    // 최대 거리 선택
    const maxDistance = Math.max(...distances);

    return maxDistance * 1000;
  }, []);

  // 가게
  const fetchNearbyStores = useCallback(
    async (
      position: MapPosition,
      preferenceTagIds?: number[],
      searchKeyword?: string,
    ) => {
      try {
        if (!servicesRef.current.storeService) {
          return null;
        }

        const fetchRadius = calculateFetchRadius();

        const nearByStores =
          await servicesRef.current.storeService!.getNearbyStores({
            latitude: position.latitude,
            longitude: position.longitude,
            radius: fetchRadius,
            preferenceTagIds,
            searchKeyword,
          });

        setNearByStores(nearByStores);

        setRetryCount(0);
        setError(null);
        return nearByStores;
      } catch {
        if (retryCount < MAX_RETRY) {
          setRetryCount((prev) => prev + 1);
          setTimeout(
            () => fetchNearbyStores(position, preferenceTagIds, searchKeyword),
            RETRY_DELAY,
          );
        } else {
          setError(
            '가게 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.',
          );
        }
        console.log(
          'fetchNearbyStores: 가게 정보 재시도에도 불러오기 실패, 주변 가게 불러오기 중지 🛑',
        );
        return null;
      }
    },
    [retryCount, calculateFetchRadius],
  );

  const handleMapCenterChange = useCallback(() => {
    if (servicesRef.current.mapService) {
      const center = servicesRef.current.mapService.getMapCenter();
      setMapCenter(center);
    }
  }, []);

  // 각 마커 클릭 - 바텀시트 열리고, 클릭한 마커 storeId 업데이트
  const handleStoreMarkerClick = useCallback(
    (storeId: string) => {
      if (!storeId) {
        console.log('storeId 없음' + storeId);
      } else {
        if (servicesRef.current.mapService) {
          const currentMapCenter =
            servicesRef.current.mapService.getMapCenter();
          sessionStorageRepository.set('lastPosition', currentMapCenter);
        }
        router.replace(`?storeId=${storeId}&bottomsheet=true`, {
          scroll: false,
        });
      }
    },
    [router, sessionStorageRepository],
  );

  // 지도 중심, 반경내 상점들 받아서 마커 및 클러스터 마커 추가
  const updateNewClusterMarkers = useCallback(
    async (stores: NearByStoreData[]) => {
      if (!areServicesInitialized(servicesRef.current)) {
        return;
      }
      try {
        await servicesRef.current.mapService?.clearAllMarkers();

        if (stores.length !== 0) {
          await servicesRef.current.mapService?.addMarkersWithClustering(
            stores,
            storeMarkerImage.src,
            handleStoreMarkerClick,
          );
        } else {
          setError('주변 가게가 없습니다');
        }
      } catch {
        setError('가게 정보 업데이트에 실패했습니다.');
      }
    },
    [servicesRef, handleStoreMarkerClick],
  );

  const [hasUpdatedPosition, setHasUpdatedPosition] = useState(false);

  // 현재 위치 마커 참조를 유지하기 위한 ref 추가
  const currentPositionMarkerRef = useRef<any>(null);

  const updateCurrentMarker = useCallback(
    async (position: MapPosition) => {
      try {
        if (!areServicesInitialized(servicesRef.current)) {
          return;
        }

        // 이미 마커가 있으면 제거하지 말고 위치만 업데이트
        if (currentPositionMarkerRef.current) {
          // 마커 위치 업데이트만 수행 (제거하지 않음)
          await servicesRef.current.mapService?.updateCurrentPositionMarker(
            position,
            currentPositionMarkerRef.current,
          );
        } else {
          // 마커가 없는 경우만 새로 추가
          const marker =
            await servicesRef.current.mapService?.addCurrentPositionMarker(
              position,
              userMarkerImage.src,
            );
          // 마커 참조 저장
          currentPositionMarkerRef.current = marker;
        }

        setCurrentPosition(position);

        if (!hasUpdatedPosition) {
          setHasUpdatedPosition(true);
        }
      } catch (error) {
        console.error('위치 마커 업데이트 중 오류: ', error);
        if (
          error instanceof GeolocationPermissionError &&
          error.message === 'PERMISSION_DENIED'
        ) {
          console.log(
            'updateCurrentMarker: 위치 권한 거부됨, 권한 요청 모달 표시 🪧',
          );
          openPermissionModal();
        } else {
          console.error('updateCurrentMarker: 위치 권한 외 오류 발생', error);
        }
        return;
      }
    },
    [openPermissionModal, hasUpdatedPosition],
  );

  // 첫 위치 가져오기(현재 위치)
  const handleInitialGeoPositonFetch = async (
    initializedServices: {
      geoService: GeolocationService;
    },
    openPermissionModal: () => void,
  ) => {
    const permissionStatus = await navigator.permissions.query({
      name: 'geolocation',
    });

    if (permissionStatus.state === 'denied') {
      openPermissionModal();
      return null;
    }

    const result = await initializedServices.geoService.getCurrentPosition();

    if ('errorMessage' in result) {
      console.log('handleInitialGeoPositonFetch: 오류 발생 ⚠️:', {
        message: result.errorMessage,
        type: result.errorType,
      });
      console.log(
        'handleInitialGeoPositonFetch: 현재 위치 권한 상태 다시 확인:',
        {
          state: permissionStatus.state,
          errorType: result.errorType,
        },
      );

      if (result.errorType === 'POSITION_UNAVAILABLE') {
        console.log('handleInitialGeoPositonFetch: GPS 사용 불가');
        setError('GPS를 활성화하고 다시 시도해주세요.');
      } else if (result.errorType === 'TIMEOUT') {
        console.log('handleInitialGeoPositonFetch: 위치 정보 요청 시간 초과');
        setError('위치 정보를 가져오는데 시간이 너무 오래 걸립니다.');
      } else {
        setError('위치 정보를 가져오는데 실패했습니다.');
      }
      return null;
    }

    setCurrentPosition(result);

    return result;
  };

  // 지도 첫 초기화
  const loadMap = useCallback(
    async (initializedServices: {
      mapService: MapService;
      geoService: GeolocationService;
      storeService: StoreService;
    }) => {
      if (!mapRef.current) {
        console.error('loadMap: Map container not found (mapRef.current falsy');
        return;
      }

      try {
        // 첫 위치는 현재 위치
        const result = await handleInitialGeoPositonFetch(
          initializedServices,
          openPermissionModal,
        );

        if (!result) {
          return;
        }

        await initializedServices.mapService.initializeMap(
          mapRef.current,
          result,
        );

        initializedServices.mapService.addCenterChangedListener(
          handleMapCenterChange,
        );

        await initializedServices.mapService.addCurrentPositionMarker(
          result,
          userMarkerImage.src,
        );

        await initializedServices.geoService.startWatchingPosition(
          updateCurrentMarker,
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          },
        );

        await initializedServices.mapService.setMapCenter(result);

        await initializedServices.mapService.addMarkersWithClustering(
          nearByStores,
          storeMarkerImage.src,
          handleStoreMarkerClick,
        );
      } catch (err) {
        if (err instanceof GeolocationPermissionError) {
          if (err.message === 'PERMISSION_DENIED') {
            openPermissionModal();
          }
        } else {
          setError('지도 로딩에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      }
    },
    [
      handleMapCenterChange,
      handleStoreMarkerClick,
      nearByStores,
      openPermissionModal,
      updateCurrentMarker,
    ],
  );

  // 현재 유저 위치로 이동
  const handleMoveToCurrentPosition = useCallback(() => {
    if (servicesRef.current.mapService && isMapLoaded) {
      servicesRef.current.mapService.setMapCenter(currentPosition);
    }
  }, [isMapLoaded, currentPosition]);

  const mapCenterRef = useRef(mapCenter);

  useEffect(() => {
    mapCenterRef.current = mapCenter;
  }, [mapCenter]);

  // 검색어 상태 추가
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // URL 해시 변경 감지
  useEffect(() => {
    // 초기 해시 확인
    const checkInitialHash = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash;
        if (hash.startsWith('#q=')) {
          const query = decodeURIComponent(hash.substring(3));
          setSearchKeyword(query);
          // 검색어가 있으면 즉시 바텀시트 표시
          // setShowBottomSheet(!!query);
          console.log('Initial hash detected, setting bottom sheet:', !!query);
        } else {
          setSearchKeyword('');
          // setShowBottomSheet(false);
        }
      }
    };

    // 해시 변경 이벤트 핸들러
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#q=')) {
        const query = decodeURIComponent(hash.substring(3));
        setSearchKeyword(query);
      } else {
        setSearchKeyword('');
      }
    };

    // 초기 해시 확인
    checkInitialHash();

    // 해시 변경 이벤트 리스너 등록
    window.addEventListener('hashchange', handleHashChange);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // 지도 중심만 받아와서 가게 fetch
  useEffect(() => {
    if (isFetchRequired) {
      const fetchAndUpdate = async () => {
        const stores = await fetchNearbyStores(mapCenterRef.current);
        if (stores) {
          await updateNewClusterMarkers(stores);
          setIsFetchRequired(false);
        }
      };
      fetchAndUpdate();
    }
  }, [isFetchRequired, fetchNearbyStores, updateNewClusterMarkers]);

  // 태그, 검색 포함 필터링 적용된 가게 fetch
  const previousSelectedTagsRef = useRef<number[]>([]);
  const previousSearchKeywordRef = useRef<string>('');

  useEffect(() => {
    if (
      JSON.stringify(previousSelectedTagsRef.current) !==
        JSON.stringify(selectedPreferenceTags) ||
      previousSearchKeywordRef.current !== searchKeyword
    ) {
      const fetchAndUpdate = async () => {
        const stores = await fetchNearbyStores(
          mapCenterRef.current,
          selectedPreferenceTags,
          searchKeyword,
        );

        if (stores) {
          await updateNewClusterMarkers(stores);
          setIsFetchRequired(false);

          // 약간의 지연을 두어 상태 업데이트가 확실히 반영되도록 함
          setTimeout(() => {
            setNearByStores(stores);
          }, 100);
        }
      };
      fetchAndUpdate();
      previousSelectedTagsRef.current = selectedPreferenceTags;
      previousSearchKeywordRef.current = searchKeyword;
    }
  }, [
    selectedPreferenceTags,
    searchKeyword,
    fetchNearbyStores,
    updateNewClusterMarkers,
  ]);

  // 에러 메시지
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [error]);

  // 카카오맵 초기화 로직
  useEffect(() => {
    if (isScriptLoaded && !isInitialized && mapRef.current) {
      window.kakao.maps.load(() => {
        try {
          // 서비스 초기화
          const initializedServices = initializeServices();
          servicesRef.current = initializedServices;

          // 지도 로드
          loadMap(initializedServices)
            .then(() => {
              setIsMapLoaded(true);
              setIsInitialized(true);
              setIsFetchRequired(true);

              // 지도가 완전히 초기화된 후 sessionStorage 삭제
              // 이렇게 하면 새로고침 시 geolocation을 사용하고,
              // 바텀시트나 상세페이지에서 돌아왔을 때는 이미 사용했으므로 문제 없음
              setTimeout(() => {
                sessionStorageRepository.delete('lastPosition');
              }, 1000);
            })
            .catch((err) => {
              console.error('지도 로드 실패:', err);
              setError('지도 초기화에 실패했습니다.');
            });
        } catch (error) {
          console.error('서비스 초기화 실패:', error);
          setError('지도 초기화 중 오류가 발생했습니다.');
        }
      });
    }
  }, [isScriptLoaded, isInitialized, loadMap, sessionStorageRepository]);

  // 컴포넌트 언마운트 시
  useEffect(() => {
    return () => {
      // 조건부 검사 없이 항상 시도
      try {
        if (servicesRef.current.geoService) {
          servicesRef.current.geoService.stopWatchingPosition();
        }

        if (servicesRef.current.mapService) {
          // 모든 리소스 정리
          servicesRef.current.mapService.clearAllMarkers();

          // currentPositionMarker 참조 해제
          if (currentPositionMarkerRef.current) {
            servicesRef.current.mapService.removeCurrentPositionMarker();
            currentPositionMarkerRef.current = null;
          }

          // 이벤트 리스너 정리
          if (isInitialized) {
            servicesRef.current.mapService.removeAllEventListeners();
          }
        }

        console.log('모든 지도 리소스가 정리되었습니다.');
      } catch (error) {
        console.error('지도 리소스 정리 중 오류:', error);
      }
    };
  }, [isInitialized]);

  const preferenceTagsProps = useMemo(
    () => ({
      categories: preferenceCategories,
      isMyPreferSelected,
      handleMyPreferenceTagClick,
      updateSelectedTag,
      selectedCategories,
    }),
    [
      preferenceCategories,
      handleMyPreferenceTagClick,
      isMyPreferSelected,
      updateSelectedTag,
      selectedCategories,
    ],
  );

  // 버튼에 연동
  const mapPanelProps = useMemo(
    () => ({
      moveToCurrentPosition: handleMoveToCurrentPosition,
    }),
    [handleMoveToCurrentPosition],
  );

  const handleRefetchBtnClick = () => {
    setIsFetchRequired(true);
  };

  // URL 쿼리 파라미터 감지 및 처리
  useEffect(() => {
    if (typeof window !== 'undefined' && isMapLoaded) {
      // 마지막 위치가 있으면 해당 위치로 이동
      const lastPosition = sessionStorageRepository.get(
        'lastPosition',
      ) as MapPosition;

      if (lastPosition && servicesRef.current.mapService) {
        servicesRef.current.mapService.setMapCenter(lastPosition);
        setMapCenter(lastPosition);

        // 이동 후에는 삭제하지 않음 (지도 초기화 완료 후 삭제됨)
      }
    }
  }, [isMapLoaded, sessionStorageRepository]);

  return (
    <div>
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
      <div
        ref={mapRef}
        className="relative bg-[#E8E8E8] mb-[9px] rounded-base w-full h-[calc(100dvh-295px)] overflow-x-hidden"
      >
        {error && (
          <div className="top-1/3  left-1/2 z-20 absolute bg-red-100 px-4 py-2 border border-red-400 rounded text-red-700 -translate-x-1/2 transform">
            {error}
          </div>
        )}
        <PreferenceTags {...preferenceTagsProps} />
        <MapPanel {...mapPanelProps} />
        <ReFetchStoreBtn
          clearSelectedCategories={clearSelectedCategories}
          refetchStore={handleRefetchBtnClick}
        />
      </div>
    </div>
  );
}

export default React.memo(KakaoMap);
