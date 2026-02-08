import { useState } from 'react';

interface BudgetSliderProps {
  onBudgetSelect?: (budget: number) => void;
  matchingPlacesCount?: number;
}

const MIN_BUDGET = 50000;
const MAX_BUDGET = 300000;
const STEP = 10000;

export const BudgetSlider = ({ onBudgetSelect, matchingPlacesCount = 0 }: BudgetSliderProps) => {
  const [selectedBudget, setSelectedBudget] = useState<number | null>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setSelectedBudget(value);
    onBudgetSelect?.(value);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const percentage =
    selectedBudget !== null ? ((selectedBudget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100 : 0;

  return (
    <div className="w-full px-6 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          예산은 어떻게 되나요?
        </h2>
        <p className="text-gray-600 dark:text-gray-400">선호하는 예산을 선택해주세요</p>
      </div>

      <div className="mb-8">
        {/* Budget Display */}
        <div className="mb-6 p-4 rounded-lg bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">선택된 예산</span>
            {selectedBudget !== null && (
              <span className="text-xs text-pink-600 dark:text-pink-400">
                매칭 장소 {matchingPlacesCount}곳
              </span>
            )}
          </div>
          <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
            {selectedBudget !== null ? formatCurrency(selectedBudget) : '선택 필요'}
          </div>
        </div>

        {/* Slider */}
        <div className="mb-6">
          <input
            type="range"
            min={MIN_BUDGET}
            max={MAX_BUDGET}
            step={STEP}
            value={selectedBudget ?? MIN_BUDGET}
            onChange={handleSliderChange}
            className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            aria-label="예산 선택 슬라이더"
            style={{
              background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
            }}
          />
          <style jsx>{`
            input[type='range']::-webkit-slider-thumb {
              appearance: none;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: #ec4899;
              cursor: pointer;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              border: 2px solid white;
            }

            input[type='range']::-moz-range-thumb {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: #ec4899;
              cursor: pointer;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              border: 2px solid white;
            }

            input[type='range']::-moz-range-track {
              background: transparent;
              border: none;
            }

            input[type='range']::-webkit-slider-runnable-track {
              background: transparent;
            }
          `}</style>
        </div>

        {/* Budget Range Labels */}
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-6">
          <span>{formatCurrency(MIN_BUDGET)}</span>
          <span>{formatCurrency(MAX_BUDGET)}</span>
        </div>

        {/* Budget Presets (Optional Quick Select) */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">자주 선택하는 예산</p>
          <div className="grid grid-cols-3 gap-2">
            {[100000, 150000, 200000].map((budget) => (
              <button
                key={budget}
                onClick={() => {
                  setSelectedBudget(budget);
                  onBudgetSelect?.(budget);
                }}
                className={`
                  py-2 px-3 rounded-lg text-sm font-medium transition-all
                  ${
                    selectedBudget === budget
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }
                `}
              >
                {(budget / 10000).toFixed(0)}만원
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex gap-3">
        <button
          className="flex-1 py-3 px-4 rounded-lg font-medium transition-colors
            bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          aria-label="이전 단계로 돌아가기"
        >
          Back
        </button>
        <button
          disabled={selectedBudget === null}
          className={`
            flex-1 py-3 px-4 rounded-lg font-medium transition-colors
            ${
              selectedBudget !== null
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
