import type { Menu } from '@repo/entity/src/store';
import { StoreRegisterHeader } from '../../_components/StoreRegisterHeader';
import { Controller, useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRef } from 'react';
import IconXRound from '@repo/design-system/components/icons/IconXRound';
import IconPlusRound from '@repo/design-system/components/icons/IconPlusRound';
import { cn } from '@repo/ui/lib/utils';
import { ValidationError } from '../../_components/ValidationError';

interface MenuAddModalProps {
  onClose: (menu?: Menu, imageFiles?: File[]) => void;
  menu?: Menu;
  mode?: 'add' | 'edit';
}

interface MenuInput extends Menu {
  menuImageFiles?: (File | string)[];
}

export function MenuAddModal({
  onClose,
  menu,
  mode = 'add',
}: MenuAddModalProps) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
    trigger,
    reset,
  } = useForm<MenuInput>({
    defaultValues: menu
      ? {
          ...menu,
          menuImageFiles: menu.images ? [...menu.images] : [],
        }
      : {
          name: '',
          price: 0,
          description: '',
          imageFileKey: '',
          menuImageFiles: [],
        },
    mode: 'onChange',
  });

  const priceInputRef = useRef<HTMLInputElement>(null);

  const handleImageFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const fileKey = file.name;
      setValue('menuImageFiles', [file]);
      setValue('imageFileKey', fileKey);
    }
  };

  const handleRemoveImageFiles = (index: number) => {
    const currentFiles = watch('menuImageFiles') || [];
    setValue(
      'menuImageFiles',
      currentFiles.filter((_, i) => i !== index),
    );
    setValue('imageFileKey', '');
  };

  const handleReset = () => {
    reset({
      name: '',
      price: 0,
      description: '',
      imageFileKey: '',
      menuImageFiles: [],
    });
  };

  const onSubmit = (data: MenuInput) => {
    if (
      !data.name ||
      !data.price ||
      Number(data.price) <= 0 ||
      Number(data.price) > 99999999
    ) {
      trigger(['name', 'price']);
      return;
    }

    const menu: Menu = {
      name: data.name,
      price: Number(data.price),
      description: data.description || '',
      // imageFileKey는 이미지가 있을 때만 포함
      ...(data.menuImageFiles?.length
        ? { imageFileKey: data.imageFileKey }
        : {}),
    };

    // menuImageFiles에서 File만 추출
    const filesOnly = (data.menuImageFiles || []).filter(
      (file): file is File => typeof file !== 'string',
    );
    
    onClose(menu, filesOnly);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10 h-full w-full overflow-y-auto bg-white">
      <StoreRegisterHeader
        title={mode === 'add' ? '메뉴 추가' : '메뉴 수정'}
        isSub={true}
        onClose={() => onClose()}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-base py-base flex h-full flex-col justify-between gap-[26px]"
      >
        <div className="flex flex-col gap-[26px]">
          {/* 메뉴사진 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="menuImageFiles"
              className="flex flex-col justify-center gap-1"
            >
              <div className="text-sm font-medium">메뉴 사진</div>
              <div className="text-neutral-40 text-xs">
                메뉴 보여주는 사진을 1장을 등록해주세요
              </div>
            </label>
            <div className="flex flex-col gap-2">
              <input
                className="hidden"
                type="file"
                id="menuImageFiles"
                onChange={handleImageFilesChange}
                accept="image/*"
              />
              <div className="flex flex-wrap gap-[15px]">
                <label
                  className="border-neutral-40 bg-neutral-70 flex h-[68px] w-[68px] flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[9.38px] border-[1.17px]"
                  htmlFor="menuImageFiles"
                >
                  <div className="h-5 w-5">
                    <IconPlusRound className="h-full w-full text-[#545454]" />
                  </div>
                </label>
                <Controller
                  name="menuImageFiles"
                  control={control}
                  render={({ field: { value } }) => (
                    <>
                      {(value || []).map((image, index) => (
                        <div key={index} className="relative">
                          <div className="h-[68px] w-[68px] overflow-hidden rounded-md">
                            <Image
                              width={100}
                              height={100}
                              src={
                                typeof image === 'string'
                                  ? image
                                  : URL.createObjectURL(image)
                              }
                              alt={`가게 사진 ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-sm text-white shadow-[0px_1px_3px_1px_#39393921]"
                            onClick={() => handleRemoveImageFiles(index)}
                          >
                            <IconXRound className="h-full w-full text-[#CDC8C3]" />
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          {/* 메뉴명 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="flex items-center gap-1">
              <div className="text-sm font-medium">메뉴명</div>
              <div className="text-error-60 text-xs">*</div>
            </label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: '메뉴명을 입력해주세요',
                minLength: { value: 1, message: '메뉴명을 입력해주세요' },
              }}
              render={({ field }) => (
                <div className="relative">
                  <input
                    {...field}
                    className={cn(
                      'mb-2 w-full rounded-[5px] border p-[10px] text-sm font-medium',
                      errors.name ? 'border-[#FF3B30]' : 'border-[#9F9F9F]',
                    )}
                    type="text"
                    placeholder="메뉴명 입력"
                  />
                  {errors.name && (
                    <ValidationError errorMessage={errors.name.message} />
                  )}
                </div>
              )}
            />
          </div>

          {/* 가격 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="flex items-center gap-1">
              <div className="text-sm font-medium">가격</div>
              <div className="text-error-60 text-xs">*</div>
            </label>
            <div
              className={cn(
                'inline-block w-full rounded-[5px] border p-[10px]',
                errors.price ? 'border-[#FF3B30]' : 'border-[#9F9F9F]',
              )}
            >
              <Controller
                name="price"
                control={control}
                rules={{
                  required: '가격을 입력해주세요',
                  validate: (value) => {
                    if (!value) return '가격을 입력해주세요';
                    const numValue = Number(value);
                    if (numValue <= 0) return '가격은 0보다 커야 합니다';
                    if (numValue > 99999999)
                      return '최대 가격은 99,999,999원입니다';
                    return true;
                  },
                }}
                render={({ field: { value, onChange, ...rest } }) => {
                  return (
                    <div
                      className="flex cursor-text items-center"
                      onClick={() => priceInputRef.current?.focus()}
                    >
                      <div className="relative">
                        <span className="invisible inline-block whitespace-pre px-1 text-sm font-medium">
                          {value ? Number(value).toLocaleString() : '0'}
                        </span>
                        <input
                          {...rest}
                          ref={priceInputRef}
                          value={value ? Number(value).toLocaleString() : ''}
                          onChange={(e) => {
                            const newValue = e.target.value.replace(
                              /[^\d,]/g,
                              '',
                            );
                            const numValue = Number(newValue.replace(/,/g, ''));
                            if (numValue <= 99999999) {
                              onChange(newValue.replace(/,/g, ''));
                            }
                          }}
                          className={cn(
                            value ? 'w-full' : 'w-[50px]',
                            'absolute left-0 top-0 appearance-none border-none p-0 pt-0.5 text-sm font-medium outline-none',
                          )}
                          placeholder="0원"
                          type="text"
                          autoComplete="off"
                          maxLength={11}
                        />
                      </div>
                      {value ? (
                        <span className="text-sm font-medium">원</span>
                      ) : null}
                    </div>
                  );
                }}
              />
            </div>
            {errors.price && (
              <ValidationError errorMessage={errors.price.message} />
            )}
          </div>

          {/* 한 줄 소개 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="flex justify-between">
              <div className="flex items-center gap-1">
                <div className="text-sm font-medium">메뉴 설명</div>
              </div>
              <Controller
                name="description"
                control={control}
                render={({ field: { value } }) => (
                  <div className="flex items-center text-xs">
                    <div className="text-[#424242]">
                      {(value?.length as number) > 100 ? 100 : value?.length}
                    </div>
                    <div className="text-neutral-50">/100</div>
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
                  maxLength={100}
                  placeholder="내용을 입력해주세요"
                />
              )}
            />
          </div>
        </div>

        <div className="flex w-full gap-x-2 font-semibold">
          {mode === 'add' ? (
            <>
              <button
                type="button"
                onClick={handleReset}
                className="w-1/2 text-nowrap rounded-[6px] border border-[#B3B3B3] p-[10px]"
              >
                초기화
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                className="bg-primary-80 flex w-1/2 items-center justify-center rounded-[6px] p-[10px] text-[#412D00]"
              >
                <div>추가</div>
              </button>
            </>
          ) : (
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-primary-80 flex w-full items-center justify-center rounded-[6px] p-[10px] text-[#412D00]"
            >
              <div>수정</div>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
