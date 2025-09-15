import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Users, Heart, Briefcase, Loader2 } from "lucide-react";
import { getFollowingCountThunk } from "../../../store/social/thunk/getFollowingCountThunk";
import { getFollowersCountThunk } from "../../../store/social/thunk/getFollowersCountThunk";
import Cookies from "js-cookie";

const ProfileStatsEnhanced = ({ userId, portfoliosCount = 0 }) => {
  const dispatch = useDispatch();
  const { followingCount, followersCount, loadingCounts, countsLoaded, currentUserId } = useSelector(state => state.social);
  const isAuthenticated = !!Cookies.get('token');

  useEffect(() => {
    if (userId && (!countsLoaded || currentUserId !== userId)) {
      dispatch(getFollowingCountThunk(userId));
      dispatch(getFollowersCountThunk(userId));
    }
  }, [dispatch, userId, countsLoaded, currentUserId]);

  const StatItem = ({ icon: Icon, label, count }) => (
    <div className="text-center ">
      <div className="flex items-center justify-center mb-2">
        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-1" />
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{count}</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  );

  // Show loading only on initial load
  if (loadingCounts && !countsLoaded) {
    return (
      <div className="bg-white dark:bg-primary-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400 mr-2" />
          <span className="text-gray-600 dark:text-gray-400">Loading stats...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-background rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="grid grid-cols-3 gap-6">
        <StatItem 
          icon={Users} 
          label="Followers" 
          count={followersCount} 
        />
        <StatItem 
          icon={Heart} 
          label="Following" 
          count={followingCount} 
        />
        <StatItem 
          icon={Briefcase} 
          label="Portfolios" 
          count={portfoliosCount} 
        />
      </div>
    </div>
  );
};

export default ProfileStatsEnhanced;
