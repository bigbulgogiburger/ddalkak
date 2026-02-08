# 데이트 딸깍 (Date Ddalkak) - MVP

> "3분 만에 완성하는 검증된 데이트 코스"

Z세대 커플들을 위한 AI 기반 데이트 코스 추천 서비스입니다.

## 프로젝트 구조

```
ddalkak-date/
├── frontend/              # Next.js 프론트엔드 애플리케이션
│   ├── src/
│   │   ├── components/   # React 컴포넌트
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Next.js Pages Router
│   │   ├── utils/        # 유틸리티 함수
│   │   ├── types/        # TypeScript 타입 정의
│   │   ├── services/     # API 서비스 레이어
│   │   ├── lib/          # 라이브러리 설정 (날짜, 포맷 등)
│   │   ├── constants/    # 상수 정의
│   │   └── styles/       # CSS/스타일
│   ├── public/           # 정적 에셋 (이미지, 폰트 등)
│   ├── .eslintrc.mjs     # ESLint 설정
│   ├── .prettierrc.json  # Prettier 설정
│   ├── Dockerfile        # Docker 이미지
│   ├── next.config.ts    # Next.js 설정
│   ├── tsconfig.json     # TypeScript 설정
│   └── package.json
├── backend/              # Spring Boot 백엔드 (추후 구현)
├── infra/                # Terraform 인프라 코드 (추후 구현)
└── prd.md               # 제품 요구사항 문서
```

## 기술 스택

### Frontend
- **Framework**: Next.js 16+ (TypeScript)
- **Styling**: Tailwind CSS
- **Linting**: ESLint + ESLint Config (Next.js)
- **Formatting**: Prettier
- **Package Manager**: npm

### Development
- **Node.js**: 22 (LTS)
- **Container**: Docker

## 시작하기

### Prerequisites
- Node.js 22+
- npm

### 설치

```bash
cd frontend
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 으로 접속하세요.

### 코드 품질 명령어

```bash
# ESLint로 코드 검사
npm run lint

# ESLint 자동 수정
npm run lint:fix

# Prettier로 포맷 확인
npm run format:check

# Prettier로 포맷 적용
npm run format
```

### 빌드

```bash
npm run build
npm start
```

## Docker로 실행

```bash
# 이미지 빌드
docker build -t ddalkak-frontend .

# 컨테이너 실행
docker run -p 3000:3000 ddalkak-frontend
```

## 개발 가이드

### 코딩 스타일
- **언어**: TypeScript (타입 안정성)
- **코드 포맷**: Prettier (자동 포맷)
- **린팅**: ESLint (코드 품질)
- **괄호 스타일**: 항상 추가 (if, for 등)

### 컴포넌트 구조

```typescript
// src/components/YourComponent.tsx
import { ReactNode } from 'react';

interface YourComponentProps {
  title: string;
  children?: ReactNode;
}

export const YourComponent = ({
  title,
  children,
}: YourComponentProps) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};
```

### API 호출

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
    body: JSON.stringify({ region, date_type: dateType, budget }),
  });
  return response.json();
};
```

## 프로젝트 로드맵

- **Week 1-2**: 설계 & 아키텍처 (현재)
- **Week 3-5**: 백엔드 코어 (추후)
- **Week 6-8**: 프론트엔드 코어 (진행 중)
- **Week 9-10**: 통합 & 테스팅
- **Week 11-12**: 런칭

자세한 내용은 [PRD](./prd.md)를 참조하세요.

## 라이센스

MIT

## 문의

프로젝트 관련 문의는 [Jira](https://piendo.atlassian.net/browse/DDALKAK) 를 참조하세요.
