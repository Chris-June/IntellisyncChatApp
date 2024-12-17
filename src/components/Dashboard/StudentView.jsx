import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, Legend
} from 'recharts';
import {
  BellAlertIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

const StudentView = ({
  learningProgress,
  subjectStrengths,
  timeSpent,
  gradientColors,
  COLORS,
  stats,
  notifications,
  upcomingEvents,
  achievements,
  learningRecommendations,
  weeklyGoals,
}) => {
  return (
    <div className="space-y-8">
      {/* Notifications Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-800 rounded-xl p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BellAlertIcon className="h-6 w-6 mr-2 text-yellow-500" />
          Notifications
        </h2>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-3 bg-gray-700 rounded-lg p-4"
            >
              <div className="flex-shrink-0">
                {notification.type === 'achievement' && <TrophyIcon className="h-6 w-6 text-yellow-500" />}
                {notification.type === 'reminder' && <CalendarIcon className="h-6 w-6 text-blue-500" />}
                {notification.type === 'feedback' && <ChatBubbleLeftRightIcon className="h-6 w-6 text-green-500" />}
              </div>
              <p>{notification.message}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center">
              <div className="p-2 bg-indigo-500 rounded-lg">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">{stat.name}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Goals Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-800 rounded-xl p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">Weekly Goals</h2>
        <div className="space-y-4">
          {weeklyGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span>{goal.goal}</span>
                <span>{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Learning Progress Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={learningProgress}>
                <defs>
                  {Object.entries(gradientColors).map(([subject, [color1, color2]]) => (
                    <linearGradient key={subject} id={`gradient${subject}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color1} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={color2} stopOpacity={0.2}/>
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="Mathematics"
                  stroke={gradientColors.mathematics[0]}
                  fill="url(#gradientmathematics)"
                />
                <Area
                  type="monotone"
                  dataKey="Science"
                  stroke={gradientColors.science[0]}
                  fill="url(#gradientscience)"
                />
                <Area
                  type="monotone"
                  dataKey="English"
                  stroke={gradientColors.english[0]}
                  fill="url(#gradientenglish)"
                />
                <Area
                  type="monotone"
                  dataKey="French"
                  stroke={gradientColors.french[0]}
                  fill="url(#gradientfrench)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Skills Radar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Learning Skills</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={subjectStrengths}>
                <PolarGrid stroke="#444" />
                <PolarAngleAxis dataKey="subject" stroke="#888" />
                <PolarRadiusAxis stroke="#888" />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="#A18CD1"
                  fill="#A18CD1"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Time Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Time Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={timeSpent}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {timeSpent.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Weekly Performance Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Weekly Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={learningProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend />
                <Bar dataKey="Mathematics" fill={gradientColors.mathematics[0]} />
                <Bar dataKey="Science" fill={gradientColors.science[0]} />
                <Bar dataKey="English" fill={gradientColors.english[0]} />
                <Bar dataKey="French" fill={gradientColors.french[0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CalendarIcon className="h-6 w-6 mr-2 text-indigo-500" />
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center space-x-4 bg-gray-700 rounded-lg p-4">
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="text-sm text-gray-400">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <div>
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-gray-400">{event.type}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrophyIcon className="h-6 w-6 mr-2 text-yellow-500" />
            Recent Achievements
          </h2>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-4 bg-gray-700 rounded-lg p-4">
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <div className="font-medium">{achievement.title}</div>
                  <div className="text-sm text-gray-400">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Learning Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gray-800 rounded-xl p-6 lg:col-span-2"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <LightBulbIcon className="h-6 w-6 mr-2 text-yellow-500" />
            Personalized Learning Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {learningRecommendations.map((rec, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="font-medium text-indigo-400">{rec.subject}</div>
                <div className="font-medium mt-2">{rec.topic}</div>
                <div className="text-sm text-gray-400 mt-1">{rec.reason}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentView;
