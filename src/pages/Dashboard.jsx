import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, Legend, LineChart, Line
} from 'recharts';
import {
  AcademicCapIcon,
  ChartBarIcon,
  ClockIcon,
  FireIcon,
  LightBulbIcon,
  StarIcon,
  ShareIcon,
  BellAlertIcon,
  ChatBubbleLeftRightIcon,
  DocumentDuplicateIcon,
  CalendarIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import TeacherView from '../components/Dashboard/TeacherView';
import ParentView from '../components/Dashboard/ParentView';
import StudentView from '../components/Dashboard/StudentView';

const Dashboard = () => {
  // Sample data - In production, this would come from your backend
  const [learningProgress] = useState([
    { name: 'Week 1', Mathematics: 65, Science: 45, English: 80, French: 30 },
    { name: 'Week 2', Mathematics: 70, Science: 55, English: 85, French: 40 },
    { name: 'Week 3', Mathematics: 85, Science: 75, English: 87, French: 60 },
    { name: 'Week 4', Mathematics: 90, Science: 85, English: 89, French: 75 },
    { name: 'Week 5', Mathematics: 95, Science: 90, English: 92, French: 85 },
  ]);

  const [subjectStrengths] = useState([
    { subject: 'Problem Solving', value: 85 },
    { subject: 'Critical Thinking', value: 90 },
    { subject: 'Memory', value: 75 },
    { subject: 'Speed', value: 80 },
    { subject: 'Accuracy', value: 88 },
  ]);

  const [timeSpent] = useState([
    { subject: 'Mathematics', value: 35 },
    { subject: 'Science', value: 25 },
    { subject: 'English', value: 20 },
    { subject: 'French', value: 20 },
  ]);

  // Custom gradient colors
  const gradientColors = {
    mathematics: ['#FF6B6B', '#FF8E8E'],
    science: ['#4ECDC4', '#45B7AF'],
    english: ['#96C93D', '#7DAC2C'],
    french: ['#A18CD1', '#8675A9'],
  };

  const COLORS = ['#FF6B6B', '#4ECDC4', '#96C93D', '#A18CD1'];

  const stats = [
    { name: 'Total Study Hours', value: '124', icon: ClockIcon },
    { name: 'Subjects Mastered', value: '4', icon: AcademicCapIcon },
    { name: 'Current Streak', value: '12 days', icon: FireIcon },
    { name: 'Achievement Points', value: '2,845', icon: StarIcon },
  ];

  const [selectedView, setSelectedView] = useState('student'); // 'student', 'teacher', 'parent'
  const [showShareModal, setShowShareModal] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'achievement', message: 'Congratulations! You\'ve mastered Basic Algebra!' },
    { id: 2, type: 'reminder', message: 'French vocabulary quiz tomorrow' },
    { id: 3, type: 'feedback', message: 'Ms. Johnson left feedback on your Science project' },
  ]);

  const [upcomingEvents] = useState([
    { date: '2024-12-18', title: 'French Vocabulary Quiz', type: 'assessment' },
    { date: '2024-12-20', title: 'Math Project Due', type: 'deadline' },
    { date: '2024-12-22', title: 'Parent-Teacher Meeting', type: 'meeting' },
  ]);

  const [achievements] = useState([
    { id: 1, title: 'Math Master', description: 'Completed Advanced Algebra with 95%', icon: '🏆' },
    { id: 2, title: '30-Day Streak', description: 'Studied consistently for 30 days', icon: '🔥' },
    { id: 3, title: 'Science Whiz', description: 'Top performer in Physics', icon: '🔬' },
  ]);

  const [learningRecommendations] = useState([
    { subject: 'Mathematics', topic: 'Quadratic Equations', reason: 'Based on recent performance' },
    { subject: 'French', topic: 'Past Tense', reason: 'Upcoming in curriculum' },
    { subject: 'Science', topic: 'Chemical Reactions', reason: 'Area for improvement' },
  ]);

  const [weeklyGoals] = useState([
    { goal: 'Complete 5 Math exercises', progress: 80 },
    { goal: 'Read 2 English chapters', progress: 100 },
    { goal: 'Practice French for 2 hours', progress: 60 },
  ]);

  // Share dashboard function
  const handleShare = () => {
    setShowShareModal(true);
  };

  // View selector component
  const ViewSelector = () => (
    <div className="flex space-x-4 mb-6">
      {['student', 'teacher', 'parent'].map((view) => (
        <button
          key={view}
          onClick={() => setSelectedView(view)}
          className={`px-4 py-2 rounded-lg ${
            selectedView === view
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {view.charAt(0).toUpperCase() + view.slice(1)} View
        </button>
      ))}
    </div>
  );

  // Share Modal Component
  const ShareModal = () => (
    <AnimatePresence>
      {showShareModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-semibold mb-4">Share Dashboard</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2">
                <ShareIcon className="h-5 w-5" />
                <span>Share with Teacher</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2">
                <ShareIcon className="h-5 w-5" />
                <span>Share with Parents</span>
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full bg-gray-600 hover:bg-gray-500 text-white rounded-lg px-4 py-2"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header with Share Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Learning Dashboard</h1>
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg px-4 py-2"
          >
            <ShareIcon className="h-5 w-5" />
            <span>Share Dashboard</span>
          </button>
        </div>

        {/* View Selector */}
        <ViewSelector />

        {/* Render the selected view */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {selectedView === 'teacher' && (
              <TeacherView
                learningProgress={learningProgress}
                subjectStrengths={subjectStrengths}
                timeSpent={timeSpent}
                gradientColors={gradientColors}
                COLORS={COLORS}
                stats={stats}
                notifications={notifications}
                upcomingEvents={upcomingEvents}
                achievements={achievements}
                learningRecommendations={learningRecommendations}
                weeklyGoals={weeklyGoals}
              />
            )}
            {selectedView === 'parent' && (
              <ParentView
                learningProgress={learningProgress}
                subjectStrengths={subjectStrengths}
                timeSpent={timeSpent}
                gradientColors={gradientColors}
                COLORS={COLORS}
                stats={stats}
                notifications={notifications}
                upcomingEvents={upcomingEvents}
                achievements={achievements}
                learningRecommendations={learningRecommendations}
                weeklyGoals={weeklyGoals}
              />
            )}
            {selectedView === 'student' && (
              <StudentView
                learningProgress={learningProgress}
                subjectStrengths={subjectStrengths}
                timeSpent={timeSpent}
                gradientColors={gradientColors}
                COLORS={COLORS}
                stats={stats}
                notifications={notifications}
                upcomingEvents={upcomingEvents}
                achievements={achievements}
                learningRecommendations={learningRecommendations}
                weeklyGoals={weeklyGoals}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Share Modal */}
      <ShareModal />
    </div>
  );
};

export default Dashboard;
