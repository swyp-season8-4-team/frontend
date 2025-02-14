import '@repo/ui/styles/globals.css';

import type { Metadata } from 'next';
import { Fragment } from 'react';

import type { WithParams } from '@/app';
import type { WithChildren } from '@repo/ui';
import { SupportISO639Language } from '@repo/entity/src/i18n';
import I18nService from '@repo/usecase/src/i18nService';
import MetadataService from '@/usecases/metadataService';

import { initServerMSW } from '@/mocks';
import { MockProvider } from '@/mocks/MockProvider';
import { PortalProvider } from '@repo/ui/contexts/PortalContext';
import { fontVariables } from '../fonts';

const metadataService = new MetadataService();

export const metadata: Metadata = {
  title: metadataService.title,
  description: metadataService.description,
  other: {
    'permissions-policy': metadataService.permissionsPolicy,
  },
};

if (process.env.NEXT_PUBLIC_USE_API_MOCKING === 'true') {
  initServerMSW();
}

export async function generateStaticParams() {
  // 일단 한국 서비스라 SSG로 ko 설정
  return Object.values(SupportISO639Language).map((lang) => ({
    lang,
  }));
}

interface Props extends WithChildren, WithParams {}

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const i18nService = new I18nService({ store: await params });
  const lang = i18nService.getLang();
  const fontCofig = i18nService.getFontConfig(fontVariables);

  const isMocking = process.env.NEXT_PUBLIC_USE_API_MOCKING === 'true';

  const Wrapper = isMocking ? MockProvider : Fragment;

  return (
    <html lang={lang} className={fontCofig.variable}>
      <body className={fontCofig.className}>
        <Wrapper>
          <PortalProvider>
            {children}
          </PortalProvider>
        </Wrapper>
      </body>
    </html>
  );
}
