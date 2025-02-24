'use client';

import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export default function CommunityNickName() {
  const { user } = useContext(UserContext);
  return <span>{user?.nickname}</span>;
}
