import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  BookOpenIcon,
  StarIcon,
  CalendarIcon,
  BellIcon,
  CheckCircleIcon,
  ClockIcon,
  AcademicCapIcon,
  ChartBarIcon,
  TrophyIcon,
  BeakerIcon,
  FireIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

const ParentView = ({
  learningProgress,
  timeSpent,
  gradientColors,
  COLORS,
  stats,
  notifications,
  upcomingEvents,
  achievements,
  learningRecommendations
}) => {
  // Transform learning progress data for parent view
  const progressOverview = learningProgress.map(week => ({
    name: week.name,
    Performance: (week.Mathematics + week.Science + week.English + week.French) / 4,
    Attendance: 95 + Math.random() * 5, // Simulated attendance data
    Engagement: 85 + Math.random() * 10 // Simulated engagement data
  }));

  // Transform timeSpent data for subject breakdown
  const subjectBreakdown = timeSpent.map((subject, index) => ({
    ...subject,
    color: COLORS[index % COLORS.length]
  }));

  // Sample upcoming assignments data
  const upcomingAssignments = upcomingEvents.map(event => ({
    title: event.title,
    dueDate: event.date,
    status: 'Pending',
    icon: event.type === 'assessment' ? AcademicCapIcon : 
          event.type === 'deadline' ? ClockIcon : 
          event.type === 'meeting' ? CalendarIcon : ChartBarIcon
  }));

  // Map achievement icons
  const achievementIcons = {
    '🏆': TrophyIcon,
    '🔥': FireIcon,
    '🔬': BeakerIcon,
  };

  // Map notification type to icons
  const notificationIcons = {
    achievement: TrophyIcon,
    reminder: BellIcon,
    feedback: ChatBubbleLeftRightIcon,
  };

  return (
    <div className="space-y-8">
      {/* Parent Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg bg-${stat.color || 'indigo'}-500/20`}>
                <stat.icon className={`h-6 w-6 text-${stat.color || 'indigo'}-500`} />
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">{stat.name}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Academic Progress Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressOverview}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Performance"
                stroke="#4ade80"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Attendance"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Engagement"
                stroke="#f472b6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Detailed Progress View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Detailed Progress</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={learningProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Mathematics"
                stroke={gradientColors.mathematics[0]}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Science"
                stroke={gradientColors.science[0]}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="English"
                stroke={gradientColors.english[0]}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="French"
                stroke={gradientColors.french[0]}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Subject Performance and Upcoming Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Subject Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectBreakdown}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {subjectBreakdown.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Upcoming Assignments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Upcoming Assignments</h2>
          <div className="space-y-4">
            {upcomingAssignments.map((assignment, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full bg-${COLORS[index % COLORS.length]}/20`}>
                    <assignment.icon className={`h-6 w-6 text-${COLORS[index % COLORS.length]}`} />
                  </div>
                  <div>
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-gray-400">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-yellow-500/20 text-yellow-500">
                  {assignment.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const IconComponent = achievementIcons[achievement.icon] || TrophyIcon;
            return (
              <div
                key={index}
                className="bg-gray-700 rounded-lg p-4 flex items-start space-x-4"
              >
                <div className="flex-shrink-0">
                  <div className="p-2 bg-yellow-500/20 rounded-full">
                    <IconComponent className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">{achievement.title}</p>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Notifications/Messages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Teacher Messages</h2>
        <div className="space-y-4">
          {notifications.map((notification, index) => {
            const IconComponent = notificationIcons[notification.type] || ChatBubbleLeftRightIcon;
            return (
              <div
                key={index}
                className="flex items-start space-x-4 bg-gray-700 rounded-lg p-4"
              >
                <div className="flex-shrink-0">
                  <div className="p-2 bg-blue-500/20 rounded-full">
                    <IconComponent className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">
                    {notification.type === 'feedback' ? 'Teacher Feedback' : notification.type}
                  </p>
                  <p className="text-sm text-gray-400">{notification.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default ParentView;
