-- Create database if not exists
CREATE DATABASE IF NOT EXISTS ddalkak;
USE ddalkak;

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  region VARCHAR(100) NOT NULL,
  date_type VARCHAR(50) NOT NULL,
  budget INT NOT NULL,
  description TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_region (region),
  INDEX idx_date_type (date_type),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create sample data (optional, for testing)
INSERT INTO courses (title, region, date_type, budget, description) VALUES
('강남 로맨틱 데이트', '서울', '로맨틱', 100000, '강남의 분위기 있는 식당과 카페를 순회하는 코스'),
('경주 역사 여행', '경주', '문화', 80000, '불국사, 석굴암을 방문하는 문화 여행 코스'),
('제주도 자연 휴식', '제주', '휴식', 150000, '협재 해수욕장과 한라산 트래킹 코스');
