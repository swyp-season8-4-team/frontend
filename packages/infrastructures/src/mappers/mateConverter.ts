import type { Mate, RawMate } from "@repo/entity/src/mate";

export default class MateConverter {
  convertRawToMate(rawMate: RawMate): Mate {
    return {
      id: rawMate.mateId,
      recruit: rawMate.recruit,
      userId: rawMate.userId,
      title: rawMate.title,
      content: rawMate.content,
      nickname: rawMate.nickname,
      mateImage: rawMate.mateImage,
      mateCategory: rawMate.mateCategory,
    };
  }
}
