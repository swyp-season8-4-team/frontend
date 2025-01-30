import "@repo/ui/styles/globals.css";

import type { Metadata } from "next";
import type { WithParams } from "@/app";
import type { WithChildren } from "@repo/ui";
import { SupportISO639Language } from "@repo/entity/src/i18n";
import I18nService from "@repo/usecase/src/i18nService";
import { initMSW } from "@/mocks";
import MetadataService from "@/usecases/metadataService";
import Script from "next/script";

const metadataService = new MetadataService();

export const metadata: Metadata = {
  title: metadataService.title,
  description: metadataService.description,
};

if (process.env.NEXT_PUBLIC_USE_API_MOCKING === "true") {
  initMSW();
}

export async function generateStaticParams() {
  // 일단 한국 서비스라 SSG로 ko 설정
  return Object.values(SupportISO639Language).map((lang) => ({
    lang,
  }));
}

interface Props extends WithChildren, WithParams {}

const API = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_API_KEY}`;
export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const i18nService = new I18nService({ store: await params });
  const lang = i18nService.getLang();

  return (
    <html lang={lang}>
      <body>
        <Script type="text/javascript" src={API} />
        {children}
      </body>
    </html>
  );
}
