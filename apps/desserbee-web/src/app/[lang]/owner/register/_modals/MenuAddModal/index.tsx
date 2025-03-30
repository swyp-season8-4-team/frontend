import type { Menu } from '@repo/entity/src/store';
import { StoreRegisterHeader } from '../../_components/StoreRegisterHeader';
import { Controller, useForm } from 'react-hook-form';
import IconPicture from '@repo/design-system/components/icons/IconPicture';
import Image from 'next/image';

interface MenuAddModalProps {
  onClose: (menu?: Menu, imageFiles?: File[]) => void;
}

interface MenuInput extends Menu {
  menuImageFiles?: File[];
  imageFileKey?: string[];
}

export function MenuAddModal({ onClose }: MenuAddModalProps) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
    reset,
  } = useForm<MenuInput>({
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      imageFileKey: [],
      menuImageFiles: [],
    },
  });

  const handleImageFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setValue('menuImageFiles', [fileArray[0]]);
      setValue('imageFileKey', [fileArray[0].name]);
    }
  };

  const handleRemoveImageFiles = (index: number) => {
    const currentFiles = watch('menuImageFiles') || [];
    const currentFileKeys = watch('imageFileKey') || [];

    setValue(
      'menuImageFiles',
      currentFiles.filter((_, i) => i !== index),
    );
    setValue(
      'imageFileKey',
      currentFileKeys?.filter((_, i) => i !== index),
    );
  };

  const handleReset = () => {
    reset({
      name: '',
      price: 0,
      description: '',
      imageFileKey: [],
      menuImageFiles: [],
    });
  };

  const onSubmit = (data: MenuInput) => {
    // 필수 필드만 검증
    if (!data.name || !data.price) {
      return;
    }

    const menu: Menu = {
      name: data.name,
      price: Number(data.price),
      description: data.description || '',
      imageFileKey: data.imageFileKey || [],
    };

    onClose(menu, data.menuImageFiles || []);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10 h-full w-full bg-white">
      <StoreRegisterHeader
        title="새 메뉴 추가"
        isSub={true}
        onClose={() => onClose()}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-base py-base flex flex-col gap-[26px]"
      >
        {/* 메뉴명 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="flex items-center gap-1">
            <div className="text-sm font-medium">메뉴명</div>
            <div className="text-xs">(필수)</div>
          </label>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                className="w-full rounded-[5px] border border-[#9F9F9F] p-[10px] text-sm font-medium"
                type="text"
                placeholder="메뉴명 입력"
              />
            )}
          />
        </div>

        {/* 가격 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="flex items-center gap-1">
            <div className="text-sm font-medium">가격</div>
            <div className="text-xs">(필수)</div>
          </label>
          <Controller
            name="price"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                className="w-full rounded-[5px] border border-[#9F9F9F] p-[10px] text-sm font-medium"
                type="text"
              />
            )}
          />
        </div>

        {/* 메뉴사진 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="menuImageFiles" className="flex items-center gap-1">
            <div className="text-sm font-medium">메뉴 사진</div>
            <div className="text-xs">(선택)</div>
          </label>
          <div className="flex flex-col gap-2">
            <input
              className="hidden"
              type="file"
              id="menuImageFiles"
              onChange={handleImageFilesChange}
              accept="image/*"
            />
            <div className="flex flex-wrap gap-2">
              <label
                className="flex h-[68px] w-[68px] cursor-pointer items-center justify-center overflow-hidden rounded-md border-[1.17px] border-[#B1B1B1] bg-[#DBDBDB]"
                htmlFor="menuImageFiles"
              >
                <div className="h-7 w-7">
                  <IconPicture className="h-full w-full text-[#545454]" />
                </div>
              </label>
              <Controller
                name="menuImageFiles"
                control={control}
                render={({ field: { value } }) => (
                  <>
                    {(value || []).map((image, index) => (
                      <div key={index} className="relative">
                        <div className="h-[68px] w-[68px] overflow-hidden rounded-md border-[1.17px] border-[#B1B1B1]">
                          <Image
                            width={100}
                            height={100}
                            src={URL.createObjectURL(image)}
                            alt={`가게 사진 ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          className="bg-primary absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full text-sm text-white"
                          onClick={() => handleRemoveImageFiles(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* 한 줄 소개 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="flex justify-between">
            <div className="flex items-center gap-1">
              <div className="text-sm font-medium">한 줄 소개</div>
              <div className="text-xs">(선택)</div>
            </div>
            <Controller
              name="description"
              control={control}
              render={({ field: { value } }) => (
                <div className="flex items-center text-xs">
                  <div className="text-[#424242]">
                    {(value?.length as number) > 60 ? 60 : value?.length}/
                  </div>
                  <div className="text-[#7B7B7B]">60</div>
                </div>
              )}
            />
          </label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="min-h-[108px] w-full resize-none rounded-[5px] border border-[#9F9F9F] p-3 text-sm"
                maxLength={60}
              />
            )}
          />
        </div>
        <div className="absolute bottom-4 flex w-full gap-x-2 px-4 font-semibold">
          <button
            type="button"
            onClick={handleReset}
            className="w-[20%] text-nowrap rounded-[99px] border border-[#B3B3B3] p-[10px]"
          >
            초기화
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="flex w-[80%] items-center justify-center rounded-[99px] bg-[#FFB700] p-[10px]"
          >
            <div>추가</div>
          </button>
        </div>
      </form>
    </div>
  );
}
