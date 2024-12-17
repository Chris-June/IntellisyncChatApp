import React, { useEffect, useState } from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const toastTypes = {
  success: {
    icon: CheckCircleIcon,
    className: 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    iconClassName: 'text-green-400 dark:text-green-300'
  },
  error: {
    icon: XCircleIcon,
    className: 'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    iconClassName: 'text-red-400 dark:text-red-300'
  },
  warning: {
    icon: ExclamationCircleIcon,
    className: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    iconClassName: 'text-yellow-400 dark:text-yellow-300'
  },
  info: {
    icon: InformationCircleIcon,
    className: 'bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    iconClassName: 'text-blue-400 dark:text-blue-300'
  }
};

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  const { icon: Icon, className, iconClassName } = toastTypes[type];

  useEffect(() => {
    if (duration === Infinity) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateProgress = () => {
      const now = Date.now();
      const remaining = endTime - now;
      const newProgress = (remaining / duration) * 100;

      if (newProgress <= 0) {
        setIsVisible(false);
        setTimeout(onClose, 300); // Allow time for exit animation
        return;
      }

      setProgress(newProgress);
      requestAnimationFrame(updateProgress);
    };

    const animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [duration, onClose]);

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
      `}
    >
      <div
        className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto
          ring-1 ring-black ring-opacity-5 overflow-hidden ${className}`}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon className={`h-6 w-6 ${iconClassName}`} />
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium">
                {message}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                }}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        {duration !== Infinity && (
          <div className="h-1 w-full bg-gray-200 dark:bg-gray-700">
            <div
              className={`h-full transition-all duration-100 ease-linear ${
                type === 'success' ? 'bg-green-500' :
                type === 'error' ? 'bg-red-500' :
                type === 'warning' ? 'bg-yellow-500' :
                'bg-blue-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Toast;
