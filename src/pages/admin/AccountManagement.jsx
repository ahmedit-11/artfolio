import React, { useState } from 'react';
import { User, LogOut, Shield } from 'lucide-react';
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


 
  const sections = [
    { id: 'overview', label: 'Overview', icon: User }
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


      </div>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        title="Sign Out"
        message="Are you sure you want to sign out of your admin account?"
      />

    </div>
  );
};

export default AccountManagement;
