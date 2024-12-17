import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const KeyboardShortcutHelper = () => {
  return (
    <div className="fixed bottom-4 right-4">
      <button
        className="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors"
        onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: '?' }))}
        aria-label="Show keyboard shortcuts"
      >
        <QuestionMarkCircleIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default KeyboardShortcutHelper;
