import type { CommunityCategory } from '@repo/entity/src/community';
import type {
  Mate,
  MateReply,
  MateWriteRequest,
  RawMateReply,
  RawMateWriteReuqest,
  RawMate,
} from '@repo/entity/src/mate';

export default class MateConverter {
  convertRawToMate(rawMate: RawMate): Mate {
    const result = {
      id: rawMate.mateUuid,
      recruit: rawMate.recruitYn,
      userId: rawMate.userUuid,
      title: rawMate.title,
      content: rawMate.content,
      nickname: rawMate.nickname,
      mateImage: rawMate.mateImage,
      mateCategory: rawMate.mateCategory,
      place: rawMate.place,
      profileImage: rawMate.profileImage,
      applyStatus: rawMate.applyStatus,
      ...(rawMate.appliedYn && { applied: rawMate.appliedYn }),
      ...(rawMate.storeId && { storeId: rawMate.storeId }),
      gender: rawMate.gender,
      createdAt: rawMate.createdAt,
      updatedAt: rawMate.updatedAt,
    };

    return result;
  }

  convertRawToMateReply(raw: RawMateReply): MateReply {
    return {
      mateReplyId: raw.mateReplyId,
      mateId: raw.mateUuid,
      userId: raw.userUuid,
      content: raw.content,
      nickname: raw.nickname,
      profileImage: raw.profileImage,
      gender: raw.gender,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  convertMateWriteToRaw(mateWrite: MateWriteRequest): RawMateWriteReuqest {
    return {
      userUuid: mateWrite.userId,
      title: mateWrite.title,
      content: mateWrite.content,
      recruitYn: mateWrite.recruit,
      mateCategoryId: mateWrite.mateCategoryId,
      place: {
        placeName: mateWrite.place.placeName,
        address: mateWrite.place.address,
        latitude: mateWrite.place.latitude,
        longitude: mateWrite.place.longitude,
      },
    };
  }

  convertMateCategoryToId(mateCategory: CommunityCategory | null): number {
    switch (mateCategory) {
      case '친목도모':
        return 1;
      case '사진맛집':
        return 2;
      case '카공모임':
        return 3;
      case '건강맛집':
        return 4;
      case '빵지순례':
        return 5;
      case '카페투어':
        return 6;
      default:
        return 0;
    }
  }
}
