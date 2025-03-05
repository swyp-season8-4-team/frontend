'use client';
import { useContext, useState } from 'react';
import IconPicutre from '@repo/design-system/components/icons/IconPicture';
import IconHalfStar from '@repo/design-system/components/icons/IconHalfStar';
import Image from 'next/image';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import { UserContext } from '@/contexts/UserContext';
import { cn } from '@repo/ui/lib/utils';
import { useRouter } from 'next/navigation';

interface OneLineReviewWriteProps {
  storeUuid: string;
  handleBackToReviewBtnClick?: () => void;
}

export function OneLineReviewWrite({
  storeUuid,
  handleBackToReviewBtnClick,
}: OneLineReviewWriteProps) {
  const { user } = useContext(UserContext);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewImage, setReviewImage] = useState<File | null>();
  const [, setImageName] = useState<string | null>(null);

  const storeService = new StoreService({
    storeRepository: new StoreAPIRepository(),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setReviewImage(file);
      setImageName(file.name);
    }
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.length <= 50) {
      setReviewText(text);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = {
        storeUuid: storeUuid,
        request: {
          userUuid: user?.id as string,
          content: reviewText,
          rating: rating,
        },
        images: reviewImage ? [reviewImage] : [],
      };

      await storeService.createStoreOnlineReviews(data);

      // 리뷰 작성 후 상태 초기화
      setReviewText('');
      setRating(0);
      setPreviewImage(null);
      setReviewImage(null);
      setImageName(null);

      // 페이지 새로고침 (setTimeout 사용)
      setTimeout(() => {
        window.location.reload();
      }, 100);

      // 부모 컴포넌트로 돌아가기 - 타이밍 문제로 제거
      // if (handleBackToReviewBtnClick) {
      //   handleBackToReviewBtnClick();
      // }

      // router.refresh()는 필요 없음
    } catch (error) {
      console.error('리뷰 작성 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className="flex flex-col pb-[15.73px] md:pb-[27px] w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center gap-[10px] md:gap-[7px] w-full">
          <div className="font-semibold text-[8px] md:text-lg">
            이 장소에 대해 만족하셨나요?
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className="relative w-[15px] md:w-[30px] h-[15px] md:h-[30px]"
              >
                <button
                  className="left-0 z-10 absolute w-1/2 h-full"
                  onClick={() => setRating(star - 0.5)}
                />
                <button
                  className="right-0 z-10 absolute w-1/2 h-full"
                  onClick={() => setRating(star)}
                />
                <IconHalfStar
                  className="w-[15px] md:w-[30px] h-[15px] md:h-[30px]"
                  filled={
                    rating >= star
                      ? 'full'
                      : rating === star - 0.5
                        ? 'left'
                        : 'none'
                  }
                />
              </div>
            ))}
            <span className="ml-1 text-[8px] md:text-base">{rating}</span>
          </div>
        </div>
        <div
          onClick={handleBackToReviewBtnClick}
          className="text-[6px] md:text-base text-nowrap"
        >
          리뷰 다시 보러가기
        </div>
      </div>
      <form method="post" encType="multipart/form-data">
        <label htmlFor="reviewImage">
          <div
            className={cn(
              previewImage ? 'bg-transparent' : 'bg-[#E8E8E8]',
              'flex justify-center items-center  my-2 md:my-[18px] py-[19px] md:py-[23px] rounded-[3px] md:rounded-[7.4px] w-full h-full min-h-[75px] aspect-[736/400] overflow-hidden',
            )}
          >
            {previewImage ? (
              <Image
                src={previewImage}
                alt="미리보기"
                width={150}
                height={150}
                className="w-fit object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-y-[5px] md:gap-y-[12.33px]">
                <div className="w-[23px] md:w-[56.72px] h-[23px] md:h-[56.72px] aspect-square text-[#545454]">
                  <IconPicutre className="w-full h-full" />
                </div>
                <div className="text-[#393939] text-[8px] md:text-[18px]">
                  가게의 사진을 추가해주세요.
                </div>
              </div>
            )}
          </div>
        </label>
        <input
          type="file"
          id="reviewImage"
          name="reviewImage"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <div className="font-semibold text-[8px] md:text-lg">
          어떤 점이 좋았나요?
        </div>
        <div className="relative h-fit">
          <input
            className="px-[6px] py-[10px] border border-[#9F9F9F] rounded-[4.24px] md:rounded-[10px] w-full text-[8px] md:text-lg"
            name="review"
            placeholder="50자 이내로 작성해주세요."
            maxLength={50}
            value={reviewText}
            onChange={handleReviewChange}
          />
          <span className="right-2 bottom-0 absolute text-[6px] text-gray-500 md:text-sm">
            {reviewText.length}/50
          </span>
        </div>
        <div className="flex justify-end w-full">
          <button
            onClick={handleSubmit}
            className="bg-[#898989] mt-[6px] md:mt-4 md:p-[10px] px-[4.24px] rounded-[42.23px] text-[6.79px] text-white md:text-base text-center"
            type="button"
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
