'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type {
  RegisterStoreRequest,
  Menu,
  OperatingHoursItem,
  HolidaysItem,
} from '@repo/entity/src/store';
import { useRouter, usePathname } from 'next/navigation';

// 등록 단계 정의 (기존 코드 상단에 추가)
export enum RegisterStep {
  BASIC_INFO = 0,
  MENU = 1,
  // CHECK = 2,
  // COMPLETE = 3,
  COMPLETE = 2,
}

// 단계별 경로 정의
export const STEP_PATHNAME: Record<RegisterStep, string> = {
  [RegisterStep.BASIC_INFO]: '/owner/register/basic-info',
  [RegisterStep.MENU]: '/owner/register/menu',
  // [RegisterStep.CHECK]: '/owner/register/check',  //NOTICE: 내용 확인 갑자기 없어짐(논의 안된채로..) 또 생길 수 있어서 남겨둠
  [RegisterStep.COMPLETE]: '/owner/register/complete',
};

// 경로와 단계 매핑 (기존 코드 상단에 추가)
export const PATH_TO_STEP: Record<string, RegisterStep> = {
  '/owner/register/basic-info': RegisterStep.BASIC_INFO,
  '/owner/register/menu': RegisterStep.MENU,
  // '/owner/register/check': RegisterStep.CHECK,
  '/owner/register/complete': RegisterStep.COMPLETE,
};

// 단계와 경로 매핑 (기존 코드 상단에 추가)
export const STEP_TO_PATH: Record<RegisterStep, string> = {
  [RegisterStep.BASIC_INFO]: '/owner/register/basic-info',
  [RegisterStep.MENU]: '/owner/register/menu',
  // [RegisterStep.CHECK]: '/owner/register/check',
  [RegisterStep.COMPLETE]: '/owner/register/complete',
};

interface StoreData extends RegisterStoreRequest {
  detailAddress: string;
  // 메뉴 이미지 파일과 썸네일 관리를 위한 필드 추가
  menuImageMap: Map<string, File>;
  menuThumbnailUrls: Map<string, string>;
}

// 초기 상태 정의
const initialStoreData: StoreData = {
  // 기본 정보
  name: '',
  phone: '',
  address: '',
  detailAddress: '',

  storeLink: '',
  latitude: 0,
  longitude: 0,

  // 특성 정보
  animalYn: false,
  tumblerYn: false,
  parkingYn: false,

  // 평점 및 태그
  averageRating: 0,
  tagIds: [],

  // 상태 정보
  status: 'ACTIVE', // 기본값

  // 운영 정보
  operatingHours: [],
  holidays: [],

  // 설명 정보
  description: '',
  notice: [], // 주의: Store에서는 string[] 타입

  // 사용자 정보
  userUuid: '', // 로그인 시 설정

  // 메뉴 정보
  menus: [],

  // 이미지 파일
  storeImageFiles: [],
  ownerPickImageFiles: [],
  menuImageFiles: [],

  menuImageMap: new Map(),
  menuThumbnailUrls: new Map(),
};

// Context 타입 정의
type RegisterContextType = {
  // 상태
  storeData: StoreData;
  currentStep: number;
  isSubmitting: boolean;
  error: string | null;
  completedSteps: RegisterStep[];

  // 단계 관리
  setCurrentStep: (step: number) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  isStepCompleted: (step: RegisterStep) => boolean;
  canAccessStep: (step: RegisterStep) => boolean;
  completeStep: (step: RegisterStep) => void;
  redirectToStep: (step: RegisterStep) => void;
  getCurrentStepFromPath: () => RegisterStep;

  // 기본 정보 업데이트
  updateBasicInfo: (data: {
    name: string;
    phone: string;
    address: string;
    detailAddress: string; // 클라이언트에서만 사용, api 연동할 때 address랑 합쳐야함
    latitude: number;
    longitude: number;
    storeLink?: string;
    description?: string;
  }) => void;

  // 특성 정보 업데이트
  updateFeatures: (features: {
    animalYn?: boolean;
    tumblerYn?: boolean;
    parkingYn?: boolean;
  }) => void;

  // 태그 관리
  updateTags: (tagIds: number[]) => void;

  // 운영 시간 관리
  updateOperatingHours: (operatingHours: OperatingHoursItem[]) => void;
  addOperatingHour: (operatingHour: OperatingHoursItem) => void;
  updateOperatingHour: (
    index: number,
    operatingHour: Partial<OperatingHoursItem>,
  ) => void;
  removeOperatingHour: (index: number) => void;

  // 휴무일 관리
  updateHolidays: (holidays: HolidaysItem[]) => void;
  addHoliday: (holiday: HolidaysItem) => void;
  updateHoliday: (index: number, holiday: Partial<HolidaysItem>) => void;
  removeHoliday: (index: number) => void;

  // 공지사항 관리
  updateNotice: (notice: string[]) => void;
  addNoticeItem: (item: string) => void;
  updateNoticeItem: (index: number, item: string) => void;
  removeNoticeItem: (index: number) => void;

  // 이미지 파일 관리
  updateStoreImages: (files: File[]) => void;
  updateOwnerPickImages: (files: File[]) => void;
  updateMenuImages: (files: File[]) => void;

  // 메뉴 관리
  updateMenus: (menus: Menu[]) => void;
  addMenu: (menu: Omit<Menu, 'menuUuid' | 'images'>) => void;
  updateMenu: (
    index: number,
    menu: Partial<Omit<Menu, 'menuUuid' | 'images'>>,
  ) => void;
  removeMenu: (index: number) => void;

  // 메뉴 이미지 연결
  setMenuImageFile: (menuIndex: number, file: File) => void;

  // 폼 제출
  submitForm: () => Promise<{
    success: boolean;
    storeId?: string;
    error?: string;
  }>;

  // 유효성 검사
  validateCurrentStep: () => boolean;
  getStepErrors: () => string[];

  // 데이터 변경 추적
  isFormDirty: boolean;
  setIsFormDirty: (isDirty: boolean) => void;

  // 단계별 경로 가져오기 (언어 포함)
  getStepPath: (step: RegisterStep) => string;

  // 메뉴 이미지 관리
  updateMenuImage: (menuId: string, file: File) => void;
  removeMenuImage: (menuId: string) => void;
  getMenuImage: (menuId: string) => File | undefined;
  getMenuThumbnailUrl: (menuId: string) => string | undefined;
};

// Context 생성
const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined,
);

// Context Provider 컴포넌트
export function RegisterProvider({ children }: { children: ReactNode }) {
  // 상태 정의
  const [storeData, setStoreData] = useState<StoreData>(initialStoreData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stepErrors, setStepErrors] = useState<string[]>([]);
  const [completedSteps, setCompletedSteps] = useState<RegisterStep[]>([]);

  // 메뉴와 이미지 파일 매핑 (메뉴 인덱스 -> 파일 인덱스)
  const [menuImageMapping, setMenuImageMapping] = useState<Map<number, number>>(
    new Map(),
  );

  // 폼 데이터 변경 여부 추적
  const [isFormDirty, setIsFormDirty] = useState(false);

  // 라우터
  const router = useRouter();
  const pathname = usePathname();

  // 데이터 변경 시 isFormDirty 설정
  useEffect(() => {
    // 초기 상태와 현재 상태 비교
    if (JSON.stringify(initialStoreData) !== JSON.stringify(storeData)) {
      setIsFormDirty(true);
    }
  }, [storeData]);

  // 단계 관리 함수
  const goToNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // 기본 정보 업데이트
  const updateBasicInfo = (data: {
    name?: string;
    phone?: string;
    address?: string;
    storeLink?: string;
    latitude?: number;
    longitude?: number;
    description?: string;
  }) => {
    setStoreData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // 특성 정보 업데이트
  const updateFeatures = (features: {
    animalYn?: boolean;
    tumblerYn?: boolean;
    parkingYn?: boolean;
  }) => {
    setStoreData((prev) => ({
      ...prev,
      ...features,
    }));
  };

  // 태그 관리
  const updateTags = (tagIds: number[]) => {
    setStoreData((prev) => ({
      ...prev,
      tagIds,
    }));
  };

  // 운영 시간 관리
  const updateOperatingHours = (operatingHours: OperatingHoursItem[]) => {
    setStoreData((prev) => ({
      ...prev,
      operatingHours,
    }));
  };

  const addOperatingHour = (operatingHour: OperatingHoursItem) => {
    setStoreData((prev) => ({
      ...prev,
      operatingHours: [...prev.operatingHours, operatingHour],
    }));
  };

  const updateOperatingHour = (
    index: number,
    operatingHour: Partial<OperatingHoursItem>,
  ) => {
    setStoreData((prev) => {
      const updatedHours = [...prev.operatingHours];
      updatedHours[index] = { ...updatedHours[index], ...operatingHour };
      return {
        ...prev,
        operatingHours: updatedHours,
      };
    });
  };

  const removeOperatingHour = (index: number) => {
    setStoreData((prev) => {
      const updatedHours = [...prev.operatingHours];
      updatedHours.splice(index, 1);
      return {
        ...prev,
        operatingHours: updatedHours,
      };
    });
  };

  // 휴무일 관리
  const updateHolidays = (holidays: HolidaysItem[]) => {
    setStoreData((prev) => ({
      ...prev,
      holidays,
    }));
  };

  const addHoliday = (holiday: HolidaysItem) => {
    setStoreData((prev) => ({
      ...prev,
      holidays: [...prev.holidays, holiday],
    }));
  };

  const updateHoliday = (index: number, holiday: Partial<HolidaysItem>) => {
    setStoreData((prev) => {
      const updatedHolidays = [...prev.holidays];
      updatedHolidays[index] = { ...updatedHolidays[index], ...holiday };
      return {
        ...prev,
        holidays: updatedHolidays,
      };
    });
  };

  const removeHoliday = (index: number) => {
    setStoreData((prev) => {
      const updatedHolidays = [...prev.holidays];
      updatedHolidays.splice(index, 1);
      return {
        ...prev,
        holidays: updatedHolidays,
      };
    });
  };

  // 공지사항 관리
  const updateNotice = (notice: string[]) => {
    setStoreData((prev) => ({
      ...prev,
      notice,
    }));
  };

  const addNoticeItem = (item: string) => {
    setStoreData((prev) => ({
      ...prev,
      notice: [...prev.notice, item],
    }));
  };

  const updateNoticeItem = (index: number, item: string) => {
    setStoreData((prev) => {
      const updatedNotice = [...prev.notice];
      updatedNotice[index] = item;
      return {
        ...prev,
        notice: updatedNotice,
      };
    });
  };

  const removeNoticeItem = (index: number) => {
    setStoreData((prev) => {
      const updatedNotice = [...prev.notice];
      updatedNotice.splice(index, 1);
      return {
        ...prev,
        notice: updatedNotice,
      };
    });
  };

  // 메뉴 관리
  const updateMenus = (menus: Menu[]) => {
    setStoreData((prev) => ({
      ...prev,
      menus,
    }));
  };

  const addMenu = (menu: Omit<Menu, 'menuUuid' | 'images'>) => {
    setStoreData((prev) => ({
      ...prev,
      menus: [...prev.menus, menu as Menu],
    }));
  };

  const updateMenu = (
    index: number,
    menu: Partial<Omit<Menu, 'menuUuid' | 'images'>>,
  ) => {
    setStoreData((prev) => {
      const updatedMenus = [...prev.menus];
      updatedMenus[index] = { ...updatedMenus[index], ...menu };
      return {
        ...prev,
        menus: updatedMenus,
      };
    });
  };

  const removeMenu = (index: number) => {
    setStoreData((prev) => {
      const updatedMenus = [...prev.menus];
      updatedMenus.splice(index, 1);

      // 메뉴 이미지 매핑 업데이트
      const newMapping = new Map(menuImageMapping);
      newMapping.delete(index);

      // 인덱스 조정
      const adjustedMapping = new Map<number, number>();
      newMapping.forEach((fileIndex, menuIdx) => {
        if (menuIdx > index) {
          adjustedMapping.set(menuIdx - 1, fileIndex);
        } else {
          adjustedMapping.set(menuIdx, fileIndex);
        }
      });

      setMenuImageMapping(adjustedMapping);

      return {
        ...prev,
        menus: updatedMenus,
      };
    });
  };

  // 이미지 파일 관리
  const updateStoreImages = (files: File[]) => {
    setStoreData((prev) => ({
      ...prev,
      storeImageFiles: files,
    }));
  };

  const updateOwnerPickImages = (files: File[]) => {
    setStoreData((prev) => ({
      ...prev,
      ownerPickImageFiles: files,
    }));
  };

  const updateMenuImages = (files: File[]) => {
    setStoreData((prev) => ({
      ...prev,
      menuImageFiles: files,
    }));
  };

  // 메뉴 이미지 연결
  const setMenuImageFile = (menuIndex: number, file: File) => {
    // 기존 menuImageFiles 배열에 추가
    setStoreData((prev) => {
      const updatedMenuImageFiles = [...(prev.menuImageFiles || []), file];
      const fileIndex = updatedMenuImageFiles.length - 1;

      // 메뉴와 이미지 파일 매핑 업데이트
      const newMapping = new Map(menuImageMapping);
      newMapping.set(menuIndex, fileIndex);
      setMenuImageMapping(newMapping);

      // 메뉴의 imageFileKey 업데이트
      const updatedMenus = [...prev.menus];
      updatedMenus[menuIndex] = {
        ...updatedMenus[menuIndex],
        imageFileKey: [file.name], // 파일명을 imageFileKey로 설정
      };

      return {
        ...prev,
        menuImageFiles: updatedMenuImageFiles,
        menus: updatedMenus,
      };
    });
  };

  // 유효성 검사
  const validateCurrentStep = () => {
    const errors: string[] = [];

    switch (currentStep) {
      case 1: // 기본 정보
        if (!storeData.name) errors.push('가게 이름을 입력해주세요.');
        if (!storeData.phone) errors.push('전화번호를 입력해주세요.');
        if (!storeData.address) errors.push('주소를 입력해주세요.');
        break;

      case 2: // 운영 정보
        if (storeData.operatingHours.length === 0) {
          errors.push('영업 시간을 최소 하나 이상 입력해주세요.');
        }
        break;

      case 3: // 메뉴 정보
        if (storeData.menus.length === 0) {
          errors.push('메뉴를 최소 하나 이상 입력해주세요.');
        }
        break;

      // 추가 단계에 대한 유효성 검사
    }

    setStepErrors(errors);
    return errors.length === 0;
  };

  const getStepErrors = () => stepErrors;

  // 폼 제출
  const submitForm = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // 필수 필드 검증
      if (!storeData.name || !storeData.phone || !storeData.address) {
        throw new Error(
          '필수 정보가 누락되었습니다. (가게 이름, 전화번호, 주소는 필수입니다.)',
        );
      }

      if (!storeData.userUuid) {
        throw new Error('사용자 정보가 없습니다. 로그인 후 다시 시도해주세요.');
      }

      // FormData 객체 생성
      const formData = new FormData();

      // 기본 데이터를 JSON으로 변환하여 추가
      const basicData = { ...storeData };
      delete basicData.storeImageFiles;
      delete basicData.ownerPickImageFiles;
      delete basicData.menuImageFiles;

      formData.append('data', JSON.stringify(basicData));

      // 이미지 파일 추가
      if (storeData.storeImageFiles) {
        storeData.storeImageFiles.forEach((file, index) => {
          formData.append(`storeImage_${index}`, file);
        });
      }

      if (storeData.ownerPickImageFiles) {
        storeData.ownerPickImageFiles.forEach((file, index) => {
          formData.append(`ownerPickImage_${index}`, file);
        });
      }

      if (storeData.menuImageFiles) {
        storeData.menuImageFiles.forEach((file, index) => {
          formData.append(`menuImage_${index}`, file);
        });
      }

      // API 호출 //TODO: service 호출
      const response = await fetch('/api/stores', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '가게 등록에 실패했습니다.');
      }

      const result = await response.json();

      return {
        success: true,
        storeId: result.storeUuid,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '가게 등록에 실패했습니다.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  // 단계 완료 처리
  const completeStep = (step: RegisterStep): void => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
  };

  // 현재 경로에서 단계 가져오기
  const getCurrentStepFromPath = (): RegisterStep => {
    for (const [path, step] of Object.entries(PATH_TO_STEP)) {
      if (pathname.includes(path)) {
        return step;
      }
    }
    return RegisterStep.BASIC_INFO; // 기본값
  };

  // 단계별 경로 가져오기 (언어 포함)
  const getStepPath = (step: RegisterStep): string => {
    const basePath = STEP_TO_PATH[step];
    // 현재 경로에서 언어 부분 추출 (예: /ko/...)
    const langPrefix = pathname.split('/')[1];
    return `/${langPrefix}${basePath}`;
  };

  // 단계로 리다이렉트
  const redirectToStep = (step: RegisterStep): void => {
    const path = getStepPath(step);
    router.push(path);
  };

  // 메뉴 이미지 관리 함수들
  const updateMenuImage = (menuId: string, file: File) => {
    setStoreData((prev) => {
      const newImageMap = new Map(prev.menuImageMap);
      const newThumbnailUrls = new Map(prev.menuThumbnailUrls);

      // 기존 썸네일 URL이 있다면 해제
      const existingUrl = newThumbnailUrls.get(menuId);
      if (existingUrl) {
        URL.revokeObjectURL(existingUrl);
      }

      // 새로운 파일과 썸네일 URL 설정
      newImageMap.set(menuId, file);
      newThumbnailUrls.set(menuId, URL.createObjectURL(file));

      return {
        ...prev,
        menuImageMap: newImageMap,
        menuThumbnailUrls: newThumbnailUrls,
      };
    });
  };

  const removeMenuImage = (menuId: string) => {
    setStoreData((prev) => {
      const newImageMap = new Map(prev.menuImageMap);
      const newThumbnailUrls = new Map(prev.menuThumbnailUrls);

      // 썸네일 URL 해제
      const thumbnailUrl = newThumbnailUrls.get(menuId);
      if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl);
      }

      newImageMap.delete(menuId);
      newThumbnailUrls.delete(menuId);

      return {
        ...prev,
        menuImageMap: newImageMap,
        menuThumbnailUrls: newThumbnailUrls,
      };
    });
  };

  const getMenuImage = (menuId: string) => {
    return storeData.menuImageMap.get(menuId);
  };

  const getMenuThumbnailUrl = (menuId: string) => {
    return storeData.menuThumbnailUrls.get(menuId);
  };

  // cleanup effect
  useEffect(() => {
    return () => {
      // Provider가 언마운트될 때 모든 썸네일 URL 해제
      storeData.menuThumbnailUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  // Context 값 제공
  return (
    <RegisterContext.Provider
      value={{
        storeData,
        currentStep,
        isSubmitting,
        error,
        completedSteps,

        setCurrentStep,
        goToNextStep,
        goToPrevStep,

        isStepCompleted: (step: RegisterStep) => completedSteps.includes(step),
        canAccessStep: (step: RegisterStep) => {
          // Implement access logic based on completed steps
          return true; // Placeholder, actual implementation needed
        },
        completeStep,
        redirectToStep,
        getCurrentStepFromPath,
        getStepPath,

        updateBasicInfo,
        updateFeatures,
        updateTags,

        updateOperatingHours,
        addOperatingHour,
        updateOperatingHour,
        removeOperatingHour,

        updateHolidays,
        addHoliday,
        updateHoliday,
        removeHoliday,

        updateNotice,
        addNoticeItem,
        updateNoticeItem,
        removeNoticeItem,

        updateMenus,
        addMenu,
        updateMenu,
        removeMenu,

        updateStoreImages,
        updateOwnerPickImages,
        updateMenuImages,
        setMenuImageFile,

        submitForm,
        validateCurrentStep,
        getStepErrors,

        isFormDirty,
        setIsFormDirty,

        updateMenuImage,
        removeMenuImage,
        getMenuImage,
        getMenuThumbnailUrl,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

// Context 사용을 위한 Hook
export function useRegister() {
  const context = useContext(RegisterContext);

  if (context === undefined) {
    throw new Error('useRegister must be used within a RegisterProvider');
  }

  return context;
}
