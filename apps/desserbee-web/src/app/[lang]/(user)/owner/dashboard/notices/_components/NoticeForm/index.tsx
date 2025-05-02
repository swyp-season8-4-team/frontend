import { createNotice } from '@/app/[lang]/(user)/(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';
import { LightOliveButton } from '@repo/design-system/components/buttons/FillButtons/LightOlive';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';

const tags = [
  { label: '알림', value: 'ALERT' },
  { label: '긴급', value: 'EMERGENCY' },
  { label: '일반', value: 'COMMON' },
];

export default function NoticeForm() {
  const searchParams = useSearchParams();
  const storeUuid = searchParams.get('storeUuid');
  const router = useRouter();

  const { control, handleSubmit, watch, reset} = useForm({
    defaultValues: {
      tag: 'ALERT',
      title: '',
      content: '',
    },
  });

  const onReset = () => {
    reset();
  };

  const selectedTag = watch('tag');

  const onSubmit = async (data: {
    tag: string;
    title: string;
    content: string;
  }) => {
    if (!storeUuid) {
      alert('가게 정보가 없습니다.');
      return;
    }
    try {
      await createNotice({
        storeUuid,
        ...data,
      });
      alert('공지 등록이 완료되었습니다');
      router.back();
    } catch (e) {
      alert('공지 등록에 실패했습니다');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-3">
      {/* 공지 태그 */}
      <p className="mb-2 font-semibold">공지 태그</p>
      <Controller
        name="tag"
        control={control}
        render={({ field }) => (
          <div className="mb-6 flex space-x-2">
            {tags.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => field.onChange(item.value)}
                className={
                  field.value === item.value
                    ? 'h-[36px] w-[60px] rounded-[8px] border-[#1D9EA2] bg-[#1D9EA2] font-semibold text-white transition'
                    : 'h-[36px] w-[60px] rounded-[8px] border border-gray-300 bg-white text-[#635F59] transition'
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      />

      {/* 공지 제목 */}
      <p className="mb-2 font-semibold">공지 제목</p>
      <Controller
        name="title"
        control={control}
        rules={{ required: '공지 제목을 입력해주세요' }}
        render={({ field, fieldState }) => (
          <>
            <input
              {...field}
              placeholder="공지 제목을 입력해주세요"
              className="mb-2 h-[56px] w-full rounded-[8px] border border-gray-300 px-2 py-2"
            />
            {fieldState.error && (
              <span className="text-sm text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </>
        )}
      />

      {/* 공지글 */}
      <div className="mb-2 flex items-center justify-between">
        <p className="font-semibold">공지글</p>
      </div>
      <Controller
        name="content"
        control={control}
        rules={{ required: '공지글을 입력해주세요' }}
        render={({ field, fieldState }) => (
          <>
            <textarea
              {...field}
              placeholder="공지글을 입력해주세요"
              className="mb-4 h-[300px] w-full resize-none rounded-[8px] border border-gray-300 px-2 py-2"
            />
            {fieldState.error && (
              <span className="text-sm text-red-500">
                {fieldState.error.message}
              </span>
            )}
          </>
        )}
      />

      {/* 제출 버튼 */}
      <div className="flex gap-2">
        <div className="w-[40%]">
          <LightOliveButton
            type="button"
            className="font-semibold"
            text="초기화"
            onClick={onReset}
          />
        </div>
        <OliveButton type="submit" className="font-semibold" text="완료" />
      </div>
    </form>
  );
}
