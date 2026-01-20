const path = require('path');
const fs = require('fs');
const { ensureDir, writeFileIfNotExists, today } = require('../utils/file');

// 템플릿 디렉토리 경로
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

/**
 * 템플릿 파일 읽기
 */
function loadTemplate(name) {
  const templatePath = path.join(TEMPLATES_DIR, name);
  return fs.readFileSync(templatePath, 'utf8');
}

/**
 * 플레이스홀더 치환
 */
function render(template, vars) {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), value);
  }
  return result;
}

/**
 * vibe-anchor v0.2 초기화
 */
async function init(targetDir, projectName) {
  console.log(`\nvibe-anchor v0.2 초기화 중...\n`);
  console.log(`   프로젝트: ${projectName}`);
  console.log(`   경로: ${targetDir}\n`);

  const vars = {
    projectName,
    date: today()
  };

  // 1. .claude 디렉토리 구조 생성
  const claudeDir = path.join(targetDir, '.claude');
  const commandsDir = path.join(claudeDir, 'commands');
  ensureDir(commandsDir);

  // 2. specs 디렉토리 생성 (SDD 산출물)
  const specsDir = path.join(targetDir, 'specs');
  ensureDir(specsDir);

  // 3. .vibe-anchor 디렉토리 구조 생성 (v0.2: 최소화)
  const vibeDir = path.join(targetDir, '.vibe-anchor');
  const dirs = [
    path.join(vibeDir, 'cycles')
  ];
  dirs.forEach(ensureDir);

  // 4. CLAUDE.md 생성
  const claudeMdPath = path.join(claudeDir, 'CLAUDE.md');
  const claudeMdTemplate = loadTemplate('claude.md.hbs');
  const claudeMdCreated = writeFileIfNotExists(claudeMdPath, render(claudeMdTemplate, vars));
  logFile(claudeMdPath, claudeMdCreated);

  // 5. cycles/current.md 생성
  const cyclesPath = path.join(vibeDir, 'cycles', 'current.md');
  const cyclesTemplate = loadTemplate('cycles-current.md.hbs');
  const cyclesCreated = writeFileIfNotExists(cyclesPath, render(cyclesTemplate, vars));
  logFile(cyclesPath, cyclesCreated);

  // 6. slash commands 복사 (v0.2)
  const slashCommands = ['init', 'specify', 'clarify', 'plan', 'tasks', 'cycle', 'review', 'status'];
  console.log('\nSlash commands 설치:');

  for (const cmd of slashCommands) {
    const srcPath = path.join(TEMPLATES_DIR, 'commands', `${cmd}.md`);
    const destPath = path.join(commandsDir, `${cmd}.md`);

    if (fs.existsSync(srcPath)) {
      const template = fs.readFileSync(srcPath, 'utf8');
      const created = writeFileIfNotExists(destPath, render(template, vars));
      logFile(destPath, created, `/${cmd}`);
    }
  }

  // 완료 메시지
  console.log(`
vibe-anchor v0.2 초기화 완료!

다음 단계:
  1. Claude Code에서 /init 실행하여 프로젝트 원칙(Constitution) 작성
  2. /specify 로 첫 번째 기능 명세 작성
  3. /clarify 로 모호한 부분 해소
  4. /plan 으로 기술 계획 수립
  5. /tasks 로 태스크 분해
  6. /cycle red → green → refactor → commit 으로 TDD 진행

사용 가능한 명령어:
  /init        프로젝트 원칙 작성
  /specify     기능 명세 작성 (SDD)
  /clarify     모호함 해소
  /plan        기술 계획 수립
  /tasks       태스크 분해
  /cycle       TDD 사이클
  /review      시행착오 기록 & 수정주의 반영
  /status      현재 상태 확인
`);
}

function logFile(filePath, created, alias = null) {
  const relativePath = path.relative(process.cwd(), filePath);
  const status = created ? '[생성]' : '[이미 존재]';
  const name = alias ? `${alias} (${relativePath})` : relativePath;
  console.log(`   ${status}: ${name}`);
}

module.exports = { init };
