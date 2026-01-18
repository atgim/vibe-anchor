#!/usr/bin/env node

const path = require('path');
const { init } = require('../src/commands/init');

const args = process.argv.slice(2);
const command = args[0];

function showHelp() {
  console.log(`
vibe-anchor - 바이브 코딩의 컨텍스트 유지 도구

사용법:
  vibe-anchor init [project-name]    프로젝트에 vibe-anchor 초기화
  vibe-anchor --help                 도움말 표시
  vibe-anchor --version              버전 표시

예시:
  cd my-project
  npx vibe-anchor init

  # 또는 프로젝트명 지정
  npx vibe-anchor init my-app

설치 후 사용 가능한 slash commands:
  /init        프로젝트 헌법(constitution) 작성
  /intent      코딩 의도 기록
  /constraint  수정 금지 사항 등록
  /task        태스크 정의
  /cycle       TDD 사이클 (red/green/refactor/commit)
  /review      세션 정리
  /status      현재 상태 확인

자세한 내용: https://github.com/user/vibe-anchor
`);
}

function showVersion() {
  const pkg = require('../package.json');
  console.log(`vibe-anchor v${pkg.version}`);
}

async function main() {
  switch (command) {
    case 'init':
      const projectName = args[1] || path.basename(process.cwd());
      await init(process.cwd(), projectName);
      break;

    case '--help':
    case '-h':
    case undefined:
      showHelp();
      break;

    case '--version':
    case '-v':
      showVersion();
      break;

    default:
      console.error(`알 수 없는 명령어: ${command}`);
      console.log('사용법을 보려면: vibe-anchor --help');
      process.exit(1);
  }
}

main().catch(err => {
  console.error('오류 발생:', err.message);
  process.exit(1);
});
