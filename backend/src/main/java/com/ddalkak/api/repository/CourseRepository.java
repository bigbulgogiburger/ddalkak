package com.ddalkak.api.repository;

import com.ddalkak.api.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByRegion(String region);

    List<Course> findByDateType(String dateType);

    List<Course> findByRegionAndDateType(String region, String dateType);

    List<Course> findByBudgetBetween(Integer minBudget, Integer maxBudget);

}
