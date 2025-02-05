import '@repo/ui/styles/globals.css';
import { getFontConfig } from '../fonts';

import type { Metadata } from 'next';
import type { WithParams } from '@/app';
import type { WithChildren } from '@repo/ui';
import { SupportISO639Language } from '@repo/entity/src/i18n';
import I18nService from '@repo/usecase/src/i18nService';
import { initMSW } from '@/mocks';
import MetadataService from '@/usecases/metadataService';
import Script from 'next/script';

const metadataService = new MetadataService();

export const metadata: Metadata = {
  title: metadataService.title,
  description: metadataService.description,
  other: {
    'permissions-policy': "geolocation=(self 'http://localhost:3000')",
  },
};

if (process.env.NEXT_PUBLIC_USE_API_MOCKING === 'true') {
  initMSW();
}

export async function generateStaticParams() {
  // 일단 한국 서비스라 SSG로 ko 설정
  return Object.values(SupportISO639Language).map((lang) => ({
    lang,
  }));
}

interface Props extends WithChildren, WithParams {}
const KAKAO_MAP_API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer&autoload=false`;

export default async function RootLayout({ children, params }: Readonly<Props>) {
  const i18nService = new I18nService({ store: await params });
  const lang = i18nService.getLang();
  const { variable, className } = getFontConfig(lang);

  return (
    <html lang={lang} className={variable}>
      <body className={className}>
        <Script type="text/javascript" strategy="beforeInteractive" src={KAKAO_MAP_API_URL} async={false} />
        {children}
      </body>
    </html>
  );
}
