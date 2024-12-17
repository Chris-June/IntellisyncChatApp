import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, LineChart, Line
} from 'recharts';
import {
  UserGroupIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const TeacherView = () => {
  // Sample data for teacher-specific metrics
  const classPerformance = [
    { name: 'Week 1', Average: 75, TopPerformer: 95, NeedsSupport: 55 },
    { name: 'Week 2', Average: 78, TopPerformer: 96, NeedsSupport: 58 },
    { name: 'Week 3', Average: 80, TopPerformer: 98, NeedsSupport: 62 },
    { name: 'Week 4', Average: 82, TopPerformer: 97, NeedsSupport: 65 },
    { name: 'Week 5', Average: 85, TopPerformer: 99, NeedsSupport: 70 },
  ];

  const studentEngagement = [
    { name: 'Mon', Participation: 85, Questions: 12, Submissions: 95 },
    { name: 'Tue', Participation: 88, Questions: 15, Submissions: 92 },
    { name: 'Wed', Participation: 90, Questions: 18, Submissions: 98 },
    { name: 'Thu', Participation: 85, Questions: 14, Submissions: 90 },
    { name: 'Fri', Participation: 92, Questions: 20, Submissions: 96 },
  ];

  const studentsNeedingAttention = [
    {
      name: 'Emma Thompson',
      subject: 'Mathematics',
      issue: 'Struggling with Algebra',
      lastActive: '2 days ago',
      trend: 'declining'
    },
    {
      name: 'James Wilson',
      subject: 'French',
      issue: 'Missing assignments',
      lastActive: '1 day ago',
      trend: 'stable'
    },
    {
      name: 'Sarah Parker',
      subject: 'Science',
      issue: 'Test performance dropping',
      lastActive: '3 days ago',
      trend: 'declining'
    },
  ];

  const classInsights = [
    {
      title: 'Most Challenging Topic',
      value: 'Quadratic Equations',
      detail: '45% of students struggling',
      action: 'Review recommended'
    },
    {
      title: 'Highest Engagement',
      value: 'Chemical Reactions',
      detail: '92% participation rate',
      action: 'Continue current approach'
    },
    {
      title: 'Upcoming Deadlines',
      value: '3 Assignments',
      detail: 'Due this week',
      action: 'Send reminders'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Teacher Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Class Size', value: '28 Students', icon: UserGroupIcon, color: 'blue' },
          { title: 'Average Attendance', value: '94%', icon: null, color: 'green' },
          { title: 'Completion Rate', value: '87%', icon: null, color: 'purple' },
          { title: 'Class Average', value: '82%', icon: null, color: 'yellow' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center">
              {stat.icon && (
                <div className={`p-3 rounded-lg bg-${stat.color}-500/20`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
                </div>
              )}
              <div className="ml-4">
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Class Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Class Performance Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={classPerformance}>
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
                dataKey="Average"
                stroke="#4ade80"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="TopPerformer"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="NeedsSupport"
                stroke="#f87171"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Student Progress Over Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6 col-span-2"
      >
        <h2 className="text-xl font-semibold mb-4">Student Progress Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={classPerformance}>
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
              <Area
                type="monotone"
                dataKey="Average"
                stroke="#4ade80"
                fill="#4ade80"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="TopPerformer"
                stroke="#60a5fa"
                fill="#60a5fa"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="NeedsSupport"
                stroke="#f472b6"
                fill="#f472b6"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Students Needing Attention */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Students Needing Attention</h2>
        <div className="space-y-4">
          {studentsNeedingAttention.map((student, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${student.trend === 'declining' ? 'bg-red-500/20' : 'bg-yellow-500/20'}`}>
                  {student.trend === 'declining' ? (
                    <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <CheckCircleIcon className="h-6 w-6 text-yellow-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-400">{student.subject} - {student.issue}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Last Active</p>
                <p className="text-sm">{student.lastActive}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Class Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Class Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {classInsights.map((insight, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-gray-400">{insight.title}</h3>
              <p className="text-xl font-semibold mt-1">{insight.value}</p>
              <p className="text-sm text-gray-400 mt-2">{insight.detail}</p>
              <div className="mt-4 text-indigo-400 text-sm">{insight.action}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Student Engagement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Weekly Student Engagement</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studentEngagement}>
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
              <Bar dataKey="Participation" fill="#4ade80" />
              <Bar dataKey="Questions" fill="#60a5fa" />
              <Bar dataKey="Submissions" fill="#f472b6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherView;
