import { useState } from 'react';

interface DateTypeSelectorProps {
  onDateTypeSelect?: (dateType: string) => void;
}

interface DateTypeOption {
  id: string;
  name: string;
  description: string;
  emoji: string;
}

const DATE_TYPES: DateTypeOption[] = [
  {
    id: 'activity',
    name: '액티비티형',
    description: '스포츠, 아웃도어',
    emoji: '⚽',
  },
  {
    id: 'romantic',
    name: '감성형',
    description: '낭만적인 분위기',
    emoji: '🌹',
  },
  {
    id: 'foodie',
    name: '식도락형',
    description: '맛있는 음식 탐방',
    emoji: '🍽️',
  },
  {
    id: 'healing',
    name: '힐링형',
    description: '편안한 휴식',
    emoji: '🧘',
  },
  {
    id: 'special',
    name: '특별한 날',
    description: '기념일, 축제',
    emoji: '🎉',
  },
];

export const DateTypeSelector = ({ onDateTypeSelect }: DateTypeSelectorProps) => {
  const [selectedDateType, setSelectedDateType] = useState<string | null>(null);

  const handleDateTypeClick = (dateTypeId: string) => {
    setSelectedDateType(dateTypeId);
    onDateTypeSelect?.(dateTypeId);
  };

  return (
    <div className="w-full px-6 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          어떤 데이트를 원하시나요?
        </h2>
        <p className="text-gray-600 dark:text-gray-400">데이트 유형을 선택해주세요</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {DATE_TYPES.map((dateType) => (
          <button
            key={dateType.id}
            onClick={() => handleDateTypeClick(dateType.id)}
            className={`
              relative h-32 rounded-lg border-2 transition-all duration-300 ease-out
              flex flex-col items-center justify-center gap-3
              ${
                selectedDateType === dateType.id
                  ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 shadow-lg scale-105'
                  : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 hover:border-pink-300 hover:bg-pink-50/50 dark:hover:bg-gray-700'
              }
            `}
            aria-pressed={selectedDateType === dateType.id}
            aria-label={`${dateType.name} 선택`}
          >
            <span className="text-4xl">{dateType.emoji}</span>
            <div className="text-center">
              <p
                className={`
                  font-bold text-sm
                  ${
                    selectedDateType === dateType.id
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }
                `}
              >
                {dateType.name}
              </p>
              <p
                className={`
                  text-xs
                  ${
                    selectedDateType === dateType.id
                      ? 'text-gray-700 dark:text-gray-200'
                      : 'text-gray-500 dark:text-gray-400'
                  }
                `}
              >
                {dateType.description}
              </p>
            </div>
            {selectedDateType === dateType.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <button
          disabled={!selectedDateType}
          className={`
            flex-1 py-3 px-4 rounded-lg font-medium transition-colors
            ${
              selectedDateType
                ? 'bg-pink-500 text-white hover:bg-pink-600 cursor-pointer'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
            }
          `}
          aria-label="다음 단계로 진행"
        >
          Next
        </button>
      </div>
    </div>
  );
};
