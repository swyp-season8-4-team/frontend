export interface WithChildren {
  children?: React.ReactNode;
}

export interface WithClassName {
  className?: string;
}

/**
 * React v19 이상에서는 forwardRef를 사용해서 ref를 전달하지 않아도 된다.
 */
export interface WithRef<T> {
  ref?: React.RefObject<T | null>;
}

export interface WithStyle {
  style?: React.CSSProperties;
}
