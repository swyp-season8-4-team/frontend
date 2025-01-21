interface DebounceOption {
  key: string;
  wait?: number;
  callback(): void;
}

const timeoutMap = new Map<string, number>();

export function debounce({ key, wait = 100, callback }: DebounceOption) {
  const oldTimeout = timeoutMap.get(key);

  if (oldTimeout) {
    clearTimeout(oldTimeout);
  }

  timeoutMap.set(key, setTimeout(callback, wait) as unknown as number);
}
