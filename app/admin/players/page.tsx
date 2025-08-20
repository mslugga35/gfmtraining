import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Search, Filter, Plus, MoreHorizontal, Eye, Edit, Trash2, Video, TrendingUp } from 'lucide-react';

// Mock data - replace with actual API calls
const mockPlayers = [
  {
    id: '1',
    clerkId: 'user_123',
    fullName: 'Sarah Wilson',
    email: 'sarah.wilson@email.com',
    phone: '(555) 123-4567',
    dateOfBirth: '2008-03-15',
    position: 'Shortstop',
    team: 'Varsity',
    profileImage: null,
    overallScore: 94,
    videoCount: 8,
    lastActivity: '2024-01-18T10:30:00Z',
    joinDate: '2023-09-01T00:00:00Z',
    role: 'PLAYER'
  },
  {
    id: '2',
    clerkId: 'user_456',
    fullName: 'Mike Rodriguez',
    email: 'mike.rodriguez@email.com',
    phone: '(555) 234-5678',
    dateOfBirth: '2007-07-22',
    position: 'Pitcher',
    team: 'Varsity',
    profileImage: null,
    overallScore: 91,
    videoCount: 12,
    lastActivity: '2024-01-17T14:15:00Z',
    joinDate: '2023-08-15T00:00:00Z',
    role: 'PLAYER'
  },
  {
    id: '3',
    clerkId: 'user_789',
    fullName: 'Emma Davis',
    email: 'emma.davis@email.com',
    phone: '(555) 345-6789',
    dateOfBirth: '2008-11-08',
    position: 'Outfield',
    team: 'JV',
    profileImage: null,
    overallScore: 89,
    videoCount: 6,
    lastActivity: '2024-01-16T09:45:00Z',
    joinDate: '2023-10-01T00:00:00Z',
    role: 'PLAYER'
  },
  {
    id: '4',
    clerkId: 'user_101',
    fullName: 'Jake Thompson',
    email: 'jake.thompson@email.com',
    phone: '(555) 456-7890',
    dateOfBirth: '2009-01-30',
    position: 'Catcher',
    team: 'JV',
    profileImage: null,
    overallScore: 87,
    videoCount: 4,
    lastActivity: '2024-01-15T16:20:00Z',
    joinDate: '2023-11-15T00:00:00Z',
    role: 'PLAYER'
  },
];

export default async function PlayersPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Player Management</h1>
          <p className="text-gray-400 mt-1">
            {mockPlayers.length} players registered
          </p>
        </div>
        
        <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Player
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search players by name, email, or position..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-3">
            <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Teams</option>
              <option value="varsity">Varsity</option>
              <option value="jv">JV</option>
              <option value="academy">Academy</option>
            </select>
            
            <select className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Positions</option>
              <option value="pitcher">Pitcher</option>
              <option value="catcher">Catcher</option>
              <option value="infield">Infield</option>
              <option value="outfield">Outfield</option>
            </select>
            
            <button className="flex items-center px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Players Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Position/Team
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {mockPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-medium">
                          {player.fullName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{player.fullName}</div>
                        <div className="text-sm text-gray-400">
                          Age: {calculateAge(player.dateOfBirth)}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{player.email}</div>
                    <div className="text-sm text-gray-400">{player.phone}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{player.position}</div>
                    <div className="text-sm text-gray-400">{player.team}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-white mr-2">
                        {player.overallScore}
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="text-sm text-gray-400">
                      {player.videoCount} videos
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {new Date(player.lastActivity).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      Joined {new Date(player.joinDate).toLocaleDateString()}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 p-1">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-white p-1">
                        <Video className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-white p-1">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300 p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-white p-1">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Showing 1 to {mockPlayers.length} of {mockPlayers.length} players
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50">
            Previous
          </button>
          <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</span>
          <button className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
            Next
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-white">{mockPlayers.length}</div>
          <div className="text-sm text-gray-400">Total Players</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-white">
            {mockPlayers.filter(p => p.team === 'Varsity').length}
          </div>
          <div className="text-sm text-gray-400">Varsity Players</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-white">
            {Math.round(mockPlayers.reduce((sum, p) => sum + p.overallScore, 0) / mockPlayers.length)}
          </div>
          <div className="text-sm text-gray-400">Avg. Score</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-white">
            {mockPlayers.reduce((sum, p) => sum + p.videoCount, 0)}
          </div>
          <div className="text-sm text-gray-400">Total Videos</div>
        </div>
      </div>
    </div>
  );
}