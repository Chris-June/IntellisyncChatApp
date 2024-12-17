import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const NameInputModal = ({ isOpen, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        >
          <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="w-full max-w-lg">
              <div className="bg-background rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Welcome to Intellisync Solutions Business Assistants
                </h2>
                <p className="text-muted-foreground mb-4">
                  Please enter your name to get started
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full"
                      autoFocus
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!name.trim()}
                    >
                      Start Chat
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NameInputModal;
