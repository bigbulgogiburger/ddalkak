import { useState } from 'react';
import { RegionSelector } from '../components/RegionSelector';
import { DateTypeSelector } from '../components/DateTypeSelector';
import { BudgetSlider } from '../components/BudgetSlider';
import { LoadingUI } from '../components/LoadingUI';
import { CourseResultsList } from '../components/CourseResultsList';
import { Course } from '../types/course';

type WizardStep = 'region' | 'dateType' | 'budget' | 'loading' | 'results';

export default function CourseWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('region');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDateType, setSelectedDateType] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setCurrentStep('dateType');
  };

  const handleDateTypeSelect = (dateType: string) => {
    setSelectedDateType(dateType);
    setCurrentStep('budget');
  };

  const handleBudgetSelect = (budget: number) => {
    // Start loading
    setCurrentStep('loading');

    // Simulate API call
    setTimeout(() => {
      const mockCourses: Course[] = [
        {
          id: '1',
          name: `${selectedRegion}의 로맨틱한 데이트`,
          region: selectedRegion || '',
          dateType: '로맨틱',
          estimatedBudget: budget,
          rating: 4.8,
          places: [
            {
              id: 'p1',
              name: '카페',
              address: '서울시',
              latitude: 37.5,
              longitude: 127.0,
              category: '카페',
            },
            {
              id: 'p2',
              name: '공원',
              address: '서울시',
              latitude: 37.5,
              longitude: 127.0,
              category: '공원',
            },
            {
              id: 'p3',
              name: '레스토랑',
              address: '서울시',
              latitude: 37.5,
              longitude: 127.0,
              category: '식당',
            },
          ],
          timeline: [
            { time: '14:00', place: '카페', duration: '1시간' },
            { time: '15:00', place: '공원', duration: '1시간' },
            { time: '18:00', place: '레스토랑', duration: '2시간' },
          ],
        },
        {
          id: '2',
          name: `${selectedRegion}의 힙한 데이트`,
          region: selectedRegion || '',
          dateType: '트렌디',
          estimatedBudget: budget + 5000,
          rating: 4.6,
          places: [
            {
              id: 'p4',
              name: '트렌디한 카페',
              address: '서울시',
              latitude: 37.5,
              longitude: 127.0,
              category: '카페',
            },
            {
              id: 'p5',
              name: '갤러리',
              address: '서울시',
              latitude: 37.5,
              longitude: 127.0,
              category: '문화',
            },
            {
              id: 'p6',
              name: '펍',
              address: '서울시',
              latitude: 37.5,
              longitude: 127.0,
              category: '술집',
            },
          ],
          timeline: [
            { time: '15:00', place: '카페', duration: '1시간 30분' },
            { time: '16:30', place: '갤러리', duration: '1시간' },
            { time: '19:30', place: '펍', duration: '2시간' },
          ],
        },
        {
          id: '3',
          name: `${selectedRegion}의 액티브한 데이트`,
          region: selectedRegion || '',
          dateType: '액티브',
          estimatedBudget: budget - 2000,
          rating: 4.7,
          places: [
            {
              id: 'p7',
              name: '스포츠 시설',
              address: '서울시',
              latitude: 37.5,
              longitude: 127.0,
              category: '스포츠',
            },
            {
              id: 'p8',
              name: '공원',
              address: '서울시',
              latitude: 37.5,
              longitude: 127.0,
              category: '공원',
            },
            {
              id: 'p9',
              name: '음식점',
              address: '서울시',
              latitude: 37.5,
              longitude: 127.0,
              category: '식당',
            },
          ],
          timeline: [
            { time: '10:00', place: '스포츠 시설', duration: '2시간' },
            { time: '12:00', place: '공원', duration: '1시간' },
            { time: '13:30', place: '음식점', duration: '1시간 30분' },
          ],
        },
      ];
      setCourses(mockCourses);
      setCurrentStep('results');
    }, 3000);
  };

  const handleViewDetails = (courseId: string) => {
    console.log('View details for course:', courseId);
    // TODO: Navigate to course detail page
  };

  const handleBackStep = () => {
    if (currentStep === 'dateType') {
      setCurrentStep('region');
      setSelectedRegion(null);
    } else if (currentStep === 'budget') {
      setCurrentStep('dateType');
      setSelectedDateType(null);
    } else if (currentStep === 'results') {
      setCurrentStep('region');
      setSelectedRegion(null);
      setSelectedDateType(null);
      setCourses([]);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      {currentStep !== 'loading' && (
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              {currentStep !== 'region' && (
                <button
                  onClick={handleBackStep}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="뒤로 가기"
                >
                  <svg
                    className="w-5 h-5 text-gray-600 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {currentStep === 'region' && '3분 안에 완성하는 데이트 코스'}
                {currentStep === 'dateType' && '데이트 유형 선택'}
                {currentStep === 'budget' && '예산 선택'}
                {currentStep === 'results' && '추천 데이트 코스'}
              </h1>
            </div>
            {/* Progress Bar */}
            <div className="mt-4 w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-pink-500 transition-all duration-300"
                style={{
                  width:
                    currentStep === 'region'
                      ? '25%'
                      : currentStep === 'dateType'
                        ? '50%'
                        : currentStep === 'budget'
                          ? '75%'
                          : currentStep === 'loading'
                            ? '90%'
                            : '100%',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-2xl mx-auto">
        {currentStep === 'region' && <RegionSelector onRegionSelect={handleRegionSelect} />}
        {currentStep === 'dateType' && <DateTypeSelector onDateTypeSelect={handleDateTypeSelect} />}
        {currentStep === 'budget' && (
          <BudgetSlider onBudgetSelect={handleBudgetSelect} matchingPlacesCount={12} />
        )}
        {currentStep === 'loading' && <LoadingUI estimatedTimeSeconds={3} />}
        {currentStep === 'results' && (
          <CourseResultsList courses={courses} onViewDetails={handleViewDetails} />
        )}
      </div>
    </div>
  );
}
