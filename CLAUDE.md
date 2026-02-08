# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## ⚠️ CRITICAL: Definition of Done (DoD) is MANDATORY

**BEFORE marking ANY Jira ticket as "완료" (Done), you MUST:**

1. ✅ Complete ALL code implementation tasks
2. ✅ Run full testing verification:
   - **Frontend**: Use Playwright MCP to test UI (screenshots required)
   - **Backend**: Make actual API calls to test integration
3. ✅ Check ALL items in the DoD checklist in Jira
4. ✅ Add detailed completion comment with test evidence
5. ✅ Only then transition status to "완료"

**If DoD checklist is incomplete, DO NOT mark the ticket as done.**

---

## Project Overview

**데이트 딸깍 (Date Ddalkak)** - AI-powered dating course recommendation service for Z-generation couples.

- **Vision**: "3분 만에 완성하는 검증된 데이트 코스" (Complete date course in 3 minutes)
- **MVP Launch Target**: 2026-05-01 (12-week development cycle)
- **Tech Stack**: Next.js 16 (Frontend) + Spring Boot (Backend) + AWS (Infrastructure)
- **Architecture**: Monorepo with separate `frontend/` directory

## Repository Structure

```
ddalkak-date/
├── frontend/              # Next.js TypeScript web app
│   ├── src/
│   │   ├── pages/        # Next.js Pages Router
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API service layer
│   │   ├── utils/        # Utility functions
│   │   ├── types/        # TypeScript types
│   │   ├── lib/          # Library configs
│   │   ├── constants/    # Constants
│   │   └── styles/       # CSS/Tailwind
│   ├── public/           # Static assets
│   ├── .eslintrc.mjs     # ESLint config
│   ├── .prettierrc.json  # Prettier config
│   ├── Dockerfile        # Multi-stage Docker build
│   ├── next.config.ts    # Next.js config (standalone output)
│   └── package.json
├── prd.md                # Product Requirements Document
├── README.md             # Root documentation
└── CLAUDE.md            # This file
```

## Frontend Development

### Common Commands

```bash
cd frontend

# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Format with Prettier
npm run format:check     # Check formatting

# Docker
docker build -t ddalkak-frontend .
docker run -p 3000:3000 ddalkak-frontend
```

### Code Standards

- **Language**: TypeScript (strict mode)
- **Framework**: Next.js 16 (Pages Router)
- **Styling**: Tailwind CSS 4
- **Code Style**: Enforced via Prettier + ESLint
- **React Version**: 19.2.3 (with React Compiler)

### Key Configuration Files

- **eslint.config.mjs**: Next.js + Prettier integration (no conflicts)
- **.prettierrc.json**: 100-character line width, single quotes, trailing commas
- **next.config.ts**: `output: 'standalone'` for Docker compatibility
- **tsconfig.json**: Strict type checking enabled

### Component Pattern

```typescript
// src/components/FeatureName.tsx
import { ReactNode } from 'react';

interface FeatureNameProps {
  title: string;
  children?: ReactNode;
}

export const FeatureName = ({ title, children }: FeatureNameProps) => {
  return <div>{title}</div>;
};
```

### API Service Pattern

```typescript
// src/services/courseService.ts
export const getCourseRecommendation = async (
  region: string,
  dateType: string,
  budget: number
) => {
  const response = await fetch('/api/v1/courses/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      region,
      date_type: dateType,
      budget,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};
```

## Critical Development Requirements

### Definition of Done (DoD) Checklist ⚠️ **MANDATORY**

**EVERY Jira ticket MUST complete ALL of the following before marking as "완료" (Done):**

#### 1. **Code Implementation**
- [ ] Code written and committed to git
- [ ] Code follows TypeScript/language standards
- [ ] No console.log, debug code, or commented code left
- [ ] No security vulnerabilities introduced
- [ ] Linting passes: `npm run lint`
- [ ] Formatting passes: `npm run format:check`

#### 2. **Testing & Integration Verification** (Non-Negotiable)

**Frontend Changes** 🎨
- [ ] **MUST** use Playwright MCP to test
- [ ] Component renders correctly
- [ ] User interactions work (clicks, inputs, navigation)
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Error states handled and displayed
- [ ] Screenshots/videos captured showing working feature
- [ ] No console errors or warnings

**Backend Changes** 🔌
- [ ] **MUST** test actual API calls (not just unit tests)
- [ ] API endpoint returns correct response format
- [ ] Error handling works (400, 500, etc.)
- [ ] Edge cases tested
- [ ] Response times acceptable (p95 < 500ms target)
- [ ] Database changes verified
- [ ] Backward compatibility checked

**Full-Stack Features** 🔄
- [ ] End-to-end flow tested from UI to database
- [ ] Frontend successfully calls backend API
- [ ] Data persists correctly
- [ ] Error handling works across layers

#### 3. **Documentation**
- [ ] Code comments added for complex logic
- [ ] Function/component types documented
- [ ] API responses documented (if applicable)

#### 4. **Jira Ticket Updates** 📋
- [ ] All DoD checklist items CHECKED in Jira
- [ ] Detailed completion comment added with:
  - What was implemented
  - How to test/verify it
  - Any breaking changes or dependencies
  - Screenshots/test results if applicable
- [ ] Status transitioned to "완료" (Done)

### How to Handle Jira Checklists

1. **Find the checklist** in the ticket description or use Jira's "Checklists" feature
2. **Check items as you complete them** - don't wait until the end
3. **Before marking complete**, verify ALL items are checked
4. **Add completion comment** with test results and evidence
5. **Only then** transition status to "완료"

Example Jira Comment with DoD Verification:
```markdown
## ✅ DDALKAK-XX Complete - All DoD Items Verified

### Code Implementation
- ✅ Code committed: abc1234
- ✅ ESLint: PASS
- ✅ Prettier: PASS
- ✅ No console logs or debug code

### Testing Verification
**Frontend Testing (Playwright):**
- ✅ Component renders on page load
- ✅ User can input data and submit
- ✅ Response displays correctly
- ✅ Mobile responsive (tested 375px width)
- ✅ Screenshot: [description of screenshot]

### Jira DoD Checklist
- ✅ Code implementation
- ✅ Testing complete
- ✅ Documentation added
- ✅ Ready for production

### How to Test
1. npm run dev
2. Navigate to [page]
3. Perform [action]
4. Verify [expected result]
```

## Git Workflow for Jira Tickets 🔀

### Branch Naming Convention

Create a feature branch for each Jira ticket using this format:

```
{ticket-key}/{description}

Examples:
- DDALKAK-1/setup-project
- DDALKAK-5/course-generation-form
- DDALKAK-12/fix-responsive-design
```

**Branch Naming Rules:**
- `{ticket-key}`: Jira ticket ID (e.g., DDALKAK-1)
- `{description}`: Lowercase, kebab-case, descriptive (max 50 chars)
- Do NOT use `master` or `main` for feature work

### Workflow: From Ticket to Merge

#### 1. **Start Work: Create Feature Branch**

```bash
# Update master with latest changes
git checkout master
git pull origin master

# Create feature branch from master
git checkout -b DDALKAK-{ticket-number}/{description}
```

#### 2. **Work & Commit**

**Commit Message Format:**
```
DDALKAK-{number}: {type} {description}

Detailed explanation of changes (if needed).

Examples:
- DDALKAK-5: feat: create course generation form
- DDALKAK-8: fix: responsive design on mobile
- DDALKAK-12: refactor: extract course card component
```

**Commit Types:**
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code reorganization (no behavior change)
- `docs:` Documentation updates
- `test:` Test additions/updates
- `chore:` Build process, dependencies, etc.

```bash
# Make changes and commit
git add .
git commit -m "DDALKAK-5: feat: create course generation form"

# Push feature branch
git push origin DDALKAK-{ticket-number}/{description}
```

#### 3. **Complete Work & Verify DoD**

Before merging:

1. ✅ All code changes are committed
2. ✅ All DoD checklist items from CLAUDE.md are completed:
   - Code implementation ✓
   - Testing & integration verification ✓
   - Documentation ✓
3. ✅ Linting and formatting pass:
   ```bash
   npm run lint
   npm run format:check
   ```
4. ✅ All tests pass (if applicable):
   ```bash
   npm run test
   ```
5. ✅ Add completion comment to Jira with evidence

#### 4. **Merge to Master**

Once DoD is verified:

```bash
# Ensure feature branch is up to date with master
git fetch origin
git rebase origin/master

# Switch to master
git checkout master
git pull origin master

# Merge feature branch
git merge DDALKAK-{ticket-number}/{description}

# Push to remote
git push origin master

# Delete feature branch (optional but recommended)
git branch -d DDALKAK-{ticket-number}/{description}
git push origin --delete DDALKAK-{ticket-number}/{description}
```

#### 5. **Close Jira Ticket**

Only after merge to master:
1. Add completion comment with test results
2. Transition status to "완료" (Done)
3. Reference commit hash in the ticket

**Example Jira Comment:**
```markdown
## ✅ DDALKAK-5 Complete

### Implementation
- ✅ Code merged to master (commit: abc1234)
- ✅ All tests passing
- ✅ ESLint and Prettier verified

### Testing (Playwright)
- ✅ Form renders correctly
- ✅ User can enter all fields
- ✅ Submit button triggers API call
- ✅ Response displays correctly
- ✅ Mobile responsive (375px tested)

### DoD Verification
- ✅ Code implementation complete
- ✅ Testing verification done
- ✅ Documentation updated
- ✅ Ready for production
```

### Quick Reference Commands

```bash
# List all branches
git branch -a

# Switch to existing branch
git checkout DDALKAK-{number}/{description}

# Create and switch to new branch
git checkout -b DDALKAK-{number}/{description}

# Check current branch
git branch

# View commit log for feature
git log master..HEAD

# Rebase before merge
git rebase origin/master

# See differences from master
git diff origin/master

# Undo last local commit (not pushed)
git reset --soft HEAD~1

# Force pull latest master (CAREFUL: loses local changes)
git fetch origin && git reset --hard origin/master
```

### Important Rules

⚠️ **NEVER**:
- Commit directly to `master`
- Force push (`git push -f`) to shared branches
- Merge without DoD verification
- Leave feature branches unmerged for > 7 days

✅ **ALWAYS**:
- Create branch from latest `master`
- Rebase before merging (keep history clean)
- Use descriptive commit messages
- Verify all DoD items before closing tickets
- Delete feature branch after merge

### Jira Integration

- **Tool**: Use `mcp__claude_ai_Atlassian__*` functions
- **Status Workflow**: 해야 할 일 → 진행 중 → 완료
- **Must Use**: Always verify DoD checklist before transitioning to "완료"
- **Link Branch to Ticket**: Reference ticket ID in commit messages and branch name

## Frontend Testing with Playwright MCP

### Required for ALL Frontend Changes

When making frontend changes, **ALWAYS** use Playwright MCP to verify:

```javascript
// Use mcp__playwright__* functions to:
1. Navigate to the feature page
2. Interact with components (click, type, select)
3. Verify expected results appear
4. Take screenshots showing the working feature
5. Test error states and edge cases
6. Verify responsive design

Example Test Flow:
- mcp__playwright__browser_navigate → page
- mcp__playwright__browser_fill → user input
- mcp__playwright__browser_click → submit action
- mcp__playwright__browser_snapshot → capture result
- mcp__playwright__browser_take_screenshot → save evidence
```

### Common Playwright MCP Tools

| Tool | Purpose |
|------|---------|
| `browser_navigate` | Navigate to URL |
| `browser_fill` / `browser_fill_form` | Fill input fields |
| `browser_click` | Click buttons/elements |
| `browser_snapshot` | Get accessibility tree (better than screenshot) |
| `browser_take_screenshot` | Capture visual proof |
| `browser_wait_for` | Wait for elements/text to appear |
| `browser_press_key` | Press keyboard keys |
| `browser_select_option` | Select dropdown options |

### Evidence Required for DoD Completion

Frontend changes MUST include:
1. **Snapshots**: HTML structure verification
2. **Screenshots**: Visual proof of working feature
3. **User interaction proof**: Evidence of click/input/navigation working
4. **Error state testing**: Screenshots of error messages
5. **Responsive testing**: Screenshots at different viewport sizes

---

## Core Features (MVP)

### Must Have (Implemented First)
- **F-002**: Course generation wizard (3-step form)
  - Step 1: Region selection
  - Step 2: Date type selection
  - Step 3: Budget slider (50K-300K KRW)
- **F-003**: AI course recommendation (rule-based, no login required)
- **F-004**: Course detail view with map and timeline
- **F-001**: Kakao OAuth login (optional, for personalization)

### Should Have (Post-MVP)
- **F-005**: Course saving to "My Courses" (requires login)
- **F-006**: Post-date satisfaction feedback
- **F-007**: Course sharing (KakaoTalk, Instagram)

### Key Requirements
- ✅ **No login required** for course generation
- ✅ **Responsive design** (mobile-first)
- ✅ **Performance**: p95 < 500ms API response
- ✅ **3-minute UX**: Course generation in <3 seconds

## API Endpoints (Backend)

```
POST /api/v1/courses/recommend
  Input: { region, date_type, budget, user_id? }
  Output: { courses[], request_id, generated_at }

GET /api/v1/places/{place_id}
  Output: { place_id, name, rating, price_range, coord, images, ... }
```

See `prd.md` section 6.3 for full API specs.

## Deployment & Docker

- **Base Image**: node:22-alpine (production-optimized)
- **Output Format**: Standalone Next.js build
- **User**: Non-root user for security
- **.dockerignore**: Excludes node_modules, .next, .env files

Build command:
```bash
cd frontend && docker build -t ddalkak-frontend:latest .
```

Run command:
```bash
docker run -p 3000:3000 --env-file .env.production ddalkak-frontend:latest
```

## Development Timeline (12 weeks)

- **Week 1-2**: Design & Architecture ← Currently in this phase
- **Week 3-5**: Backend Core (Kakao API, recommendation engine)
- **Week 6-8**: Frontend Core (Pages, components, API integration)
- **Week 9-10**: Integration & Testing
- **Week 11**: Beta Launch
- **Week 12**: Public Launch

## Design System

- **Primary Color**: #FF6B6B (Coral Pink)
- **Secondary Color**: #4ECDC4 (Mint)
- **Typography**: Pretendard font family
- **Component Library**: Tailwind CSS (no external UI library yet)

## Important Notes

1. **Single Repository**: Both frontend and backend will be in this repo (not separate repos)
2. **TypeScript Only**: All code must be TypeScript (.ts/.tsx)
3. **No Legacy Code**: This is a greenfield project, no legacy patterns to maintain
4. **Jira-Driven**: Use Jira as source of truth for requirements
5. **Testing Requirements**: All frontend changes require Playwright verification before completion
6. **PRD Reference**: `prd.md` is the complete specification document

## Useful Links

- **Jira Project**: https://piendo.atlassian.net/browse/DDALKAK
- **PRD**: See `prd.md` in repository root
- **Design System**: Colors and typography defined in `prd.md` section 8
