'use client';

import { MateReplyContext } from "../../_contexts/MateReplyContext";
import { useContext } from "react";

export default function MateCommentFilteredMenus() {
  const { sortLatestReplyList, sortRegisterReplyList } = useContext(MateReplyContext);

  return (
    <div className="flex gap-2">
      <span onClick={sortRegisterReplyList}>등록순</span>
      <span onClick={sortLatestReplyList}>최신순</span>
    </div>
  )
}