import { Course } from '../types/course';

interface CourseResultCardProps {
  course: Course;
  onViewDetails: (courseId: string) => void;
}

export const CourseResultCard = ({ course, onViewDetails }: CourseResultCardProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const fillPercentage = Math.min(Math.max(rating - i, 0), 1);
      stars.push(
        <div
          key={i}
          className="relative w-5 h-5"
          style={{
            background: `linear-gradient(90deg, #fbbf24 0%, #fbbf24 ${fillPercentage * 100}%, #e5e7eb ${fillPercentage * 100}%, #e5e7eb 100%)`,
            clipPath:
              'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          }}
        />
      );
    }
    return stars;
  };

  return (
    <button
      onClick={() => onViewDetails(course.id)}
      className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-500 group"
    >
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-pink-50 to-orange-50 dark:from-gray-700 dark:to-gray-800 px-6 py-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
          {course.name}
        </h3>
      </div>

      {/* Content */}
      <div className="px-6 py-4 space-y-4">
        {/* Region & Date Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-1">지역</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">{course.region}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-1">데이트 타입</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {course.dateType}
            </p>
          </div>
        </div>

        {/* Budget */}
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-1">예상 비용</p>
          <p className="text-lg font-bold text-pink-500">
            {course.estimatedBudget.toLocaleString()} 원
          </p>
        </div>

        {/* Rating */}
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-2">평점</p>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">{renderStars(course.rating)}</div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {course.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Places Preview */}
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-2">포함된 장소</p>
          <div className="flex flex-wrap gap-2">
            {course.places.slice(0, 3).map((place) => (
              <span
                key={place.id}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
              >
                {place.category}
              </span>
            ))}
            {course.places.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                +{course.places.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer with CTA */}
      <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-3 border-t border-gray-100 dark:border-gray-700">
        <p className="text-sm font-semibold text-pink-500 group-hover:text-pink-600">
          자세히 보기 →
        </p>
      </div>
    </button>
  );
};
