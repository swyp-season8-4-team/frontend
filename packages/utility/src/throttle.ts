interface ThrottleOption {
  delay?: number;
  key: string;
  callback: () => void;
}

const throttleLastExecutedTimes = new Map<string, number>();

export const throttle = ({ delay = 100, key, callback }: ThrottleOption) => {
  if (!throttleLastExecutedTimes.has(key)) {
    throttleLastExecutedTimes.set(key, Date.now());
    callback();
  } else {
    const lastExecutedTime = throttleLastExecutedTimes.get(key) as number;

    if (lastExecutedTime + delay < Date.now()) {
      throttleLastExecutedTimes.set(key, Date.now());
      callback();
    }
  }
};
