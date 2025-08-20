import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { TrendingUp, TrendingDown, Target, Calendar, Award } from 'lucide-react';

// Mock data - replace with actual API calls
const mockProgressData = {
  overallScore: 85,
  scoreChange: +5,
  categories: [
    {
      name: 'Batting',
      score: 88,
      change: +3,
      trend: 'up',
      details: [
        { metric: 'Contact Rate', value: '85%', change: '+2%' },
        { metric: 'Power', value: '7.2/10', change: '+0.5' },
        { metric: 'Plate Discipline', value: '8.1/10', change: '+0.8' },
      ]
    },
    {
      name: 'Pitching',
      score: 82,
      change: +7,
      trend: 'up',
      details: [
        { metric: 'Velocity', value: '78 mph', change: '+2 mph' },
        { metric: 'Control', value: '8.5/10', change: '+1.2' },
        { metric: 'Movement', value: '7.8/10', change: '+0.3' },
      ]
    },
    {
      name: 'Fielding',
      score: 84,
      change: -1,
      trend: 'down',
      details: [
        { metric: 'Reaction Time', value: '0.85s', change: '+0.05s' },
        { metric: 'Accuracy', value: '92%', change: '-1%' },
        { metric: 'Range', value: '8.3/10', change: '+0.1' },
      ]
    },
    {
      name: 'Base Running',
      score: 86,
      change: +4,
      trend: 'up',
      details: [
        { metric: '60-yard dash', value: '7.2s', change: '-0.1s' },
        { metric: 'Stealing Success', value: '78%', change: '+5%' },
        { metric: 'Base IQ', value: '8.7/10', change: '+0.4' },
      ]
    },
  ],
  recentSessions: [
    {
      date: '2024-01-15',
      type: 'Batting Practice',
      score: 87,
      notes: 'Great improvement in swing mechanics'
    },
    {
      date: '2024-01-12',
      type: 'Pitching Session',
      score: 84,
      notes: 'Working on fastball command'
    },
    {
      date: '2024-01-10',
      type: 'Fielding Drills',
      score: 82,
      notes: 'Focus on footwork fundamentals'
    },
  ],
  goals: [
    {
      id: '1',
      title: 'Increase Batting Average',
      target: '.350',
      current: '.328',
      progress: 85,
      deadline: '2024-03-01'
    },
    {
      id: '2',
      title: 'Improve Pitching Velocity',
      target: '82 mph',
      current: '78 mph',
      progress: 70,
      deadline: '2024-02-15'
    },
    {
      id: '3',
      title: 'Reduce 60-yard Time',
      target: '6.8s',
      current: '7.2s',
      progress: 40,
      deadline: '2024-04-01'
    },
  ]
};

export default async function ProgressPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Progress Tracking</h1>
        <p className="text-gray-400 mt-1">
          Monitor your development and achievements over time
        </p>
      </div>

      {/* Overall Score */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Overall Performance Score</h2>
            <div className="flex items-center">
              <span className="text-4xl font-bold text-white mr-3">
                {mockProgressData.overallScore}
              </span>
              <div className="flex items-center text-green-200">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-lg font-medium">+{mockProgressData.scoreChange}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-red-100 text-sm">Last 30 days</p>
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mt-2">
              <Award className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Category Breakdown</h2>
          
          <div className="space-y-4">
            {mockProgressData.categories.map((category) => (
              <div key={category.name} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium">{category.name}</h3>
                  <div className="flex items-center">
                    <span className="text-white font-bold mr-2">{category.score}</span>
                    <div className={`flex items-center ${
                      category.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {category.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-sm">{Math.abs(category.change)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {category.details.map((detail) => (
                    <div key={detail.metric} className="flex justify-between text-sm">
                      <span className="text-gray-400">{detail.metric}</span>
                      <div className="text-right">
                        <span className="text-white">{detail.value}</span>
                        <span className={`ml-2 ${
                          detail.change.startsWith('+') || detail.change.startsWith('-') && !detail.change.includes('+') 
                            ? detail.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                            : 'text-gray-400'
                        }`}>
                          {detail.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Current Goals</h2>
          
          <div className="space-y-4">
            {mockProgressData.goals.map((goal) => (
              <div key={goal.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-medium">{goal.title}</h3>
                  <Target className="h-5 w-5 text-red-400" />
                </div>
                
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Current: {goal.current}</span>
                  <span>Target: {goal.target}</span>
                </div>
                
                <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{goal.progress}% complete</span>
                  <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Training Sessions</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-medium py-2">Date</th>
                <th className="text-left text-gray-400 font-medium py-2">Type</th>
                <th className="text-left text-gray-400 font-medium py-2">Score</th>
                <th className="text-left text-gray-400 font-medium py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {mockProgressData.recentSessions.map((session, index) => (
                <tr key={index} className="border-b border-gray-700 last:border-b-0">
                  <td className="py-3 text-white">
                    {new Date(session.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-gray-300">{session.type}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {session.score}
                    </span>
                  </td>
                  <td className="py-3 text-gray-300 text-sm">{session.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}