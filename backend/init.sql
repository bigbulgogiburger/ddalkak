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

-- Create regions table
CREATE TABLE IF NOT EXISTS regions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  categories JSON,
  place_count INT NOT NULL,
  INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert 8 regions with metadata
INSERT INTO regions (name, latitude, longitude, categories, place_count) VALUES
('홍대', 37.5502, 126.9242, '["카페", "술집", "음식점", "공방"]', 45),
('강남', 37.4979, 127.0276, '["명품점", "식당", "스파", "바"]', 78),
('성수', 37.5449, 127.0568, '["카페", "플리마켓", "갤러리", "창고"]', 52),
('여의도', 37.5211, 126.9255, '["식당", "바", "공원", "영화관"]', 38),
('건대', 37.5393, 127.0730, '["카페", "술집", "노래방", "음식점"]', 61),
('신촌', 37.5560, 126.9356, '["카페", "술집", "영화관", "쇼핑"]', 49),
('이태원', 37.5326, 126.9947, '["이국음식", "바", "클럽", "숍"]', 55),
('잠실', 37.5113, 127.0995, '["롯데월드", "식당", "영화관", "스포츠"]', 42);

-- Create sample data (optional, for testing)
INSERT INTO courses (title, region, date_type, budget, description) VALUES
('강남 로맨틱 데이트', '서울', '로맨틱', 100000, '강남의 분위기 있는 식당과 카페를 순회하는 코스'),
('경주 역사 여행', '경주', '문화', 80000, '불국사, 석굴암을 방문하는 문화 여행 코스'),
('제주도 자연 휴식', '제주', '휴식', 150000, '협재 해수욕장과 한라산 트래킹 코스');
