import type { Preference } from "@repo/entity/src/preference";

export default class PreferenceConverter {
  convertRawToPreference(raw: number[]): Preference[] {
    return raw.map(id => {
      switch (id) {
        case 1:
          return '비건';
        case 2:
          return '글루텐프리';
        case 3:
          return '락토프리';
        case 4:
          return '로우슈가';
        case 5:
          return '키토제닉';
        case 6:
          return '할매픽';
        case 7:
          return '트렌디';
        case 8:
          return '비주얼';
        case 9:
          return '리미티드';
        case 10:
          return '로컬라이징';
        case 11:
          return '꿀조합';
        default:
          throw new Error('Invalid preference id');
      }
    });
  }

  convertPreferenceToRaw(preference: Preference[]): number[] {
    return preference.map(p => {
      switch (p) {
        case '비건':
          return 1;
        case '글루텐프리':
          return 2;
        case '락토프리':
          return 3;
        case '로우슈가':
          return 4;
        case '키토제닉':
          return 5;
        case '할매픽':
          return 6;
        case '트렌디':
          return 7;
        case '비주얼':
          return 8;
        case '리미티드':
          return 9;
        case '로컬라이징':
          return 10;
        case '꿀조합':
          return 11;
        default:
          throw new Error('Invalid preference');
      }
    });
  }
}
