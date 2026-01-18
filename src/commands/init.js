const path = require('path');
const fs = require('fs');
const { ensureDir, writeFileIfNotExists, writeFile, today } = require('../utils/file');

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
 * vibe-anchor 초기화
 */
async function init(targetDir, projectName) {
  console.log(`\n🔧 vibe-anchor 초기화 중...\n`);
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

  // 2. .vibe-anchor 디렉토리 구조 생성
  const vibeDir = path.join(targetDir, '.vibe-anchor');
  const dirs = [
    path.join(vibeDir, 'intents'),
    path.join(vibeDir, 'constraints'),
    path.join(vibeDir, 'cycles'),
    path.join(vibeDir, 'tasks'),
    path.join(vibeDir, 'sessions')
  ];
  dirs.forEach(ensureDir);

  // 3. CLAUDE.md 생성
  const claudeMdPath = path.join(claudeDir, 'CLAUDE.md');
  const claudeMdTemplate = loadTemplate('claude.md.hbs');
  const claudeMdCreated = writeFileIfNotExists(claudeMdPath, render(claudeMdTemplate, vars));
  logFile(claudeMdPath, claudeMdCreated);

  // 4. constitution.md 생성
  const constitutionPath = path.join(vibeDir, 'constitution.md');
  const constitutionTemplate = loadTemplate('constitution.md.hbs');
  const constitutionCreated = writeFileIfNotExists(constitutionPath, render(constitutionTemplate, vars));
  logFile(constitutionPath, constitutionCreated);

  // 5. intents/_index.md 생성
  const intentsIndexPath = path.join(vibeDir, 'intents', '_index.md');
  const intentsIndexTemplate = loadTemplate('intents-index.md.hbs');
  const intentsCreated = writeFileIfNotExists(intentsIndexPath, render(intentsIndexTemplate, vars));
  logFile(intentsIndexPath, intentsCreated);

  // 6. constraints/global.md 생성
  const constraintsPath = path.join(vibeDir, 'constraints', 'global.md');
  const constraintsTemplate = loadTemplate('constraints-global.md.hbs');
  const constraintsCreated = writeFileIfNotExists(constraintsPath, render(constraintsTemplate, vars));
  logFile(constraintsPath, constraintsCreated);

  // 7. tasks/backlog.md 생성
  const backlogPath = path.join(vibeDir, 'tasks', 'backlog.md');
  const backlogTemplate = loadTemplate('tasks-backlog.md.hbs');
  const backlogCreated = writeFileIfNotExists(backlogPath, render(backlogTemplate, vars));
  logFile(backlogPath, backlogCreated);

  // 8. tasks/current.md 생성
  const currentTaskPath = path.join(vibeDir, 'tasks', 'current.md');
  const currentTaskTemplate = loadTemplate('tasks-current.md.hbs');
  const currentTaskCreated = writeFileIfNotExists(currentTaskPath, render(currentTaskTemplate, vars));
  logFile(currentTaskPath, currentTaskCreated);

  // 9. cycles/current.md 생성
  const cyclesPath = path.join(vibeDir, 'cycles', 'current.md');
  const cyclesTemplate = loadTemplate('cycles-current.md.hbs');
  const cyclesCreated = writeFileIfNotExists(cyclesPath, render(cyclesTemplate, vars));
  logFile(cyclesPath, cyclesCreated);

  // 10. slash commands 복사
  const slashCommands = ['init', 'intent', 'constraint', 'task', 'cycle', 'review', 'status'];
  console.log('\n📝 Slash commands 설치:');

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
✅ vibe-anchor 초기화 완료!

다음 단계:
  1. Claude Code에서 /init 실행하여 프로젝트 헌법 작성
  2. /intent 로 첫 번째 코딩 의도 기록
  3. /task 로 작은 태스크 정의
  4. /cycle red → green → refactor → commit 으로 TDD 진행

사용 가능한 명령어:
  /init        프로젝트 헌법 작성
  /intent      의도 기록
  /constraint  수정 금지 등록
  /task        태스크 정의
  /cycle       TDD 사이클
  /review      세션 정리
  /status      현재 상태
`);
}

function logFile(filePath, created, alias = null) {
  const relativePath = path.relative(process.cwd(), filePath);
  const status = created ? '✅ 생성' : '⏭️  이미 존재';
  const name = alias ? `${alias} (${relativePath})` : relativePath;
  console.log(`   ${status}: ${name}`);
}

module.exports = { init };
