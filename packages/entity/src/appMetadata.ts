import type { SupportLocale } from './i18n';

export interface BaseRequestData<D extends unknown> {
  abortController?: AbortController | null;
  authorization?: string | null;
  data?: D;
  headers?: HeaderData | null;
  retry?: boolean;
}

export interface HeaderData {
  ['user-agent']?: string;
  ['x-android-deviceid']?: string;
  ['x-android-version']?: string;
  ['x-app-id']: string;
  ['x-ios-device-id']?: string;
  ['x-ios-version']?: string;
  ['x-service-locale']: SupportLocale;
}

export interface AppMetadataRepository {
  getAcceptLanguage(): string | null;
}
