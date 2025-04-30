import { LightOliveButton } from '@repo/design-system/components/buttons/FillButtons/LightOlive';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';
import { useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';

const tags = ['알림', '긴급', '일반'];

export default function NoticeForm() {
  const searchParams = useSearchParams();
  const storeUuid = searchParams.get('storeUuid');

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      tag: '알림',
      title: '',
      content: '',
    },
  });
  const selectedTag = watch('tag');
  
  const onSubmit = (data) => {
    console.log(data); // { tag: '알림', title: '...', content: '...' }
  };

  return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full p-3"
      >
        {/* 공지 태그 */}
        <p className="mb-2 font-semibold">공지 태그</p>
        <Controller
          name="tag"
          control={control}
          render={({ field }) => (
            <div className="mb-6 flex space-x-2">
              {tags.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => field.onChange(item)}
                  className={
                    field.value === item
                      ? 'h-[36px] w-[60px] rounded-[8px] border-[#1D9EA2] bg-[#1D9EA2] font-semibold text-white transition'
                      : 'h-[36px] w-[60px] rounded-[8px] border border-gray-300 bg-white text-[#635F59] transition'
                  }
                >
                  {item}
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
                className="h-[300px] mb-14 w-full resize-none rounded-[8px] border border-gray-300 px-2 py-2"
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
        <div className="flex gap-5">
          <LightOliveButton
            type="button"
            className="font-semibold"
            text="초기화"
          />
          <OliveButton type="submit" className="font-semibold" text="완료" />
        </div>
      </form>
  );
}
