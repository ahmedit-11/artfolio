// ReportsManagement.jsx
// Component for managing user reports and moderation actions
import React, { useState, useEffect } from 'react';
import { Search, Eye, Ban, Bell, Trash2, X, Calendar, User, Flag, Settings, CheckCircle, Zap, CircleX, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';
import StatCard from './StatCard';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import {ToastContainer} from "react-toastify"
import { getAllReports } from '@/store/reportt/thunk/getAllReports';
import axios from 'axios';
import Cookies from 'js-cookie';
const ReportsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [actionModal, setActionModal] = useState(null);
  const [banDuration, setBanDuration] = useState('3');
  const [banReason, setBanReason] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [takeActionModal, setTakeActionModal] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [actionStep, setActionStep] = useState('select'); // 'select', 'notify', 'finish'
  const [actionReason, setActionReason] = useState('');
  const [userAlert, setUserAlert] = useState('');
  const dispatch = useDispatch();
  const { reports = [] } = useSelector(state => state.reports);
const token =Cookies.get('token')
  useEffect(() => {
    dispatch(getAllReports())
      .unwrap()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  const filteredReports = reports.filter(report =>
    report.reported_user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.reporter?.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      resolved: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      dismissed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    };

    return (
      <span className={cn(
        'px-2 py-1 rounded-full text-xs font-medium',
        statusStyles[status] || statusStyles.pending
      )}>
        {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
      </span>
    );
  };
  const handleTakeAction = (report) => {
    setTakeActionModal(report);
    setSelectedAction(null);
    setActionStep('select');
    setActionReason('');
    setUserAlert('');
  };

  const handleActionSelect = (action) => {
    setSelectedAction(action);
    if (action === 'dismiss') {
      setActionStep('finish');
    } else {
      setActionStep('notify');
    }
  };

  const handleNotifyStep = async () => {
    if (!actionReason.trim() || !userAlert.trim()) {
      toast.error('Please fill in both the reason and user alert message.');
      return;
    }
    // Just move to finish step, don't make API calls here
    setActionStep('finish');
  };

  const handleFinishAction = async () => {
    if (!takeActionModal) return;
  
    let toastMessage = '';
  
    try {
      switch (selectedAction) {
        case 'ban':
          if (!actionReason.trim() || !banDuration) {
            toast.error('Please provide both ban reason and duration');
            return;
          }
          
          await axios.post(`/admin/reports/${takeActionModal.id}/accept`, {
            ban_duration: parseInt(banDuration),
            ban_reason: actionReason
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          toastMessage = `User banned for ${banDuration} days`;
          break;
    
    
        case 'dismiss':
          await axios.post(`/admin/reports/${takeActionModal.id}/reject`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          toastMessage = 'Report dismissed';
          break;
    
        default:
          break;
      }
      
      toast.success(toastMessage);
      
      // إعادة تحميل التقارير بعد الإجراء
      dispatch(getAllReports());
    } catch (error) {
      if (error?.response?.status === 409) {
        toast.error('This report has already been processed by another admin.');
      } else {
        toast.error(error?.response?.data?.message || 'An error occurred');
      }
    } finally {
      // Reset modal state
      setTakeActionModal(null);
      setSelectedAction(null);
      setActionStep('select');
      setActionReason('');
      setUserAlert('');
      setBanDuration('3');
    }
  };

  const resetTakeActionModal = () => {
    setTakeActionModal(null);
    setSelectedAction(null);
    setActionStep('select');
    setActionReason('');
    setUserAlert('');
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
    <ToastContainer/>
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Reports Management</h2>
            <p className="text-sm sm:text-base text-muted-foreground">Review and moderate user reports</p>
          </div>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <StatCard
            title="Total Reports"
            value={reports.length}
            icon={AlertTriangle}
            color="orange"
          />
          <StatCard
            title="Pending Reports"
            value={reports.filter(r => r.status === 'pending').length}
            icon={Clock}
            color="orange"
          />
          <StatCard
            title="Resolved Reports"
            value={reports.filter(r => r.status === 'resolved').length}
            icon={CheckCircle2}
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
              placeholder="Search reports by user, reason, or reporter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-2 text-sm sm:text-base bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>
  
      {/* Reports Table */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm">Reported User</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm hidden md:table-cell">Reported By</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm">Reason</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm hidden lg:table-cell">Date</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm">Status</th>
                <th className="text-left py-3 px-2 sm:px-4 font-medium text-muted-foreground text-xs sm:text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="size-8 sm:size-10 flex-shrink-0">
                        <AvatarImage src={report.reported_user?.profile_picture} alt={report.reported_user?.name} />
                        <AvatarFallback>{report.reported_user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-foreground text-sm sm:text-base truncate">
                          {report.reported_user?.name}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground truncate">
                          ID: {report.reported_user_id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 hidden md:table-cell">
                    <div className="text-xs sm:text-sm text-foreground font-medium truncate">
                      {report.reporter?.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      ID: {report.reporter_id}
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <div className="text-xs sm:text-sm text-foreground font-medium truncate">
                      {report.reason}
                    </div>
                    <div className="text-xs text-muted-foreground truncate max-w-32 sm:max-w-48">
                      Type: {report.reportable_type}
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-muted-foreground hidden lg:table-cell">
                    {formatDate(report.created_at)}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    {getStatusBadge(report.status)}
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1 sm:gap-2">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="p-1.5 sm:p-2 hover:bg-blue-800 bg-blue-600 rounded-lg transition-colors text-white text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-1.5"
                        title="View Details"
                      >
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">View</span>
                        <Eye className="size-3 sm:size-4 text-white" />
                      </button>
                      {report.status === 'pending' && (
                        <button
                          onClick={() => handleTakeAction(report)}
                          className="p-1.5 sm:p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-white text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-1.5"
                          title="Take Action"
                        >
                          <span className="hidden sm:inline">Take Action</span>
                          <span className="sm:hidden">Action</span>
                          <Settings className="size-3 sm:size-4 text-white" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  
      {/* Report Details Modal */}
      {selectedReport && !actionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-foreground">Report Details</h3>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <CircleX className="size-5 hover:text-primary" />
                </button>
              </div>
  
              <div className="space-y-6">
                {/* Report Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Reported User</h4>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarImage src={selectedReport.reported_user?.profile_picture} alt={selectedReport.reported_user?.name} />
                        <AvatarFallback>{selectedReport.reported_user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{selectedReport.reported_user?.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {selectedReport.reported_user_id}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Reported By</h4>
                    <div className="text-foreground">{selectedReport.reporter?.name}</div>
                    <div className="text-sm text-muted-foreground">ID: {selectedReport.reporter_id}</div>
                  </div>
                </div>
  
                {/* Report Details */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Report Information</h4>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reason:</span>
                      <span className="text-foreground font-medium">{selectedReport.reason}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="text-foreground">{formatDate(selectedReport.created_at)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Content Type:</span>
                      <span className="text-foreground">{selectedReport.reportable_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      {getStatusBadge(selectedReport.status)}
                    </div>
                  </div>
                </div>
  
                {/* Reported Content Info */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Reported Content</h4>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-2">
                      Type: {selectedReport.reportable_type} (ID: {selectedReport.reportable_id})
                    </div>
                    {selectedReport.reportable && (
                      <div className="text-foreground space-y-2">
                        <div><span className="font-medium">Title:</span> {selectedReport.reportable.title}</div>
                        <div><span className="font-medium">Description:</span> {selectedReport.reportable.description}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Take Action Modal */}
      {takeActionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border shadow-lg max-w-md w-full mx-4">
            <div className="p-6">
              {/* Step 1: Select Action */}
              {actionStep === 'select' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-foreground">Take Action</h3>
                    <button
                      onClick={resetTakeActionModal}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <CircleX className="size-5 hover:text-primary" />
                    </button>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Choose an action for this report:
                  </p>
                  <div className="space-y-3">
                    <button

                      onClick={() => handleActionSelect('ban')}
                      className="w-full p-4 text-left border border-border rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-3"
                    >
                      <Ban className="size-5 text-red-600" />
                      <div>
                        <div className="font-medium text-foreground">Ban User</div>
                        <div className="text-sm text-muted-foreground">Temporarily or permanently ban the user</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleActionSelect('dismiss')}
                      className="w-full p-4 text-left border border-border rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-3"
                    >
                      <CircleX className="size-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-foreground">Dismiss Report</div>
                        <div className="text-sm text-muted-foreground">Mark report as false or unjustified</div>
                      </div>
                    </button>
                  </div>
                </>
              )}

              {/* Step 2: Notify User (for Ban and Delete actions) */}
              {actionStep === 'notify' && (selectedAction === 'ban' || selectedAction === 'delete') && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-foreground">
                      {selectedAction === 'ban' ? 'Ban User - Notify' : 'Delete Content - Notify'}
                    </h3>
                    <button
                      onClick={resetTakeActionModal}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <CircleX className="size-5 hover:text-primary" />
                    </button>
                  </div>
                  
                  {selectedAction === 'ban' && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Ban Duration
                      </label>
                      <select
                        value={banDuration}
                        onChange={(e) => setBanDuration(e.target.value)}
                        className="w-full p-2 border border-border rounded-lg bg-background text-foreground"
                      >
                        <option value="3">3 days</option>
                        <option value="7">7 days</option>
                        <option value="14">14 days</option>
                        <option value="30">30 days</option>
                        <option value="90">90 days</option>
                        <option value="365">1 year</option>
                      </select>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Reason for {selectedAction === 'ban' ? 'Ban' : 'Content Deletion'}
                      </label>
                      <textarea
                        value={actionReason}
                        onChange={(e) => setActionReason(e.target.value)}
                        placeholder={`Enter the reason for ${selectedAction === 'ban' ? 'banning this user' : 'deleting this content'}...`}
                        className="w-full p-2 border border-border rounded-lg bg-background text-foreground h-24 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Alert Message to User
                      </label>
                      <textarea
                        value={userAlert}
                        onChange={(e) => setUserAlert(e.target.value)}
                        placeholder="Enter the notification message that will be sent to the user..."
                        className="w-full p-2 border border-border rounded-lg bg-background text-foreground h-24 resize-none"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setActionStep('select')}
                      className="flex-1 bg-muted hover:bg-muted/50 text-foreground py-2 px-4 rounded-lg transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNotifyStep}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Finish Action */}
              {actionStep === 'finish' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-foreground">Confirm Action</h3>
                    <button
                      onClick={resetTakeActionModal}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <CircleX className="size-5 hover:text-primary" />
                    </button>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium text-foreground mb-2">Action Summary:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Action:</span>
                        <span className="text-foreground font-medium capitalize">
                          {selectedAction === 'ban' ? `Ban User (${banDuration} days)` : 
                           selectedAction === 'delete' ? 'Delete Content' : 'Dismiss Report'}
                        </span>
                      </div>
                      {selectedAction !== 'dismiss' && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Reason:</span>
                            <span className="text-foreground text-right max-w-48 truncate">{actionReason}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">User Alert:</span>
                            <span className="text-foreground text-right max-w-48 truncate">{userAlert}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleFinishAction}
                      className={`flex-1 py-2 px-4 rounded-lg transition-colors text-white flex items-center justify-center gap-2 ${
                        selectedAction === 'ban' ? 'bg-red-600 hover:bg-red-700' :
                        'bg-gray-600 hover:bg-gray-700'
                      }`}
                    >
                      <CheckCircle className="size-4" />
                      {selectedAction === 'ban' ? 'Ban User' : 'Dismiss Report'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
  
    </div>
  );
};

export default ReportsManagement;