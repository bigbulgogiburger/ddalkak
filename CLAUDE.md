# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

### Testing Before Marking Issues Complete ⚠️

**IMPORTANT**: Before marking a Jira ticket as complete, ALWAYS:

1. **Frontend Changes**: Use Playwright MCP to verify UI works correctly
   - Test component rendering
   - Test user interactions
   - Take screenshots of the implementation
   - Verify responsive design if applicable

2. **Backend Changes**: Test actual API calls
   - Make real API requests to verify integration
   - Test error handling and edge cases
   - Validate response format matches spec

3. **Full-Stack Features**: End-to-end testing
   - Test complete user flow from frontend to backend
   - Verify data persistence
   - Check error handling

### Jira Integration

- **Tool**: Use `mcp__claude_ai_Atlassian__*` functions
- **Status Workflow**: 해야 할 일 → 진행 중 → 완료
- **Comments**: Always add detailed completion notes with:
  - What was implemented
  - How to run/test it
  - Any dependencies or next steps

Example:
```markdown
## ✅ Feature Complete

### What was built:
- Component X with features Y, Z
- Integration with API endpoint

### Testing:
- Playwright E2E tests pass
- API returns expected format

### How to test:
npm run dev && visit /feature-page
```

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
