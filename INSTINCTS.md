# Jira Ticket Workflow Instincts & Skills

이 문서는 ddalkak-date 프로젝트의 **Continuous Learning v2** 시스템에 의해 자동으로 생성된 Instincts과 Skills를 설명합니다.

## 📚 학습 시스템 위치

모든 Instincts과 Skills는 다음 위치에 저장됩니다:

```
~/.claude/homunculus/
├── instincts/personal/         ← 5개 원자적 패턴
├── evolved/skills/             ← 1개 통합 워크플로우 스킬
├── evolved/commands/           ← 1개 빠른 접근 커맨드
└── README.md                   ← 상세 가이드
```

## 🎯 5가지 Core Instincts

### 1. jira-branch-naming (신뢰도: 0.9)
**Trigger**: Jira 티켓 작업 시작

**Action**: Jira 티켓 ID 기반 브랜치 네이밍
```
패턴: {TICKET-KEY}/{kebab-case-description}
예제: DDALKAK-5/course-generation-form
```

**파일**: `~/.claude/homunculus/instincts/personal/jira-branch-naming.md`

---

### 2. jira-commit-message-format (신뢰도: 0.9)
**Trigger**: 기능 브랜치에 커밋할 때

**Action**: 구조화된 커밋 메시지 형식
```
형식: DDALKAK-{number}: {type} {description}
타입: feat, fix, refactor, docs, test, chore, perf, ci
```

**파일**: `~/.claude/homunculus/instincts/personal/jira-commit-message-format.md`

---

### 3. jira-dod-verification (신뢰도: 0.95) ⭐ CRITICAL
**Trigger**: 머지 또는 Jira 티켓 종료 시

**Action**: Definition of Done 검증 (필수/블로킹)
```
검증 섹션:
1. Code Implementation (코드 구현)
2. Testing & Integration (테스트 검증)
3. Documentation (문서화)
4. Jira Updates (Jira 업데이트)

⚠️ 모든 항목이 완료되어야 머지 가능
```

**파일**: `~/.claude/homunculus/instincts/personal/jira-dod-verification.md`

---

### 4. git-master-push-only (신뢰도: 0.95) ⭐ CRITICAL
**Trigger**: 코드 커밋 또는 머지 시

**Action**: 엄격한 git 워크플로우 강제
```
✅ ALWAYS:
- Feature branch에서만 작업
- 최신 master에서 브랜치 생성
- 머지 전 rebase 필수
- DoD 검증 완료 후 머지

❌ NEVER:
- Master에 직접 커밋
- DoD 미완료 상태로 머지
- Force push (공유 브랜치)
- 7일 이상 미병합 상태 방치
```

**파일**: `~/.claude/homunculus/instincts/personal/git-master-push-only.md`

---

### 5. playwright-required-for-frontend (신뢰도: 0.9)
**Trigger**: UI/프론트엔드 변경할 때

**Action**: Playwright MCP 테스트 필수
```
필수 테스트:
1. Component Rendering (렌더링)
2. User Interactions (사용자 상호작용)
3. Responsive Design (반응형)
4. Error States (에러 상태)
5. Visual Evidence (스크린샷)

Playwright Tools:
- browser_navigate, browser_fill, browser_click
- browser_snapshot, browser_take_screenshot
- browser_wait_for, browser_press_key
```

**파일**: `~/.claude/homunculus/instincts/personal/playwright-required-for-frontend.md`

---

## 🎯 Evolved Skill: jira-ticket-workflow

**신뢰도**: 0.92 (5개 instinct의 평균)

5개의 원자적 Instinct를 하나의 완전한 워크플로우로 통합합니다.

### 사용 패턴

**패턴 1: 새 티켓 시작**
```
/jira-ticket start DDALKAK-5
→ DDALKAK-5/feature-name 브랜치 자동 생성
→ 최신 master에서 기반 설정
→ 작업 준비 완료
```

**패턴 2: 커밋 생성**
```
/jira-ticket commit "add form component"
→ ESLint & Prettier 검사
→ "DDALKAK-5: feat: add form component" 형식으로 커밋
→ 원격 저장소에 푸시
```

**패턴 3: DoD 검증**
```
/jira-ticket verify
→ DoD 체크리스트 4개 섹션 표시
→ 프론트엔드 변경 감지 시 Playwright 자동 실행
→ 스크린샷 증거 수집
→ 모든 항목 완료 확인
```

**패턴 4: Master로 머지**
```
/jira-ticket merge
→ DoD 완료 확인 (미완료 시 블로킹)
→ 최신 master에서 rebase
→ master로 머지
→ 원격 저장소 푸시
→ feature 브랜치 삭제
```

**패턴 5: Jira 티켓 종료**
```
/jira-ticket close DDALKAK-5
→ Master에 머지 확인
→ Jira 완료 코멘트 자동 생성
→ 테스트 증거 포함
→ Jira 상태를 "완료" (Done)로 전환
```

**파일**: `~/.claude/homunculus/evolved/skills/jira-ticket-workflow.md`

---

## ⚡ Command: /jira-ticket

빠른 접근을 위한 커맨드

```
/jira-ticket start {TICKET-ID} [{description}]
/jira-ticket commit {MESSAGE}
/jira-ticket verify
/jira-ticket merge
/jira-ticket close {TICKET-ID}
/jira-ticket status [{TICKET-ID}]
```

**파일**: `~/.claude/homunculus/evolved/commands/jira-ticket.md`

---

## 🚀 즉시 사용 시작

### 기본 워크플로우
```bash
# 1. 새 티켓으로 시작
/jira-ticket start DDALKAK-5

# 2. 작업하고 커밋
/jira-ticket commit "add form component"

# 3. 상태 확인
/jira-ticket status

# 4. DoD 검증
/jira-ticket verify

# 5. Master로 머지
/jira-ticket merge

# 6. Jira 티켓 종료
/jira-ticket close DDALKAK-5
```

### Instinct 관리
```bash
# 현재 학습된 모든 instinct 보기
/instinct-status

# 새로운 스킬로 진화시키기
/evolve

# Instinct 내보내기 (팀 공유)
/instinct-export jira-branch-naming

# Instinct 임포트
/instinct-import ./shared-instincts.json
```

---

## 📊 신뢰도 점수 시스템

| Instinct | 신뢰도 | 의미 |
|----------|--------|------|
| jira-branch-naming | 0.9 | 강함 (거의 확실) |
| jira-commit-message-format | 0.9 | 강함 |
| jira-dod-verification | **0.95** | 거의확실 ⭐ |
| git-master-push-only | **0.95** | 거의확실 ⭐ |
| playwright-required-for-frontend | 0.9 | 강함 |

**신뢰도 증가 조건:**
- 패턴이 반복적으로 관찰됨
- 사용자가 패턴을 수정하지 않음
- 다른 소스의 유사 instinct과 일치

**신뢰도 감소 조건:**
- 사용자가 명시적으로 패턴을 변경함
- 오래 동안 관찰되지 않음
- 모순되는 증거 발견

---

## 🎓 지속적 학습

### 자동 학습 메커니즘

```
Session Activity
      ↓
Observations (PreToolUse/PostToolUse hooks)
      ↓
Pattern Detection (Background observer agent)
      ↓
Instinct Creation/Update
      ↓
Confidence Scoring
      ↓
Skill Evolution (관련 instincts 자동 클러스터링)
```

### Instinct 진화 과정

1. **Atomic Instincts** (개별 패턴)
   - 하나의 trigger, 하나의 action
   - 신뢰도 점수 0.3-0.9

2. **Clustered Skills** (관련 패턴 그룹)
   - 여러 관련 instinct를 하나의 워크플로우로
   - 신뢰도: 포함된 instinct들의 평균

3. **Commands** (빠른 접근)
   - Skill의 사용자 친화적 인터페이스
   - 자주 사용하는 작업 자동화

4. **Agents** (전문 에이전트)
   - 복잡한 작업 자동화
   - 현재는 미사용, 향후 추가 가능

---

## 🔐 블로킹 규칙 (반드시 지켜야 함)

### Critical (DoD 0.95)

1. **DoD 미완료 상태로 머지 금지**
   - 4개 섹션 모두 완료 필수
   - 체크리스트 항목 모두 확인 필수

2. **Master 직접 커밋 금지**
   - Feature branch에서만 작업
   - 모든 커밋에 DDALKAK-{number} 포함

3. **Rebase 없이 머지 금지**
   - 커밋 히스토리 정리 필수
   - 머지 커밋 방지

---

## 📁 파일 구조

```
~/.claude/homunculus/
├── README.md                    ← 사용 가이드
├── identity.json               ← 프로젝트 정보
├── observations.jsonl          ← 학습 기록
├── instincts/
│   ├── personal/               ← 자동 학습 패턴
│   │   ├── jira-branch-naming.md
│   │   ├── jira-commit-message-format.md
│   │   ├── jira-dod-verification.md
│   │   ├── git-master-push-only.md
│   │   └── playwright-required-for-frontend.md
│   └── inherited/              ← 임포트된 패턴
├── evolved/
│   ├── skills/
│   │   └── jira-ticket-workflow.md
│   ├── commands/
│   │   └── jira-ticket.md
│   └── agents/                 ← 향후 사용
```

---

## 🔗 관련 문서

- **CLAUDE.md**: Git Workflow for Jira Tickets (원본 정의)
- **homunculus/README.md**: 전체 학습 시스템 가이드
- **Skill Creator**: https://skill-creator.app

---

**마지막 업데이트**: 2026-02-08
**System**: Continuous Learning v2 (Instinct-based)
**Status**: ✅ 완전히 배포 및 사용 가능

