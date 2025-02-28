'use client';

import { SearchMessageAction } from "@/types/postMessage";
import IconButton from "@repo/design-system/components/buttons/IconButton";
import { IconSize } from "@repo/design-system/components/icons";
import IconSearch from "@repo/design-system/components/icons/IconSearch";
import { useCallback } from "react";

interface Props {
  iconClassName?: string;
}

export default function SearchIconButton({ iconClassName }: Props) {
  const handleClick = useCallback(() => {
    window.postMessage({
      action: SearchMessageAction.OpenSearchBar,
    })
  }, []);
  
  return (
    <IconButton onClick={handleClick}>
      <IconSearch className={iconClassName} size={IconSize.s} />
    </IconButton>
  );
}
