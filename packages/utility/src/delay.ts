export function delay(delayTime: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delayTime);
  });
}
