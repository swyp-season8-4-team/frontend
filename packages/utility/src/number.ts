export const convertNegativeToPositive = (num: number) => {
  if (num < 0) {
    return Math.abs(num);
  }
  return num;
};
