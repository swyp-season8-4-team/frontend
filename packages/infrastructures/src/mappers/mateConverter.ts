import type { Mate, MateReply, RawMate, RawMateReply } from "@repo/entity/src/mate";

export default class MateConverter {
  convertRawToMate(rawMate: RawMate): Mate {
    return {
      id: rawMate.mateUuid,
      recruit: rawMate.recruitYn,
      userId: rawMate.userUuid,
      title: rawMate.title,
      content: rawMate.content,
      nickname: rawMate.nickname,
      mateImage: rawMate.mateImage.length > 0 ? rawMate.mateImage[0] : '',
      mateCategory: rawMate.mateCategory,
      place: rawMate.place,
      profileImage: rawMate.profileImage.length > 0 ? rawMate.profileImage[0] : '',
      ...(rawMate.appliedYn && { applied: rawMate.appliedYn }),
      ...(rawMate.storeId && { storeId: rawMate.storeId }),
      createdAt: rawMate.createdAt,
      updatedAt: rawMate.updatedAt,
    };
  }

  convertRawToMateReply(raw: RawMateReply): MateReply {
    return {
      mateReplyId: raw.mateReplyId,
      mateId: raw.mateUuid,
      userId: raw.userUuid,
      content: raw.content,
      nickname: raw.nickname,
      profileImage: raw.profileImage.length > 0 ? raw.profileImage[0] : '',
    };
  }
}
