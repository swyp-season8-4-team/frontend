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
      userId: rawMate.userUuid,
      mateImage: rawMate.mateImage,
      recruit: rawMate.recruitYn,
      title: rawMate.title,
      content: rawMate.content,
      nickname: rawMate.nickname,
      mateCategory: rawMate.mateCategory,
      place: rawMate.place,
      profileImage: rawMate.profileImage,
      applyStatus: rawMate.applyStatus,
      storeId: rawMate.storeId,
      gender: rawMate.gender,
      createdAt: rawMate.createdAt,
      updatedAt: rawMate.updatedAt,
      capacity: rawMate.capacity,
      currentMemberCount: rawMate.currentMemberCount,
      saved: rawMate.saved,
      blockedByAuthorYn: rawMate.blockedByAuthorYn,
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
      userUuid: mateWrite.userUuid,
      title: mateWrite.title,
      content: mateWrite.content,
      recruitYn: mateWrite.recruitYn,
      mateCategoryId: mateWrite.mateCategoryId,
      capacity: mateWrite.capacity,
      // place: {
      //   placeName: mateWrite.place.placeName,
      //   address: mateWrite.place.address,
      //   latitude: mateWrite.place.latitude,
      //   longitude: mateWrite.place.longitude,
      // },
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
