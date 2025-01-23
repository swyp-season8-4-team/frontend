import 'server-only';

import type {
  Dictionary,
  I18NDictionaryData,
  I18NRepository
} from '@repo/entity/src/i18n';
import fs from 'fs';

const path = '../../packages/locale/src';

const cachedDictionaries: { [key: string]: Dictionary } = {};

export default class I18NLocalFileRepository implements I18NRepository {
  async getDictionary({
    lang,
    namespace,
  }: I18NDictionaryData): Promise<Dictionary> {
    const cachedDictionary = cachedDictionaries[`${lang}:${namespace}`];
    if (cachedDictionary) {
      return Promise.resolve(cachedDictionary);
    }

    const promise = new Promise<Dictionary>((resolve, reject) => {
      fs.readFile(`${path}/${lang}/${namespace}.json`, (error, data) => {
        if (!error && data) {
          cachedDictionaries[`${lang}:${namespace}`] = JSON.parse(
            data.toString()
          );
          resolve(cachedDictionaries[`${lang}:${namespace}`] as Dictionary);
        } else {
          reject(new Error(`Failed to read ${path}/${lang}/${namespace}.json`));
        }
      });
    });

    return promise;
  }
}
