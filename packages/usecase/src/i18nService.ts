import {
  isSupportLang,
  SupportISO639Language,
  type I18NRepository,
} from '@repo/entity/src/i18n';
import { WithStore, type BaseStore } from './base';

interface FontConfig {
  variable: string;
  className: string;
}

interface FontVariables {
  ko: FontConfig;
  ja?: FontConfig;
  default: FontConfig;
}

export default class I18nService extends WithStore {
  private readonly i18nRepository: I18NRepository | null;

  constructor({
    i18nRepository,
    store,
  }: {
    i18nRepository?: I18NRepository;
    store?: BaseStore;
  }) {
    super(store);

    this.i18nRepository = i18nRepository ?? null;
  }

  getLang(): SupportISO639Language {
    const lang = this.store?.['lang'];

    if (typeof lang !== 'string') {
      throw new Error('lang is not string');
    }

    if (!isSupportLang(lang)) {
      throw new Error(`lang(${lang}) is not support`);
    }

    return lang;
  }

  getFontConfig(fontVariables: FontVariables): FontConfig {
    const lang = this.getLang();
    switch (lang) {
      case 'ko':
        return fontVariables.ko;
      // case 'ja':
      //   return fontVariables.ja ?? fontVariables.default;
      default:
        return fontVariables.default;
    }
  }
}
