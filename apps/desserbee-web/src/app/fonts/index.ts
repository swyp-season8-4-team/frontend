import localFont from 'next/font/local';

const pretendardKR = localFont({
  src: [
    {
      path: '../../../../../packages/design-system/src/fonts/kr/PretendardVariable.subset.0.woff2',
      weight: '100 900', // weight 범위 100 - 900
      style: 'normal',
    },
  ],
  variable: '--font-pretendard-kr',
  preload: true,
});

const pretendardJP = localFont({
  src: [
    {
      path: '../../../../../packages/design-system/src/fonts/jp/PretendardJPVariable.subset.0.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard-jp',
});

const pretendardSTD = localFont({
  src: [
    {
      path: '../../../../../packages/design-system/src/fonts/std/PretendardStdVariable.subset.0.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard-std',
});

export const fontVariables = {
  ko: {
    variable: pretendardKR.variable,
    className: pretendardKR.className,
  },
  ja: {
    variable: pretendardJP.variable,
    className: pretendardJP.className,
  },
  default: {
    variable: pretendardSTD.variable,
    className: pretendardSTD.className,
  },
};
