import { useEffect, useMemo, useState } from 'react';

interface LoadingUIProps {
  estimatedTimeSeconds?: number;
}

export const LoadingUI = ({ estimatedTimeSeconds = 3 }: LoadingUIProps) => {
  const [secondsRemaining, setSecondsRemaining] = useState(estimatedTimeSeconds);

  useEffect(() => {
    if (secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        const next = prev - 1;
        return next <= 0 ? 0 : next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining]);

  const progress = useMemo(() => {
    const newProgress = ((estimatedTimeSeconds - secondsRemaining) / estimatedTimeSeconds) * 100;
    return Math.min(newProgress, 100);
  }, [secondsRemaining, estimatedTimeSeconds]);

  const messages = [
    '최고의 데이트 코스를 찾고 있어요...',
    '인기 장소들을 분석 중...',
    '완벽한 일정을 구성 중...',
  ];

  const currentMessageIndex = Math.floor(progress / 33);
  const displayMessage = messages[Math.min(currentMessageIndex, messages.length - 1)];

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Spinner Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-200 dark:text-gray-700"
              />
              {/* Animated spinner */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="282.7"
                strokeDashoffset={`${282.7 * (1 - progress / 100)}`}
                className="transition-all duration-300"
                style={{
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%',
                }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b6b" />
                  <stop offset="100%" stopColor="#ff8e8e" />
                </linearGradient>
              </defs>
            </svg>
            {/* Progress percentage in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="text-center mb-8">
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4 h-6">
            {displayMessage}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {secondsRemaining > 0 ? (
              <>
                약 <span className="font-semibold text-pink-500">{secondsRemaining}</span>초
                남았어요
              </>
            ) : (
              '거의 다 됐어요...'
            )}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-pink-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Dots Animation */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
