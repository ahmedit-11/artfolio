// AdminPanel.jsx
// Main admin control panel component with navigation tabs
import React, { useState, useEffect } from 'react';
import { Users, Flag, Shield, FileText, AlertTriangle, ShieldOff, LogOut, Sun, Moon, Settings, Tag, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../lib/api';
import { toast } from 'react-toastify';
import UserManagement from './UserManagement';
import ReportsManagement from './ReportsManagement';
import BlacklistManagement from './BlacklistManagement';
// import BanLogs from './BanLogs';
import AccountManagement from './AccountManagement';
import CategoryManagement from './CategoryManagement';

import ConfirmDialog from '@/components/ConfirmDialog';
import PageTitle from '@/components/PageTitle'
const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check if user has a saved preference
    const saved = localStorage.getItem('admin-theme');
    if (saved) {
      return saved === 'dark';
    }
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply theme changes to document
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Save preference to localStorage
    localStorage.setItem('admin-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Handle theme toggle
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle logout
  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogout = async () => {
    setShowLogoutDialog(false);
    setIsLoggingOut(true);
    try {
      await authAPI.logout();
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.success("Logged out successfully!");
    } finally {
      setIsLoggingOut(false);
      navigate("/signin");
    }
  };

  const tabs = [
    { id: 'users', label: 'User Management', icon: Users,color:"#998fa3", component: UserManagement },
    { id: 'categories', label: 'Categories', icon: Tag,color:"#8B5CF6", component: CategoryManagement },
    // { id: 'tags', label: 'Tags', icon: Hash,color:"#10B981", component: TagManagement },
    { id: 'reports', label: 'Reports', icon: AlertTriangle,color:"orange", component: ReportsManagement },
    { id: 'blacklist', label: 'Blacklist', icon: ShieldOff,color:"red", component: BlacklistManagement },
    // { id: 'logs', label: 'Ban Logs', icon: FileText,color:"#998fa3", component: BanLogs },
    { id: 'account', label: 'Account Management', icon: Settings,color:"blue", component: AccountManagement },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-background">
   
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
     
        <div className="mb-6 lg:mb-8">
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4'>
            <div className='flex items-start'>
              <Shield className='text-primary size-8 sm:size-10 mr-2 flex-shrink-0'/>
              <div>
                <PageTitle > Admin Control Panel</PageTitle>
                
                <p className="text-sm sm:text-base text-muted-foreground">Manage users, reports, and moderation actions</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3 self-start">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
                title="Toggle theme"
              >
                {isDarkMode ? (
                  <Moon className="size-4 text-blue-500" />
                ) : (
                  <Sun className="size-4 text-yellow-500" />
                )}
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                  {isDarkMode ? 'Dark' : 'Light'}
                </span>
              </button>
              
           
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 bg-muted p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex flex-1 justify-center items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-md text-xs sm:text-sm border-gray-700 border font-medium transition-all duration-200",
                    activeTab === tab.id
                      ? "bg-background text-foreground border-primary border-2 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                >
                  <Icon className="size-4 flex-shrink-0" color={tab.color}/>
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Component */}
        <div className="bg-card rounded-lg border  border-border shadow-sm">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>

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

export default AdminPanel;
