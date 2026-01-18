const fs = require('fs');
const path = require('path');

/**
 * 디렉토리가 없으면 생성
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * 파일이 없을 때만 생성 (기존 파일 보존)
 */
function writeFileIfNotExists(filePath, content) {
  ensureDir(path.dirname(filePath));
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

/**
 * 파일 강제 생성 (덮어쓰기)
 */
function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

/**
 * 파일 읽기
 */
function readFile(filePath) {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf8');
  }
  return null;
}

/**
 * 템플릿의 플레이스홀더 치환
 */
function renderTemplate(template, variables) {
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(regex, value);
  }
  return result;
}

/**
 * 오늘 날짜 (YYYY-MM-DD)
 */
function today() {
  return new Date().toISOString().split('T')[0];
}

module.exports = {
  ensureDir,
  writeFileIfNotExists,
  writeFile,
  readFile,
  renderTemplate,
  today
};
