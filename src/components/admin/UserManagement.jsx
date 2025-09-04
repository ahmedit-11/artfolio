// UserManagement.jsx
// Component for managing all registered users in the system
import React, { useState, useEffect } from 'react';
import { Search, Eye, MoreHorizontal, Calendar, Mail, Image, FileText, Users, UserCheck, UserX,ThumbsUp, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';
import StatCard from './StatCard';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        registrationDate: '2024-01-15',
        postsCount: 24,
        followersCount: 156,
        followingCount: 89,
        status: 'active',
        lastLogin: '2024-08-06',
        totalLikes: 1240,
        totalComments: 89
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
        registrationDate: '2024-02-20',
        postsCount: 18,
        followersCount: 203,
        followingCount: 145,
        status: 'active',
        lastLogin: '2024-08-07',
        totalLikes: 890,
        totalComments: 156
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
        registrationDate: '2024-03-10',
        postsCount: 7,
        followersCount: 45,
        followingCount: 67,
        status: 'banned',
        lastLogin: '2024-07-28',
        totalLikes: 234,
        totalComments: 45
      }
    ];
    
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      banned: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      suspended: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    };

    return (
      <span className={cn(
        'px-2 py-1 rounded-full text-xs font-medium',
        statusStyles[status] || statusStyles.active
      )}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-10 bg-muted rounded"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">User Management</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Manage all registered users in the system</p>
          </div>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <StatCard
            title="Total Users"
            value={users.length}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Active Users"
            value={users.filter(user => user.status === 'active').length}
            icon={UserCheck}
            color="green"
          />
          <StatCard
            title="Banned Users"
            value={users.filter(user => user.status === 'banned').length}
            icon={UserX}
            color="red"
          />
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 sm:mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-2 text-sm sm:text-base bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm">User</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm hidden md:table-cell">Registration Date</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm hidden lg:table-cell">Portfolios</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm hidden lg:table-cell">Followers</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm">Status</th>

                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="size-8 sm:size-10 flex-shrink-0">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-foreground text-sm sm:text-base truncate">{user.name}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground truncate">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-muted-foreground hidden md:table-cell">
                    {formatDate(user.registrationDate)}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-foreground font-medium hidden lg:table-cell">
                    {user.postsCount}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-foreground font-medium hidden lg:table-cell">
                    {user.followersCount}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    {getStatusBadge(user.status)}
                  </td>
                 
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 sm:gap-2"
                    >
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">View</span>
                      <Eye className="size-3 sm:size-4 text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-foreground">User Details</h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-muted-foreground hover:text-foreground text-xl sm:text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* User Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <Avatar className="size-12 sm:size-16 flex-shrink-0">
                    <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                    <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base sm:text-lg font-semibold text-foreground truncate">{selectedUser.name}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground truncate">{selectedUser.email}</p>
                    <div className="mt-2">{getStatusBadge(selectedUser.status)}</div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-muted/50 rounded-lg p-3 sm:p-4 text-center">
                    <FileText className="size-5 sm:size-6 text-purple-600 mx-auto mb-1 sm:mb-2" />
                    <div className="text-lg sm:text-2xl font-bold text-foreground">{selectedUser.postsCount}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Portfolios</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 sm:p-4 text-center">
                    <UserCheck className="size-5 sm:size-6 text-blue-600 mx-auto mb-1 sm:mb-2" />
                    <div className="text-lg sm:text-2xl font-bold text-foreground">{selectedUser.followersCount}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 sm:p-4 text-center">
                    <UserCheck className="size-5 sm:size-6 text-green-600 mx-auto mb-1 sm:mb-2" />
                    <div className="text-lg sm:text-2xl font-bold text-foreground">{selectedUser.followingCount}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Following</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 sm:p-4 text-center">
                  <Heart className="size-5 sm:size-6 text-red-600 mx-auto mb-1 sm:mb-2" />
                    <div className="text-lg sm:text-2xl font-bold text-foreground">{selectedUser.totalLikes}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Total Likes</div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Registered:</span>
                    </div>
                    <span className="text-foreground sm:ml-auto">{formatDate(selectedUser.registrationDate)}</span>
                  </div>
                  {/* <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Last Login:</span>
                    </div>
                    <span className="text-foreground sm:ml-auto">{formatDate(selectedUser.lastLogin)}</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
