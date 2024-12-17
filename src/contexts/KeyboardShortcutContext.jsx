import React, { createContext, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';

const KeyboardShortcutContext = createContext({});

export const useKeyboardShortcuts = () => {
  const context = useContext(KeyboardShortcutContext);
  if (!context) {
    throw new Error('useKeyboardShortcuts must be used within a KeyboardShortcutProvider');
  }
  return context;
};

export const KeyboardShortcutProvider = ({ children }) => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  // Define shortcuts
  const shortcuts = {
    'g d': { action: () => navigate('/dashboard'), description: 'Go to Dashboard' },
    'g h': { action: () => navigate('/'), description: 'Go to Home' },
    'g m': { action: () => navigate('/math'), description: 'Go to Math' },
    'g s': { action: () => navigate('/science'), description: 'Go to Science' },
    'g e': { action: () => navigate('/english'), description: 'Go to English' },
    '?': { 
      action: () => setShowShortcuts(true), 
      description: 'Show keyboard shortcuts'
    },
    'Escape': {
      action: () => setShowShortcuts(false),
      description: 'Close keyboard shortcuts'
    }
  };

  const [showShortcuts, setShowShortcuts] = React.useState(false);
  const [keys, setKeys] = React.useState([]);
  const [lastKeyTime, setLastKeyTime] = React.useState(0);

  const handleKeyPress = useCallback((event) => {
    const now = Date.now();
    const key = event.key.toLowerCase();
    
    // Don't capture shortcuts when typing in input fields
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return;
    }

    // Reset combination if too much time has passed
    if (now - lastKeyTime > 1000) {
      setKeys([]);
    }

    setLastKeyTime(now);
    setKeys(prev => [...prev, key]);

    // Convert current key combination to string
    const combination = [...keys, key].join(' ');

    // Check if this combination matches any shortcuts
    Object.entries(shortcuts).forEach(([shortcut, { action, description }]) => {
      if (combination === shortcut.toLowerCase()) {
        action();
        addToast({
          type: 'info',
          message: `Executed: ${description}`,
          duration: 2000
        });
        setKeys([]);
      }
    });

  }, [keys, lastKeyTime, shortcuts, addToast]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Shortcut help modal content
  const ShortcutHelp = () => (
    showShortcuts && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-background rounded-lg p-6 max-w-md w-full m-4 space-y-4">
          <h2 className="text-xl font-bold">Keyboard Shortcuts</h2>
          <div className="space-y-2">
            {Object.entries(shortcuts).map(([key, { description }]) => (
              <div key={key} className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded text-sm">{key}</kbd>
                <span>{description}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowShortcuts(false)}
            className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    )
  );

  return (
    <KeyboardShortcutContext.Provider value={{ shortcuts }}>
      {children}
      <ShortcutHelp />
    </KeyboardShortcutContext.Provider>
  );
};
