import type { Mate, RawMate } from "@repo/entity/src/mate";

export default class MateConverter {
  convertRawToMate(rawMate: RawMate): Mate {
    return {
      ...rawMate,
      id: rawMate.mateId,
      recruit: rawMate.recruitYn,
    };
  }
}
