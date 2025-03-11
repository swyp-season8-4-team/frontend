import micromatch from 'micromatch';
import { relative } from 'path';

// 파일 패턴 정의를 중앙화
const FILE_PATTERNS = {
  nextJs: (app) => [`**/apps/${app}/src/**/*.{js,jsx,ts,tsx}`],
  scripts: [
    '**/apps/*/!(src)/**/?(.)*.{js,mjs,ts}',
    '**/packages/**/?(.)*.{js,mjs,ts}',
  ],
  styles: ['**/?(.)*.{html,css,json}'],
  ignore: ['/public/'],
};

// 앱 목록 중앙화 (확장성 고려)
const APPS = ['desserbee-web'];

/**
 * Next.js 린트 명령어 생성
 * @param {string} app - 앱 이름
 * @param {string[]} filenames - 린트할 파일 목록
 * @returns {string} 린트 명령어
 */
function buildNextLintCommand(app, filenames) {
  if (filenames.length === 0) return 'echo "No NextJS files to lint"';

  const relativeFilenames = filenames.map((filename) =>
    relative(process.cwd(), filename).replace(`apps/${app}`, '.'),
  );

  return `pnpm --filter ${app} lint --fix --file ${relativeFilenames.join(' --file ')}`;
}

/**
 * ESLint 명령어 생성
 * @param {string[]} filenames - 린트할 파일 목록
 * @returns {string} ESLint 명령어
 */
function buildEslintCommand(filenames) {
  const filteredFiles = filenames.filter(
    (filename) =>
      !FILE_PATTERNS.ignore.some((pattern) => filename.includes(pattern)),
  );

  if (filteredFiles.length === 0) return 'echo "No files to lint"';

  return `eslint --fix --no-ignore ${filteredFiles.join(' ')}`;
}

/**
 * Prettier 명령어 생성
 * @param {string[]} filenames - 포맷팅할 파일 목록
 * @returns {string} Prettier 명령어
 */
function buildPrettierCommand(filenames) {
  const filteredFiles = filenames.filter(
    (filename) =>
      !FILE_PATTERNS.ignore.some((pattern) => filename.includes(pattern)),
  );

  if (filteredFiles.length === 0) return 'echo "No files to prettier"';

  return `prettier --write ${filteredFiles.join(' ')}`;
}

/**
 * 특정 앱의 Next.js 파일 필터링
 * @param {string} app - 앱 이름
 * @param {string[]} allFiles - 모든 파일 목록
 * @returns {string[]} 필터링된 파일 목록
 */
function getNextFilesForApp(app, allFiles) {
  return micromatch(allFiles, FILE_PATTERNS.nextJs(app));
}

/**
 * 린트 명령어 생성 및 실행
 */
const linter = {
  '*': (allFiles) => {
    // 모든 앱에 대한 명령어 생성
    const commands = [];

    // 각 앱에 대한 Next.js 린트 및 포맷팅 명령어 추가
    APPS.forEach((app) => {
      const nextFiles = getNextFilesForApp(app, allFiles);
      if (nextFiles.length > 0) {
        commands.push(buildNextLintCommand(app, nextFiles));
        commands.push(buildPrettierCommand(nextFiles));
      }
    });

    // 스크립트 파일에 대한 ESLint 및 Prettier 명령어 추가
    const scriptFiles = micromatch(allFiles, FILE_PATTERNS.scripts);
    if (scriptFiles.length > 0) {
      commands.push(buildEslintCommand(scriptFiles));
      commands.push(buildPrettierCommand(scriptFiles));
    }

    // 스타일 파일에 대한 Prettier 명령어 추가
    const styleFiles = micromatch(allFiles, FILE_PATTERNS.styles);
    if (styleFiles.length > 0) {
      commands.push(buildPrettierCommand(styleFiles));
    }

    return commands;
  },
};

export default linter;
