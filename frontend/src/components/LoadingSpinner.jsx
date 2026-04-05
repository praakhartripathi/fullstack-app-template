/**
 * Animated loading spinner with pulse effect.
 */
export default function LoadingSpinner({ size = 'md', message = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 border-t-primary-600 animate-spin`}
        />
        <div
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-4 border-transparent border-t-purple-400 animate-spin`}
          style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
        />
      </div>
      {message && (
        <p className="text-sm text-gray-500 animate-pulse">{message}</p>
      )}
    </div>
  );
}
