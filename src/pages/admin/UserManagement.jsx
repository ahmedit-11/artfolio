// UserManagement.jsx
// Component for managing all registered users in the system
import React, { useState, useEffect } from 'react';
import { Search, Eye, MoreHorizontal, Calendar, Mail, Image, Users, UserX, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';
import StatCard from './StatCard';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '@/store/users/thunk/getAllUsers';
import { getProfileImageUrl } from '@/utils/mediaUtils';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const filteredUsers = Array.isArray(users) && users.length>0&& users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
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

    const userStatus = status || 'active';
    return (
      <span className={cn(
        'px-2 py-1 rounded-full text-xs font-medium',
        statusStyles[userStatus] || statusStyles.active
      )}>
        {userStatus.charAt(0).toUpperCase() + userStatus.slice(1)}
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

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-500">
          <p>Error loading users: {error}</p>
          <button 
            onClick={() => dispatch(getAllUsers())}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
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
            value={Array.isArray(users) && users.length>0&&users.filter(user => user.banned !== 1).length}
            icon={UserCheck}
            color="green"
          />
          <StatCard
            title="Banned Users"
            value={Array.isArray(users) && users.length>0&&users.filter(user => user.banned === 1).length}
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
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm">Status</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm">Role</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredUsers) && filteredUsers.length>0&&filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="size-8 sm:size-10 flex-shrink-0">
                        <AvatarImage src={getProfileImageUrl(user.profile_picture || user.avatar)} alt={user.name} />
                        <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-foreground text-sm sm:text-base truncate">{user.name || 'Unknown'}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground truncate">{user.email || 'No email'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-muted-foreground hidden md:table-cell">
                    {formatDate(user.created_at || user.registrationDate)}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    {getStatusBadge(user.banned === 1 ? 'banned' : 'active')}
                  </td>
                  <td className="py-3 sm:py-4 px-2 text-blue-600 sm:px-4">
                    {user.role}
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
                    <AvatarImage src={getProfileImageUrl(selectedUser.profile_picture || selectedUser.avatar)} alt={selectedUser.name} />
                    <AvatarFallback>{selectedUser.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base sm:text-lg font-semibold text-foreground truncate">{selectedUser.name || 'Unknown'}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground truncate">{selectedUser.email || 'No email'}</p>
                    <div className="mt-2">{getStatusBadge(selectedUser.status)}</div>
                  </div>
                </div>


                {/* Additional Info */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Registered:</span>
                    </div>
                    <span className="text-foreground sm:ml-auto">{formatDate(selectedUser.created_at || selectedUser.registrationDate)}</span>
                  </div>
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
