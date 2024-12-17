import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const NameInputModal = ({ isOpen, onSubmit }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && age && grade) {
      onSubmit({
        name: name.trim(),
        age: parseInt(age),
        grade: grade
      });
    }
  };

  const gradeOptions = [
    'Kindergarten',
    '1st Grade',
    '2nd Grade',
    '3rd Grade',
    '4th Grade',
    '5th Grade',
    '6th Grade',
    '7th Grade',
    '8th Grade',
    '9th Grade',
    '10th Grade',
    '11th Grade',
    '12th Grade'
  ];

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
                  Welcome to Educational Assistant
                </h2>
                <p className="text-muted-foreground mb-4">
                  Please enter your information to get started
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium mb-1">
                        Age
                      </label>
                      <Input
                        id="age"
                        type="number"
                        min="4"
                        max="19"
                        placeholder="Your age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="grade" className="block text-sm font-medium mb-1">
                        Grade Level
                      </label>
                      <select
                        id="grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="">Select Grade</option>
                        {gradeOptions.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!name.trim() || !age || !grade}
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
