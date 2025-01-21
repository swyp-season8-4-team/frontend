export function wait(
  checkCallback: () => boolean,
  maxWaitTime?: number
): Promise<void> {
  const startTime = performance.now();

  return new Promise<void>((resolve, reject) => {
    const interval = setInterval(() => {
      if (checkCallback()) {
        clearInterval(interval);
        resolve();
      } else if (
        !!maxWaitTime &&
        performance.now() - startTime >= maxWaitTime
      ) {
        reject();
      }
    }, 10);
  });
}
