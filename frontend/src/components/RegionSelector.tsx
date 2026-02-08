import { useState } from 'react';

interface RegionSelectorProps {
  onRegionSelect?: (region: string) => void;
}

interface RegionOption {
  id: string;
  name: string;
  emoji: string;
}

const REGIONS: RegionOption[] = [
  { id: 'hongdae', name: '홍대', emoji: '🎨' },
  { id: 'gangnam', name: '강남', emoji: '💎' },
  { id: 'seongsu', name: '성수', emoji: '🏭' },
  { id: 'yeouido', name: '여의도', emoji: '🌳' },
  { id: 'geondae', name: '건대', emoji: '📚' },
  { id: 'sinchon', name: '신촌', emoji: '🎓' },
  { id: 'itaewon', name: '이태원', emoji: '🌍' },
  { id: 'jamsil', name: '잠실', emoji: '🏟️' },
];

export const RegionSelector = ({ onRegionSelect }: RegionSelectorProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId);
    onRegionSelect?.(regionId);
  };

  return (
    <div className="w-full px-6 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          어디서 데이트할까요?
        </h2>
        <p className="text-gray-600 dark:text-gray-400">지역을 선택해주세요</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {REGIONS.map((region) => (
          <button
            key={region.id}
            onClick={() => handleRegionClick(region.id)}
            className={`
              relative h-24 rounded-lg border-2 transition-all duration-300 ease-out
              flex flex-col items-center justify-center gap-2
              ${
                selectedRegion === region.id
                  ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 shadow-lg scale-105'
                  : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 hover:border-pink-300 hover:bg-pink-50/50 dark:hover:bg-gray-700'
              }
            `}
            aria-pressed={selectedRegion === region.id}
            aria-label={`${region.name} 선택`}
          >
            <span className="text-3xl">{region.emoji}</span>
            <span
              className={`
                font-medium text-sm
                ${
                  selectedRegion === region.id
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-700 dark:text-gray-300'
                }
              `}
            >
              {region.name}
            </span>
            {selectedRegion === region.id && (
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
          disabled={!selectedRegion}
          className={`
            flex-1 py-3 px-4 rounded-lg font-medium transition-colors
            ${
              selectedRegion
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
