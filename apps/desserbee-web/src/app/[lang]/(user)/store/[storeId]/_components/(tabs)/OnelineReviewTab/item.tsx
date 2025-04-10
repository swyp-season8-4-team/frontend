'use client';
import Image from 'next/image';
import IconStar from '@repo/design-system/components/icons/IconStar';
import IconPicutre from '@repo/design-system/components/icons/IconPicture';

import { formatDate } from '../../../../_utils/date';
import { useContext, useState } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import IconHalfStar from '@repo/design-system/components/icons/IconHalfStar';
import { deleteOnelineReview, editOnelineReview } from './action';

interface OneLineReviewItemProps {
  userUuid: string;
  images: string[];
  profileImage: string;
  nickname: string;
  content: string;
  rating: number;
  createdAt: string;
  storeUuid: string;
  reviewUuid: string;
  onDelete?: () => void;
}
export function OneLineReviewItem({
  userUuid,
  images,
  profileImage,
  nickname,
  content,
  createdAt,
  rating,
  storeUuid,
  reviewUuid,
}: OneLineReviewItemProps) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editedRating, setEditedRating] = useState(rating);
  const [editedContent, setEditedContent] = useState(content);
  const [editedImage, setEditedImage] = useState<File | null>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setEditedImage(file);
    }
  };

  const handleEdit = async () => {
    if (isEditing) {
      try {
        if (!user?.id) return;

        const data = {
          storeUuid: storeUuid,
          reviewUuid: reviewUuid,
          request: {
            userUuid: user.id,
            content: editedContent,
            rating: editedRating,
          },
          ...(editedImage && { newImages: [editedImage] }),
        };

        await editOnelineReview(data);
        setIsEditing(false);
        router.refresh();
      } catch (err) {
        console.log('리뷰 수정 중 에러: ' + err);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleOnelineReviewDelete = async (
    storeUuid: string,
    reviewUuid: string,
  ) => {
    if (confirm('리뷰를 삭제하시겠습니까?')) {
      try {
        await deleteOnelineReview({ storeUuid, reviewUuid });
        router.refresh();
      } catch (err) {
        console.log('리뷰 삭제 중 에러: ' + err);
      }
    }
  };

  return (
    <div className="flex justify-start items-center bg-[#F6F6F6] p-[5px] md:px-[14px] md:py-3 w-full">
      <div className="bg-[#D2D2D2] rounded-[1px] md:rounded-[3px] w-[21px] md:w-[58px] aspect-square overflow-hidden">
        {isEditing ? (
          <>
            <label
              htmlFor="editReviewImage"
              className="cursor-pointer w-full h-full flex items-center justify-center"
            >
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="수정할 이미지"
                  className="w-full h-full object-fit"
                  width={58}
                  height={58}
                />
              ) : (
                <div className="text-[#545454] w-full h-full flex items-center justify-center">
                  <IconPicutre className="w-1/2 h-1/2" />
                </div>
              )}
            </label>
            <input
              type="file"
              id="editReviewImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </>
        ) : (
          images &&
          images.length > 0 && (
            <Image
              src={images[0]}
              alt="리뷰 이미지"
              className="w-full h-full object-fit"
              width={58}
              height={58}
            />
          )
        )}
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col items-start pl-[3px] md:pl-[11px] leading-[50%] md:leading-[130%]">
          <div className="flex items-center gap-x-[1px] gap-y-[2px] md:gap-x-[5px] md:gap-y-[7px]">
            <div className="rounded-full bg-[#dadada] w-[10px] md:w-[21px] aspect-square overflow-hidden">
              {profileImage && (
                <Image
                  src={profileImage}
                  alt="프로필 이미지"
                  className="w-full h-full object-fit"
                  width={21}
                  height={21}
                />
              )}
            </div>
            <div className="text-[8px] md:text-base">{nickname}</div>
            {userUuid === user?.id && (
              <div
                className="text-[#8b8b8b] text-[7px] md:text-[14px] cursor-pointer"
                onClick={handleEdit}
              >
                {isEditing ? '완료' : '수정'}
              </div>
            )}
            {userUuid === user?.id && (
              <div
                className="text-[#8b8b8b] text-[7px] md:text-[14px] cursor-pointer"
                onClick={() => handleOnelineReviewDelete(storeUuid, reviewUuid)}
              >
                삭제
              </div>
            )}
          </div>
          {isEditing ? (
            <div>
              <div className="flex items-center justify-start">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className="relative w-[8px] md:w-[15px] h-[8px] md:h-[15px]"
                  >
                    <button
                      className="left-0 z-10 absolute w-1/2 h-full"
                      onClick={() => setEditedRating(star - 0.5)}
                    />
                    <button
                      className="right-0 z-10 absolute w-1/2 h-full"
                      onClick={() => setEditedRating(star)}
                    />
                    <IconHalfStar
                      className="w-[8px] md:w-[15px] h-[8px] md:h-[15px]"
                      filled={
                        editedRating >= star
                          ? 'full'
                          : editedRating === star - 0.5
                            ? 'left'
                            : 'none'
                      }
                    />
                  </div>
                ))}
                <span className="ml-1 text-[8px] md:text-base">
                  {editedRating}
                </span>
              </div>
              <input
                type="text"
                value={editedContent}
                onChange={(e) => {
                  if (e.target.value.length <= 50) {
                    setEditedContent(e.target.value);
                  }
                }}
                maxLength={50}
                className="text-[8px] md:text-base border rounded px-1"
              />
            </div>
          ) : (
            <div className="text-[8px] md:text-base">{content}</div>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <div className="md:mr-[2px] w-[8px] md:w-[17px] h-[8px] md:h-[17px]">
              <IconStar className="w-full h-full text-[#FFB700]" />
            </div>
            <div className="text-[8px] md:text-base">{rating}</div>
          </div>
          <div className="text-[8px] md:text-sm">{formatDate(createdAt)}</div>
        </div>
      </div>
    </div>
  );
}
