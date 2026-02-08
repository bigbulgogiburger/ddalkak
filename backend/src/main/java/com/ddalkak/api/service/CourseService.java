package com.ddalkak.api.service;

import com.ddalkak.api.dto.CourseRequest;
import com.ddalkak.api.dto.CourseResponse;
import com.ddalkak.api.entity.Course;
import com.ddalkak.api.exception.ResourceNotFoundException;
import com.ddalkak.api.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CourseService {

    private final CourseRepository courseRepository;

    @Transactional
    public CourseResponse createCourse(CourseRequest request) {
        Course course = Course.builder()
                .title(generateTitle(request.getRegion(), request.getDateType()))
                .region(request.getRegion())
                .dateType(request.getDateType())
                .budget(request.getBudget())
                .description(generateDescription(request))
                .build();

        Course savedCourse = courseRepository.save(course);
        return CourseResponse.from(savedCourse);
    }

    public CourseResponse getCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        return CourseResponse.from(course);
    }

    public List<CourseResponse> searchCourses(String region, String dateType) {
        List<Course> courses = courseRepository.findByRegionAndDateType(region, dateType);
        return courses.stream()
                .map(CourseResponse::from)
                .toList();
    }

    public List<CourseResponse> getCoursesByRegion(String region) {
        List<Course> courses = courseRepository.findByRegion(region);
        return courses.stream()
                .map(CourseResponse::from)
                .toList();
    }

    @Transactional
    public CourseResponse updateCourse(Long id, CourseRequest request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        course = Course.builder()
                .id(course.getId())
                .title(generateTitle(request.getRegion(), request.getDateType()))
                .region(request.getRegion())
                .dateType(request.getDateType())
                .budget(request.getBudget())
                .description(generateDescription(request))
                .createdAt(course.getCreatedAt())
                .build();

        Course updatedCourse = courseRepository.save(course);
        return CourseResponse.from(updatedCourse);
    }

    @Transactional
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        courseRepository.delete(course);
    }

    private String generateTitle(String region, String dateType) {
        return String.format("[%s] %s 데이트 코스", region, dateType);
    }

    private String generateDescription(CourseRequest request) {
        return String.format("지역: %s, 유형: %s, 예산: %,d원",
                request.getRegion(), request.getDateType(), request.getBudget());
    }

}
