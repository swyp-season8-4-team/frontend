export interface Dictionary {
  [key: string]: string;
}

export enum DictionaryNamespace {
  error = 'error',
}

export enum LangToLocale {
  // en = 'en_US',
  // es = 'es_ES',
  // id = 'id_ID',
  // ja = 'ja_JP',
  ko = 'ko_KR',
  // pt = 'pt_BR',
  // th = 'th_TH',
  // vi = 'vi_VN',
  // ms = 'ms_MY',
  // ru = 'ru_RU',
  // de = 'de_DE',
  // fr = 'fr_FR',
  // it = 'it_IT',
  // zh = 'zh_TW',
  // tr = 'tr_TR',
}

export enum SupportISO639Language {
  // en = 'en',
  // es = 'es',
  // id = 'id',
  // ja = 'ja',
  ko = 'ko',
  // pt = 'pt',
  // th = 'th',
  // vi = 'vi',
  // ms = 'ms',
  // ru = 'ru',
  // de = 'de',
  // fr = 'fr',
  // it = 'it',
  // zh = 'zh',
  // tr = 'tr',
}

export enum SupportLocale {
  // en_US = 'en_US',
  // es_ES = 'es_ES',
  // id_ID = 'id_ID',
  // ja_JP = 'ja_JP',
  ko_KR = 'ko_KR',
  // pt_BR = 'pt_BR',
  // th_TH = 'th_TH',
  // vi_VN = 'vi_VN',
  // ms_MY = 'ms_MY',
  // ru_RU = 'ru_RU', // 러시아
  // de_DE = 'de_DE', // 독일
  // fr_FR = 'fr_FR', // 프랑스
  // it_IT = 'it_IT', // 이탈리아
  // zh_TW = 'zh_TW', // 대만
  // tr_TR = 'tr_TR', // 터키
}

export enum SupportISOLocale {
  // en = 'en-US',
  // es = 'es-ES',
  // id = 'id-ID',
  // ja = 'ja-JP',
  ko = 'ko-KR',
  // pt = 'pt-BR',
  // th = 'th-TH',
  // vi = 'vi-VN',
  // ms = 'ms-MY',
  // ru = 'ru-RU',
  // de = 'de-DE',
  // fr = 'fr-FR',
  // it = 'it-IT',
  // zh = 'zh-TW',
  // tr = 'tr-TR',
}

export function isSupportLang(lang?: string): lang is SupportISO639Language {
  return Object.keys(SupportISO639Language).find((key: string) => key === lang) !== undefined
}

export function isSupportLocale(locale?: string): locale is SupportLocale {
  return Object.keys(SupportLocale).find((key) => key === locale) !== undefined;
}

export interface I18NDictionaryData {
  lang: SupportISO639Language;
  namespace: DictionaryNamespace;
}

export interface I18NRepository {
  getDictionary(data: {
    lang: SupportISO639Language;
    namespace: DictionaryNamespace;
  }): Promise<Dictionary>;
}
