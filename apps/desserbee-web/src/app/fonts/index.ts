import localFont from 'next/font/local';

const pretendardKR = localFont({
  src: [
    {
      path: './kr/PretendardVariable.ttf',
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
      path: './jp/PretendardJPVariable.ttf',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard-jp',
});

const pretendardSTD = localFont({
  src: [
    {
      path: './std/PretendardStdVariable.ttf',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard-std',
});

export const recipeKorea = localFont({
  src: [
    {
      path: './RecipeKorea.ttf', // FIXME: 절대경로 안쓸수 있는 설정 방법
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-recipe-korea',
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
