'use client';
import { useContext, useState } from 'react';
import IconPicutre from '@repo/design-system/components/icons/IconPicture';
import IconHalfStar from '@repo/design-system/components/icons/IconHalfStar';
import Image from 'next/image';
import ReviewService from '@repo/usecase/src/reviewService';
import ReviewAPIRepository from '@repo/infrastructures/src/repositories/reviewAPIRepository';
import { UserContext } from '@/contexts/UserContext';

interface OneLineReviewWriteProps {
  storeUuid: string;
}

export function OneLineReviewWrite({ storeUuid }: OneLineReviewWriteProps) {
  const { user } = useContext(UserContext);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [, setReviewImage] = useState<File | null>();
  const [imageName, setImageName] = useState<string | null>(null);

  const reviewService = new ReviewService({
    reviewRepository: new ReviewAPIRepository(),
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
    const data = {
      storeUuid: storeUuid,
      request: {
        userUuid: user?.id as string,
        content: reviewText,
        rating: rating,
      },
      images: [imageName!],
    };
    const result = await reviewService.createStoreOnlineReviews(data);
    console.log(result);
  };

  return (
    <div className="flex flex-col w-full pb-[15.73px] md:pb-[27px]">
      <div className="flex items-center gap-[10px] md:gap-[7px] w-full justify-start">
        <div className="text-[8px] md:text-lg font-semibold">
          이 장소에 대해 만족하셨나요?
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className="relative w-[15px] h-[15px] md:w-[30px] md:h-[30px]"
            >
              <button
                className="w-1/2 h-full absolute left-0 z-10"
                onClick={() => setRating(star - 0.5)}
              />
              <button
                className="w-1/2 h-full absolute right-0 z-10"
                onClick={() => setRating(star)}
              />
              <IconHalfStar
                className="w-[15px] h-[15px] md:w-[30px] md:h-[30px]"
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
          <span className="text-[8px] md:text-base ml-1">{rating}</span>
        </div>
      </div>
      <form method="post" encType="multipart/form-data">
        <label htmlFor="reviewImage">
          <div className="bg-[#E8E8E8] rounded-[3px] md:rounded-[7.4px] py-[19px] md:py-[23px] my-2 md:my-[18px] w-full h-full aspect-[736/142] min-h-[75px] flex justify-center items-center overflow-hidden">
            {previewImage ? (
              <Image
                src={previewImage}
                alt="미리보기"
                width={150}
                height={150}
                className="w-full object-contain"
              />
            ) : (
              <div className="flex flex-col gap-y-[5px] md:gap-y-[12.33px] items-center">
                <div className="w-[23px] h-[23px] md:w-[56.72px] md:h-[56.72px] aspect-square text-[#545454]">
                  <IconPicutre className="w-full h-full" />
                </div>
                <div className="text-[8px] md:text-[18px] text-[#393939]">
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
        <div className="text-[8px] md:text-lg font-semibold">
          어떤 점이 좋았나요?
        </div>
        <div className="relative h-fit">
          <input
            className=" w-full border border-[#9F9F9F] text-[8px] md:text-lg rounded-[4.24px] md:rounded-[10px] px-[6px] py-[10px]"
            name="review"
            placeholder="50자 이내로 작성해주세요."
            maxLength={50}
            value={reviewText}
            onChange={handleReviewChange}
          />
          <span className="absolute right-2 bottom-0 text-[6px] md:text-sm text-gray-500">
            {reviewText.length}/50
          </span>
        </div>
        <div className="w-full flex justify-end">
          <button
            onClick={handleSubmit}
            className="text-[6.79px] md:text-base mt-[6px] md:mt-4 text-white text-center px-[4.24px]  md:p-[10px]  rounded-[42.23px] bg-[#898989]"
            type="button"
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}
