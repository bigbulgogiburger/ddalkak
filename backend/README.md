# Ddalkak API Backend

Spring Boot 기반의 데이트 코스 추천 API 백엔드입니다.

## 📋 기술 스택

- **Java 21**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **Gradle 8.5**
- **MySQL 8.0**
- **Lombok**

## 🚀 시작하기

### 필수 요구사항

- Java 21 이상
- Gradle 8.5 이상 (또는 Docker)
- MySQL 8.0 이상

### 로컬 개발 환경 설정

1. **데이터베이스 설정**

```bash
# MySQL 실행 (Docker)
docker run -d \
  --name ddalkak-mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=ddalkak \
  -p 3306:3306 \
  mysql:8.0
```

2. **환경 변수 설정**

```bash
export DB_HOST=localhost
export DB_PORT=3306
export DB_NAME=ddalkak
export DB_USER=root
export DB_PASSWORD=password
export SERVER_PORT=8080
```

3. **프로젝트 빌드**

```bash
cd backend
gradle clean build
```

4. **애플리케이션 실행**

```bash
gradle bootRun
```

API는 `http://localhost:8080/api/v1`에서 사용 가능합니다.

## 📝 API 엔드포인트

### 코스 추천
```http
POST /api/v1/courses/recommend

{
  "region": "서울",
  "dateType": "로맨틱",
  "budget": 100000
}
```

### 코스 조회
```http
GET /api/v1/courses/{id}
```

### 코스 검색
```http
GET /api/v1/courses/search?region=서울&dateType=로맨틱
```

### 지역별 코스 조회
```http
GET /api/v1/courses/region/{region}
```

### 코스 수정
```http
PUT /api/v1/courses/{id}
```

### 코스 삭제
```http
DELETE /api/v1/courses/{id}
```

## 🏗️ 프로젝트 구조

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/ddalkak/api/
│   │   │   ├── controller/       # REST 컨트롤러
│   │   │   ├── service/          # 비즈니스 로직
│   │   │   ├── repository/       # 데이터 접근
│   │   │   ├── entity/           # JPA 엔티티
│   │   │   ├── dto/              # 요청/응답 DTO
│   │   │   ├── config/           # 스프링 설정
│   │   │   └── exception/        # 예외 처리
│   │   └── resources/
│   │       └── application.yml   # 애플리케이션 설정
│   └── test/                     # 테스트
├── Dockerfile
├── build.gradle
├── settings.gradle
└── .gitignore
```

## 🐳 Docker 빌드 및 실행

### 빌드
```bash
cd backend
docker build -t ddalkak-api:latest .
```

### 실행
```bash
docker run -d \
  --name ddalkak-api \
  -p 8080:8080 \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=3306 \
  -e DB_NAME=ddalkak \
  -e DB_USER=root \
  -e DB_PASSWORD=password \
  ddalkak-api:latest
```

## 🧪 테스트

```bash
# 전체 테스트 실행
gradle test

# 테스트 커버리지 확인
gradle test --info | grep -i coverage
```

## 📊 데이터베이스 스키마

### courses 테이블
| Column | Type | Constraint |
|--------|------|-----------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| title | VARCHAR(255) | NOT NULL |
| region | VARCHAR(100) | NOT NULL |
| date_type | VARCHAR(50) | NOT NULL |
| budget | INT | NOT NULL |
| description | TEXT | |
| created_at | DATETIME | NOT NULL |
| updated_at | DATETIME | |

## 🔧 설정

### application.yml

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/ddalkak
    username: root
    password: password
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
```

환경 변수로 오버라이드 가능:
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `SERVER_PORT`

## 📚 관련 문서

- [PRD](../prd.md) - 제품 요구사항 문서
- [CLAUDE.md](../CLAUDE.md) - 개발 가이드

## 📄 라이선스

MIT License
