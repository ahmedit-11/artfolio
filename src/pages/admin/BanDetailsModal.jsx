// BanDetailsModal.jsx
// Unified component for displaying ban details in both BanLogs and BlacklistManagement
import React from 'react';
import { AlertTriangle, Unlock, Calendar, User, Shield, Clock,CircleX } from 'lucide-react';
import { cn } from '@/lib/utils';

const BanDetailsModal = ({ 
  isOpen, 
  onClose, 
  banData, 
  onUnbanUser,
  isBlacklistView = false 
}) => {
  if (!isOpen || !banData) return null;

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

  const getRemainingTime = (endDate) => {
    if (!endDate) return 'N/A';
    
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-background border border-border rounded-xl shadow-2xl max-w-md w-full max-h-[96vh] ">
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-foreground">
              {isBlacklistView ? 'Ban Details' : 'Action Details'}
            </h3>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <CircleX className="size-6 hover:purple-600" />
            </button>
          </div>

          <div className="space-y-4">
            {/* User Information */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">User Information</h4>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                    <User className="size-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{banData.name}</div>
                    <div className="text-sm text-muted-foreground">{banData.email}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ban Information */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Ban Information</h4>
              <div className="bg-muted/50 rounded-lg p-3 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ban Type:</span>
                  <span className="text-foreground font-medium capitalize">{banData.banType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="text-foreground">{banData.banDuration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Date:</span>
                  <span className="text-foreground">{formatDateTime(banData.banStartDate || banData.banDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">End Date:</span>
                  <span className="text-foreground">
                    {banData.banType === 'permanent' ? 'Never' : 
                     banData.banEndDate || banData.endDate ? 
                     formatDateTime(banData.banEndDate || banData.endDate) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {isBlacklistView ? 'Banned By:' : 'Admin:'}
                  </span>
                  <span className="text-foreground">
                    {banData.bannedBy || banData.adminPerformed?.name || 'N/A'}
                  </span>
                </div>
                {banData.reportId && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Report ID:</span>
                    <span className="text-foreground">#{banData.reportId || banData.originalReportId}</span>
                  </div>
                )}
                {isBlacklistView && banData.isActive && banData.banType !== 'permanent' && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Remaining:</span>
                    <span className="text-foreground font-medium">
                      {getRemainingTime(banData.banEndDate)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Ban Reason */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">Reason</h4>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="size-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-red-800 dark:text-red-400">
                    {banData.banReason || banData.reason}
                  </p>
                </div>
              </div>
            </div>

            {/* Unban Information (if applicable) */}
            {(!banData.isActive || banData.actionType === 'unban') && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">Unban Information</h4>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-green-800 dark:text-green-400">Unbanned Date:</span>
                    <span className="text-green-800 dark:text-green-400 font-medium">
                      {formatDateTime(banData.unbannedDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-800 dark:text-green-400">Unbanned By:</span>
                    <span className="text-green-800 dark:text-green-400 font-medium">
                      {banData.unbannedBy || banData.adminPerformed?.name || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button (for blacklist view) */}
            {isBlacklistView && banData.isActive && (
              <div className="flex justify-end">
                <button
                  onClick={() => onUnbanUser(banData.id)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Unlock className="size-4" />
                  Unban User
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanDetailsModal;
