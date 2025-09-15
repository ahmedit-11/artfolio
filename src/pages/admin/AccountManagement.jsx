import React, { useState } from 'react';
import { User, LogOut, Shield, Key, Eye, EyeOff, Trash2 } from 'lucide-react';
import { authAPI } from '../../lib/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '@/components/ConfirmDialog';
import StatCard from './StatCard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from "js-cookie"
const AccountManagement = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const {user}=useSelector(state=>state.auth)
  console.log(user?.user)
const token=Cookies.get("token")
  
  // Logout Dialog State
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  // Delete Account Dialog State
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');


  // Handle logout
  const handleLogout = async () => {
    setShowLogoutDialog(false);
    setIsLoading(true);
    try {
      await authAPI.logout();
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.success("Logged out successfully!");
    } finally {
      setIsLoading(false);
      navigate("/signin");
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      toast.error("New passwords don't match");
      return;
    }

    if (passwordData.new_password.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    setPasswordLoading(true);
    try {
      const response = await axios.post('/change-password', {
        current_password: passwordData.current_password,
        new_password: passwordData.new_password,
        new_password_confirmation: passwordData.new_password_confirmation
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setPasswordData({
          current_password: '',
          new_password: '',
          new_password_confirmation: ''
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to change password";
      toast.error(errorMessage);
    } finally {
      setPasswordLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Handle delete account
  const handleDeleteAccount = async () => {
    setShowDeleteDialog(false);
    setDeleteLoading(true);
    
    try {
      const response = await axios.delete('/delete-account');
      
      if (response.data.success) {
        toast.success(response.data.message);
        // Clear all auth data and redirect
        Cookies.remove('token');
        localStorage.clear();
        navigate('/signin');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to delete account";
      toast.error(errorMessage);
    } finally {
      setDeleteLoading(false);
    }
  };


 
  const sections = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'security', label: 'Security', icon: Key }
  ];
  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Account Management</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your admin account settings and security
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
        <StatCard
          title="Account Status"
          value="Active"
          icon={Shield}
          theme="green"
        />
        <StatCard
          title="Account Type"
          value="Administrator"
          icon={User}
          theme="blue"
        />
     
      </div>

      {/* Section Navigation */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 bg-muted p-1 rounded-lg">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex flex-1 justify-center items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                <Icon className="size-4 flex-shrink-0" />
                <span className="truncate">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-background rounded-lg border border-border p-4 sm:p-6">
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Account Overview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-foreground font-medium">{user?.user?.name || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground font-medium">{user?.user?.email || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  <p className="text-foreground font-medium">{user?.user?.role}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Account ID</label>
                  <p className="text-foreground font-medium">{user?.user?.id || 'N/A'}</p>
                </div>
              
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-border">
              <h4 className="text-md font-medium text-foreground mb-4">Quick Actions</h4>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowLogoutDialog(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Section */}
        {activeSection === 'security' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
            
            {/* Change Password Form */}
            <div className="bg-muted/30 rounded-lg p-6 border border-border">
              <h4 className="text-md font-medium text-foreground mb-4 flex items-center gap-2">
                <Key className="size-4" />
                Change Password
              </h4>
              
              <form onSubmit={handlePasswordChange} className="space-y-4">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.current_password}
                      onChange={(e) => setPasswordData(prev => ({
                        ...prev,
                        current_password: e.target.value
                      }))}
                      className="w-full px-3 py-2 pr-10 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.current ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.new_password}
                      onChange={(e) => setPasswordData(prev => ({
                        ...prev,
                        new_password: e.target.value
                      }))}
                      className="w-full px-3 py-2 pr-10 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.new ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Must be at least 8 characters long
                  </p>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.new_password_confirmation}
                      onChange={(e) => setPasswordData(prev => ({
                        ...prev,
                        new_password_confirmation: e.target.value
                      }))}
                      className="w-full px-3 py-2 pr-10 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.confirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    {passwordLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Changing...
                      </>
                    ) : (
                      <>
                        <Key className="size-4" />
                        Change Password
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Delete Account Section */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
              <h4 className="text-md font-medium text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                <Trash2 className="size-4" />
                Danger Zone
              </h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-red-700 dark:text-red-400 mb-2">Delete Admin Account</h5>
                  <p className="text-sm text-red-600 dark:text-red-300 mb-4">
                    Permanently delete your admin account. This action cannot be undone and will only work if there are other admin accounts remaining.
                  </p>
                  <button
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={deleteLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors"
                  >
                    {deleteLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="size-4" />
                        Delete Account
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        title="Sign Out"
        message="Are you sure you want to sign out of your admin account?"
      />

      {/* Delete Account Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Admin Account"
        message="Are you sure you want to permanently delete your admin account? This action cannot be undone and will only work if there are other admin accounts remaining."
        confirmText="Delete Account"
        cancelText="Cancel"
        variant="danger"
      />

    </div>
  );
};

export default AccountManagement;
