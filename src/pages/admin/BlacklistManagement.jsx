import Cookies from "js-cookie"
// BlacklistManagement.jsx
// Component for managing banned users and their ban details
import React, { useState, useEffect } from 'react';
import { Search, User, Shield, ShieldX, Clock, Timer, AlertTriangle, Unlock, UserX, Calendar, CheckCircle, XCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';
import BanDetailsModal from './BanDetailsModal';
import ConfirmDialog from '@/components/ConfirmDialog';
import StatCard from './StatCard';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
import axios from 'axios';

const BlacklistManagement = () => {
  const [bannedUsers, setBannedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [userToUnban, setUserToUnban] = useState(null);
  const token = Cookies.get('token');

  // Fetch banned users from API
  const fetchBannedUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/admin/banned-users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBannedUsers(response.data);
    } catch (error) {
      console.error('Error fetching banned users:', error);
      toast.error('Failed to fetch banned users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannedUsers();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const getBanStatusBadge = (user) => {
    if (!user.isActive) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          Unbanned
        </span>
      );
    }

    if (user.banType === 'permanent') {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
          Permanent Ban
        </span>
      );
    }

    const now = new Date();
    const endDate = new Date(user.banEndDate);
    
    if (endDate > now) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
          Active Ban
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
          Expired
        </span>
      );
    }
  };

  const getRemainingTime = (endDate) => {
    if (!endDate) return 'Permanent';
    
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} remaining`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
    }
  };

  const handleUnbanUser = (userId) => {
    setUserToUnban(userId);
    setShowConfirmDialog(true);
  };

  const confirmUnban = async () => {
    if (!userToUnban) return;
    
    setLoading(true);
    
    try {
      await axios.delete(`/admin/banned-users/${userToUnban}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Refresh the banned users list
      await fetchBannedUsers();
      
      toast.success('User has been successfully unbanned');
    } catch (error) {
      console.error('Error unbanning user:', error);
      toast.error('Failed to unban user. Please try again.');
    } finally {
      setLoading(false);
      setShowConfirmDialog(false);
      setUserToUnban(null);
    }
  };

  const cancelUnban = () => {
    setShowConfirmDialog(false);
    setUserToUnban(null);
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Blacklist Management</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Manage banned users and their ban details</p>
          </div>
        </div>
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <StatCard
            title="Total Banned"
            value={bannedUsers.length}
            icon={Shield}
            color="red"
          />
          <StatCard
            title="Permanent Bans"
            value={bannedUsers.filter(u => !u.banned_until).length}
            icon={ShieldX}
            color="red"
          />
          <StatCard
            title="Temporary Bans"
            value={bannedUsers.filter(u => u.banned_until).length}
            icon={Timer}
            color="orange"
          />
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 sm:mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
          <input
            type="text"
            placeholder="Search banned users by name, email, or reason..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-2 text-sm sm:text-base bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Banned Users Table */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm">User</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm hidden sm:table-cell">Ban Reason</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm hidden md:table-cell">Ban Start</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm hidden lg:table-cell">Ban End</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bannedUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      {/* <Avatar className="size-8 sm:size-10 flex-shrink-0">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar> */}
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-foreground text-sm sm:text-base truncate">{user.name}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground truncate">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-muted-foreground hidden sm:table-cell">
                    <div className="max-w-xs truncate" title={user.ban_reason}>
                      {user.ban_reason || 'No reason provided'}
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-muted-foreground hidden md:table-cell">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-muted-foreground hidden lg:table-cell">
                    {user.banned_until ? formatDate(user.banned_until) : 'Permanent'}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1 sm:gap-2">
                      <button
                    
                          onClick={() => handleUnbanUser(user.id)}
                          className="p-1.5 sm:p-2 bg-green-700 hover:bg-green-800 dark:hover:bg-green-900 rounded-lg transition-colors text-white text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-1.5"
                          title="Unban User"
                        >
                          <span className="hidden sm:inline">Unban User</span>
                          <span className="sm:hidden">Unban</span>
                          <Unlock className="size-3 sm:size-4 text-white" />
                        </button>
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <BanDetailsModal 
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        banData={selectedUser}
        onUnbanUser={handleUnbanUser}
        isBlacklistView={true}
      /> */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={cancelUnban}
        onConfirm={confirmUnban}
        title="Unban User"
        message="Are you sure you want to unban this user? This action cannot be undone."
      />
    </div>
  );
};

export default BlacklistManagement;
