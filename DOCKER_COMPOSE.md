# Docker Compose - 로컬 개발 환경 설정

Docker Compose를 사용하여 프론트엔드, 백엔드, 데이터베이스를 한 번에 실행합니다.

## 📋 구성 요소

| 서비스 | 이미지 | 포트 | 역할 |
|--------|-------|------|------|
| **mysql** | mysql:8.0 | 3306 | 데이터베이스 |
| **backend** | 로컬 빌드 | 8080 | Spring Boot API |
| **frontend** | 로컬 빌드 | 3000 | Next.js 웹앱 |
| **redis** | redis:7-alpine | 6379 | 캐싱 (선택사항) |

## 🚀 빠른 시작

### 1. 환경 변수 설정

```bash
# .env 파일 생성 (.env.example 기반)
cp .env.example .env
```

### 2. 모든 서비스 실행

```bash
# 프로덕션 환경
docker-compose up -d

# 개발 환경 (hot reload 포함)
docker-compose -f docker-compose.yml -f docker-compose.development.yml up
```

### 3. 서비스 상태 확인

```bash
docker-compose ps
```

### 4. 로그 확인

```bash
# 모든 서비스 로그
docker-compose logs -f

# 특정 서비스 로그
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

## 🛑 서비스 중지

```bash
# 모든 서비스 중지
docker-compose down

# 데이터도 함께 삭제
docker-compose down -v
```

## 🔧 개발 환경 사용

### 개발 전용 구성

```bash
# Hot reload가 활성화된 개발 환경
docker-compose -f docker-compose.yml -f docker-compose.development.yml up
```

**특징:**
- 백엔드: `gradle bootRun` (소스 변경 시 자동 재로드)
- 프론트엔드: `npm run dev` (Hot Module Replacement)
- MySQL: 별도 포트(3307)에서 IDE와 직접 연결 가능
- 디버그 포트: 9010

### IDE에서 원격 디버깅

#### IntelliJ IDEA / WebStorm

1. **Run → Edit Configurations**
2. **Remote JVM Debug** 추가
3. **Host**: localhost
4. **Port**: 9010
5. **Run → Debug** 클릭

#### VS Code

`.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "Debug Backend",
      "request": "attach",
      "hostName": "localhost",
      "port": 9010,
      "preLaunchTask": "build"
    }
  ]
}
```

## 📦 데이터베이스 초기화

MySQL은 `backend/init.sql`을 자동으로 실행합니다.

### 수동으로 SQL 실행

```bash
# 컨테이너 내 MySQL에 접속
docker-compose exec mysql mysql -u root -p ddalkak

# SQL 파일 실행
docker-compose exec mysql mysql -u root -p ddalkak < backend/init.sql
```

### 데이터베이스 초기화

```bash
# 데이터베이스와 볼륨 삭제
docker-compose down -v

# 새로 시작하면 init.sql이 자동 실행됨
docker-compose up -d
```

## 🔐 환경 변수 설정

`.env` 파일을 통해 설정할 수 있습니다:

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `DB_HOST` | mysql | 데이터베이스 호스트 |
| `DB_PORT` | 3306 | 데이터베이스 포트 |
| `DB_NAME` | ddalkak | 데이터베이스 이름 |
| `DB_USER` | ddalkak | 데이터베이스 사용자 |
| `DB_PASSWORD` | password | 데이터베이스 비밀번호 |
| `BACKEND_PORT` | 8080 | 백엔드 포트 |
| `FRONTEND_PORT` | 3000 | 프론트엔드 포트 |
| `NODE_ENV` | development | Node.js 환경 |
| `REDIS_PORT` | 6379 | Redis 포트 |

## 🧪 API 테스트

### 코스 추천 API

```bash
curl -X POST http://localhost:8080/api/v1/courses/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "region": "서울",
    "dateType": "로맨틱",
    "budget": 100000
  }'
```

### 코스 조회

```bash
# 모든 코스 조회
curl http://localhost:8080/api/v1/courses/region/서울

# 특정 코스 조회
curl http://localhost:8080/api/v1/courses/1
```

## 📱 프론트엔드 접속

http://localhost:3000

## 🗄️ MySQL 직접 접속

```bash
# 컨테이너 내에서 직접 MySQL 접속
docker-compose exec mysql mysql -u root -p

# 외부 MySQL 클라이언트 사용
# Host: localhost
# Port: 3306 (또는 3307 개발 환경)
# User: ddalkak
# Password: password
```

## 🐛 트러블슈팅

### 포트 충돌

만약 포트가 이미 사용 중이면:

```bash
# 사용 중인 포트 확인
lsof -i :8080  # 백엔드
lsof -i :3000  # 프론트엔드
lsof -i :3306  # MySQL

# .env에서 포트 변경
BACKEND_PORT=8081
FRONTEND_PORT=3001
DB_PORT=3307
```

### 데이터베이스 연결 오류

```bash
# MySQL 상태 확인
docker-compose ps mysql

# MySQL 로그 확인
docker-compose logs mysql

# MySQL 재시작
docker-compose restart mysql
```

### 컨테이너 이미지 재빌드

```bash
# 프론트엔드 재빌드
docker-compose build --no-cache frontend

# 백엔드 재빌드
docker-compose build --no-cache backend

# 모든 서비스 재빌드
docker-compose build --no-cache
```

### 메모리 부족

Docker Desktop에 할당된 메모리를 증가시키세요:
- **Preferences → Resources → Memory**: 4GB 이상 권장

## 📚 참고

- [Docker Compose 공식 문서](https://docs.docker.com/compose/)
- [MySQL Docker 이미지](https://hub.docker.com/_/mysql)
- [Next.js Docker](https://nextjs.org/docs/deployment/docker)
- [Spring Boot Docker](https://spring.io/guides/gs/spring-boot-docker/)
