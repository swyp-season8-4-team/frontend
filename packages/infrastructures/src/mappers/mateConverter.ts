import type { Mate, RawMate } from "@repo/entity/src/mate";

export default class MateConverter {
  convertRawToMate(rawMate: RawMate): Mate {
    return {
      id: rawMate.mateUuid,
      recruit: rawMate.recruitYn,
      userId: rawMate.userUuid,
      title: rawMate.title,
      content: rawMate.content,
      nickname: rawMate.nickname,
      mateImage: rawMate.mateImage,
      mateCategory: rawMate.mateCategory,
      place: rawMate.place,
      profileImage: rawMate.profileImage.length > 0 ? rawMate.profileImage[0] : '',
    };
  }
}
