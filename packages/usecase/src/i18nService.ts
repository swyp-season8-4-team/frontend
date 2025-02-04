import { isSupportLang, SupportISO639Language, type I18NRepository } from "@repo/entity/src/i18n";
import { WithStore, type BaseStore } from "./base";

export default class I18nService extends WithStore {
  private readonly repository: I18NRepository | null;

  constructor({
    i18nRepository: repository,
    store,
  }: {
    i18nRepository?: I18NRepository;
    store?: BaseStore;
  }) {
    super(store);

    this.repository = repository ?? null;
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
}