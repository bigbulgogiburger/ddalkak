import { useEffect, useRef, useState } from 'react';
import { Course } from '../types/course';
import { CourseResultCard } from './CourseResultCard';

interface CourseResultsListProps {
  courses: Course[];
  isLoading?: boolean;
  onViewDetails: (courseId: string) => void;
}

const CourseResultsListContent = ({
  courses,
  onViewDetails,
}: Omit<CourseResultsListProps, 'isLoading'>) => {
  const [displayCount, setDisplayCount] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const maxCoursesToDisplay = 3;

  const displayedCourses = courses.slice(0, displayCount);

  // Infinite scroll - load more courses
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          displayCount < courses.length &&
          displayCount < maxCoursesToDisplay &&
          !isLoadingMore
        ) {
          setIsLoadingMore(true);
          // Simulate loading delay for smooth transition
          setTimeout(() => {
            if (displayCount < courses.length && displayCount < maxCoursesToDisplay) {
              setDisplayCount((prev) => prev + 1);
            }
            setIsLoadingMore(false);
          }, 500);
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [displayCount, courses.length, isLoadingMore, maxCoursesToDisplay]);

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-8">
      {/* Results Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">추천 코스</h2>
        <p className="text-gray-600 dark:text-gray-400">
          {displayedCourses.length}개의 코스를 찾았어요
          {courses.length > maxCoursesToDisplay && (
            <span> (상위 {maxCoursesToDisplay}개 표시)</span>
          )}
        </p>
      </div>

      {/* Courses Grid */}
      <div className="space-y-4 mb-8">
        {displayedCourses.map((course, index) => (
          <div
            key={course.id}
            className="animate-fadeIn"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <CourseResultCard course={course} onViewDetails={onViewDetails} />
          </div>
        ))}
      </div>

      {/* Infinite Scroll Target */}
      {displayedCourses.length < courses.length &&
        displayedCourses.length < maxCoursesToDisplay && (
          <>
            <div ref={observerTarget} className="flex justify-center py-8">
              {isLoadingMore && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <div
                    className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
              )}
            </div>
          </>
        )}

      {/* All Courses Loaded Message */}
      {displayedCourses.length >= courses.length && courses.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">모든 추천 코스를 확인했어요 ✨</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium"
          >
            위로 스크롤
          </button>
        </div>
      )}

      {/* Empty State */}
      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">추천 코스가 없어요. 다시 시도해주세요.</p>
        </div>
      )}

      {/* Add CSS animation for fadeIn */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export const CourseResultsList = ({
  courses,
  onViewDetails,
}: Omit<CourseResultsListProps, 'isLoading'>) => {
  // Use key to reset component state when courses change
  return (
    <CourseResultsListContent
      key={courses.length > 0 ? courses[0]?.id : 'empty'}
      courses={courses}
      onViewDetails={onViewDetails}
    />
  );
};
