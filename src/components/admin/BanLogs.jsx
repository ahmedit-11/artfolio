// BanLogs.jsx
// Component for displaying a comprehensive log of all ban actions
import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Shield, Clock, Filter, Download, CircleX, Unlock, Info, FileText, Activity, CheckCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';
import BanDetailsModal from './BanDetailsModal';
import StatCard from './StatCard';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import * as Select from '@radix-ui/react-select';

const BanLogs = () => {
  const [banLogs, setBanLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockBanLogs = [
      {
        id: 1,
        bannedUser: {
          id: 3,
          name: 'Mike Johnson',
          email: 'mike.johnson@example.com',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
        },
        banDuration: '7 days',
        banType: 'temporary',
        reason: 'Posted inappropriate content that violated community guidelines',
        adminPerformed: {
          id: 101,
          name: 'Admin John',
          email: 'admin.john@artfolio.com'
        },
        banDate: '2024-08-01T10:30:00Z',
        endDate: '2024-08-08T10:30:00Z',
        actionType: 'ban',
        reportId: 1,
        severity: 'high',
        status: 'active'
      },
      {
        id: 2,
        bannedUser: {
          id: 6,
          name: 'Tom Wilson',
          email: 'tom.wilson@example.com',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
        },
        banDuration: 'Permanent',
        banType: 'permanent',
        reason: 'Repeated harassment of other users and spam behavior',
        adminPerformed: {
          id: 102,
          name: 'Admin Sarah',
          email: 'admin.sarah@artfolio.com'
        },
        banDate: '2024-07-20T14:15:00Z',
        endDate: null,
        actionType: 'ban',
        reportId: 5,
        severity: 'critical',
        status: 'active'
      },
      {
        id: 3,
        bannedUser: {
          id: 7,
          name: 'Lisa Davis',
          email: 'lisa.davis@example.com',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
        },
        banDuration: '7 days',
        banType: 'temporary',
        reason: 'Spam messages and promotional content',
        adminPerformed: {
          id: 103,
          name: 'Admin Mike',
          email: 'admin.mike@artfolio.com'
        },
        banDate: '2024-07-25T09:20:00Z',
        endDate: '2024-08-01T09:20:00Z',
        actionType: 'ban',
        reportId: 3,
        severity: 'medium',
        status: 'completed'
      },
      {
        id: 4,
        bannedUser: {
          id: 7,
          name: 'Lisa Davis',
          email: 'lisa.davis@example.com',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
        },
        banDuration: '7 days',
        banType: 'temporary',
        reason: 'Early unban due to appeal',
        adminPerformed: {
          id: 101,
          name: 'Admin John',
          email: 'admin.john@artfolio.com'
        },
        banDate: '2024-08-01T16:45:00Z',
        endDate: null,
        actionType: 'unban',
        reportId: null,
        severity: 'low',
        status: 'completed',
        originalBanId: 3
      },
      {
        id: 5,
        bannedUser: {
          id: 8,
          name: 'Chris Brown',
          email: 'chris.brown@example.com',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
        },
        banDuration: '3 days',
        banType: 'temporary',
        reason: 'Violation of community standards - inappropriate comments',
        adminPerformed: {
          id: 102,
          name: 'Admin Sarah',
          email: 'admin.sarah@artfolio.com'
        },
        banDate: '2024-08-05T11:00:00Z',
        endDate: '2024-08-08T11:00:00Z',
        actionType: 'ban',
        reportId: 7,
        severity: 'medium',
        status: 'active'
      }
    ];
    
    setTimeout(() => {
      setBanLogs(mockBanLogs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredLogs = banLogs.filter(log => {
    const matchesSearch = 
      log.bannedUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.adminPerformed.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || log.actionType === filterType;

    const matchesDate = (() => {
      if (dateFilter === 'all') return true;
      
      const logDate = new Date(log.banDate);
      const now = new Date();
      
      switch (dateFilter) {
        case 'today':
          return logDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return logDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return logDate >= monthAgo;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesType && matchesDate;
  });

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionBadge = (actionType) => {
    const actionStyles = {
      ban: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      unban: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    };

    return (
      <span className={cn(
        'px-2 py-1 rounded-full text-xs font-medium',
        actionStyles[actionType] || actionStyles.ban
      )}>
        {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
      </span>
    );
  };

 
;

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      completed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
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

  const exportLogs = () => {
    try {
      if (filteredLogs.length === 0) {
        toast.warning('No logs available to export');
        return;
      }

      const csvContent = [
        ['Date & Time', 'Banned User', 'Action Type', 'Ban Duration', 'Ban Reason', 'Banned By', 'Severity', 'Status'].join(','),
        ...filteredLogs.map(log => [
          formatDateTime(log.banDate),
          log.bannedUser.name,
          log.actionType,
          log.banDuration,
          `"${log.reason}"`,
          log.adminPerformed.name,
         
          log.status
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ban-logs-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast.success(`Ban logs exported successfully (${filteredLogs.length} records)`);
    } catch (error) {
      toast.error('Failed to export ban logs. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6">
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Ban Logs</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Complete audit trail of all ban actions</p>
          </div>
          <button
            onClick={exportLogs}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base self-start"
          >
            <Download className="size-4" />
            <span className="hidden sm:inline">Export Logs</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <StatCard
            title="Total Ban Actions"
            value={banLogs.length}
            icon={FileText}
            color="purple"
          />
          <StatCard
            title="Active Bans"
            value={banLogs.filter(log => log.status === 'active').length}
            icon={Activity}
            color="orange"
          />
          <StatCard
            title="Resolved (Finished)"
            value={banLogs.filter(log => log.status === 'completed').length}
            icon={CheckCircle}
            color="green"
          />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
            <input
              type="text"
              placeholder="Search logs by user, admin, or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-2 text-sm sm:text-base bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 sm:gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 sm:px-4 py-2.5 sm:py-2 text-xs sm:text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-0 flex-1 sm:flex-initial"
            >
              <option value="all">All Actions</option>
              <option value="ban">Bans Only</option>
              <option value="unban">Unbans Only</option>
            </select>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 sm:px-4 py-2.5 sm:py-2 text-xs sm:text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-0 flex-1 sm:flex-initial"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ban Logs Table */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm hidden lg:table-cell">Date & Time</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm">User</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm">Action</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm hidden md:table-cell">Duration</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm hidden lg:table-cell">Admin</th>
                
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm hidden sm:table-cell">Status</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-muted-foreground hidden lg:table-cell">
                    {formatDateTime(log.banDate)}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="size-6 sm:size-8 flex-shrink-0">
                         <AvatarImage src={log.bannedUser.avatar} alt={log.bannedUser.name} />
                         <AvatarFallback>{log.bannedUser.name.charAt(0)}</AvatarFallback>
                       </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-foreground text-sm sm:text-base truncate">{log.bannedUser.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{log.bannedUser.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    {getActionBadge(log.actionType)}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-foreground font-medium hidden md:table-cell">
                    {log.banDuration}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-muted-foreground hidden lg:table-cell">
                    {log.adminPerformed.name}
                  </td>
                
                  <td className="py-3 sm:py-4 px-2 sm:px-4 hidden sm:table-cell">
                    {getStatusBadge(log.status)}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="p-1.5 sm:p-2 hover:bg-purple-800 bg-purple-600 rounded-lg transition-colors text-white text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-1.5"
                      title="View Details"
                    >
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">View</span>
                        <Info className='text-white size-3 sm:size-4' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Results */}
      {filteredLogs.length === 0 && (
        <div className="text-center py-12">
          <Shield className="size-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No logs found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Log Details Modal */}
      <BanDetailsModal 
        isOpen={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        banData={selectedLog ? {
          ...selectedLog,
          name: selectedLog.bannedUser?.name,
          email: selectedLog.bannedUser?.email,
          banStartDate: selectedLog.banDate,
          banEndDate: selectedLog.endDate,
          bannedBy: selectedLog.adminPerformed?.name,
          banReason: selectedLog.reason
        } : null}
        isBlacklistView={false}
      />
    </div>
  );
};

export default BanLogs;
