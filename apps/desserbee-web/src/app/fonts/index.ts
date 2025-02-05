import localFont from 'next/font/local';
import { SupportISO639Language } from '@repo/entity/src/i18n';

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

export const getFontConfig = (lang: keyof typeof SupportISO639Language) => {
  switch (lang) {
    case 'ko':
      return {
        variable: `${pretendardKR.variable}`,
        className: pretendardKR.className,
      };
    // case 'ja':
    //   return {
    //     variable: `${pretendardJP.variable}`,
    //     className: pretendardJP.className,
    //   };
    default:
      return {
        variable: `${pretendardSTD.variable} `,
        className: pretendardSTD.className,
      };
  }
};
