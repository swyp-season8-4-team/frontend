import {
  type Dictionary,
  DictionaryNamespace,
  type I18NDictionaryData,
  type I18NRepository,
} from '@repo/entity/src/i18n';

export default class I18NModuleRepository implements I18NRepository {
  private readonly dictionaries: {
    [key: string]: { [key: string]: () => Promise<Dictionary> };
  };

  constructor() {
    this.dictionaries = {
      en: {
        [DictionaryNamespace.error]: () =>
          import('@repo/locale/src/en/error.json').then((module) => module.default),
      },
      ko: {
        [DictionaryNamespace.error]: () =>
          import('@repo/locale/src/ko/error.json').then((module) => module.default),
      },
    };
  }

  async getDictionary({
    lang,
    namespace,
  }: I18NDictionaryData): Promise<Dictionary> {
    const dictionary = await this.dictionaries[lang][namespace]();

    return dictionary;
  }
}
