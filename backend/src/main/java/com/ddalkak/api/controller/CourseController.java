package com.ddalkak.api.controller;

import com.ddalkak.api.dto.CourseRequest;
import com.ddalkak.api.dto.CourseResponse;
import com.ddalkak.api.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
@Slf4j
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<List<CourseResponse>> getAllCourses() {
        log.info("Fetching all courses");
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @PostMapping("/recommend")
    public ResponseEntity<CourseResponse> recommendCourse(@Valid @RequestBody CourseRequest request) {
        log.info("Course recommendation requested: region={}, dateType={}, budget={}",
                request.getRegion(), request.getDateType(), request.getBudget());

        CourseResponse response = courseService.createCourse(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponse> getCourse(@PathVariable Long id) {
        log.info("Fetching course with id: {}", id);
        return ResponseEntity.ok(courseService.getCourse(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<CourseResponse>> searchCourses(
            @RequestParam String region,
            @RequestParam String dateType) {
        log.info("Searching courses: region={}, dateType={}", region, dateType);
        return ResponseEntity.ok(courseService.searchCourses(region, dateType));
    }

    @GetMapping("/region/{region}")
    public ResponseEntity<List<CourseResponse>> getCoursesByRegion(@PathVariable String region) {
        log.info("Fetching courses for region: {}", region);
        return ResponseEntity.ok(courseService.getCoursesByRegion(region));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseResponse> updateCourse(
            @PathVariable Long id,
            @Valid @RequestBody CourseRequest request) {
        log.info("Updating course with id: {}", id);
        return ResponseEntity.ok(courseService.updateCourse(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        log.info("Deleting course with id: {}", id);
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

}
