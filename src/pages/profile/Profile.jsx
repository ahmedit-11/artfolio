import React from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, LinkIcon, MapPin, ExternalLink, Edit, MessageCircle, UserPlus, UserMinus, Settings, Share2, MoreHorizontal, Users, Heart, Eye, Clock,Twitter,Facebook,Linkedin,Github,Instagram,Globe,Plus,Trash2,Loader2,Edit3 } from 'lucide-react';
import BioWithLinks from '../../components/BioWithLinks';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserThunk } from "@/store/currentUser/thunk/getCurrentUserThunk";
import { getUserByIdThunk } from "@/store/users/thunk/getUserByIdThunk";
import { getUserPortfoliosThunk } from "@/store/userPortfolios/thunk/getUserPortfoliosThunk";
import { deletePortfolioThunk } from "@/store/deletePortfolio/thunk/deletePortfolioThunk";
import { resetSocialState } from "@/store/social/socialSlice";
import { getFollowStatusThunk } from "@/store/social/thunk/getFollowStatusThunk";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getProfileImageUrl, getPortfolioImageUrl } from "@/utils/mediaUtils";
import PortfolioCard from "@/components/PortfolioCard";
import ConfirmDialog from "@/components/ConfirmDialog";
import FollowButton from "./components/FollowButton";
import ProfileStatsEnhanced from "./components/ProfileStatsEnhanced";




const ProfileStats = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <span className="text-xl font-semibold">{value.toLocaleString()}</span>
    <span className="text-sm text-muted-foreground">{label}</span>
  </div>
);

const Profile = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams(); // Get userId from URL params
  
  const { currentUser, error: currentUserError, loading: currentUserLoading } = useSelector(state => state.currentUser);
  const { userById, userByIdLoading, userByIdError } = useSelector(state => state.users);
  const { data: userPortfolios, loading: portfoliosLoading, error: portfoliosError } = useSelector(state => state.userPortfolios);
  const { loading: deleteLoading } = useSelector(state => state.deletePortfolio);
  
  // State for confirm dialog
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [portfolioToDelete, setPortfolioToDelete] = useState(null);

  // Determine if we're viewing current user's profile or another user's profile
  const isOwnProfile = !userId;
  const profileUserId = userId || currentUser?.id;
  
  // Get the appropriate user data
  const profileUser = isOwnProfile ? currentUser : userById[userId];
  const profileLoading = isOwnProfile ? currentUserLoading : userByIdLoading[userId];
  const profileError = isOwnProfile ? currentUserError : userByIdError[userId];

  useEffect(() => {
    // Always fetch current user data for authentication and comparison
    dispatch(getCurrentUserThunk());
  }, [dispatch]);

  useEffect(() => {
    if (userId && userId !== currentUser?.id) {
      // Fetch other user's data if viewing someone else's profile
      dispatch(getUserByIdThunk(userId));
    }
  }, [dispatch, userId, currentUser?.id]);

  useEffect(() => {
    if (profileUserId) {
      dispatch(getUserPortfoliosThunk(profileUserId));
    }
  }, [dispatch, profileUserId]);

  // Reset social state and fetch follow status when viewing a different user
  useEffect(() => {
    if (userId) {
      // Reset social state to prevent data from previous user
      dispatch(resetSocialState());
      // Fetch follow status for this specific user
      dispatch(getFollowStatusThunk(userId));
    }
  }, [dispatch, userId]);

  // Handle portfolio deletion
  const handleDeletePortfolio = (portfolioId) => {
    setPortfolioToDelete(portfolioId);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (portfolioToDelete) {
      try {
        await dispatch(deletePortfolioThunk(portfolioToDelete));
        toast.success('Portfolio deleted successfully!');
        // Refresh portfolios after deletion
        dispatch(getUserPortfoliosThunk(profileUserId));
      } catch (error) {
        console.error('Failed to delete portfolio:', error);
        toast.error('Failed to delete portfolio. Please try again.');
      } finally {
        setShowConfirmDialog(false);
        setPortfolioToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setPortfolioToDelete(null);
  };
  
  // Show loading state
  if (profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="size-6 animate-spin text-purple-600" />
          <span className="text-lg">Loading profile...</span>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (profileError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-500 mb-4">Error loading profile: {typeof profileError === 'string' ? profileError : 'Something went wrong'}</p>
          <Button onClick={() => {
            if (isOwnProfile) {
              dispatch(getCurrentUserThunk());
            } else {
              dispatch(getUserByIdThunk(userId));
            }
          }}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  // Show no data state
  if (!profileUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">No user data found</p>
        </div>
      </div>
    );
  }

  // Safely destructure profile user data
  const { name, email, profile_picture, created_at, bio } = profileUser || {};
  
  // Convert relative URL to full URL
  const fullProfileImageUrl = getProfileImageUrl(profile_picture);
  
 
  // Format join date
  const joinedDate = created_at ? new Date(created_at).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  }) : null;
  
  // Mock data for missing fields (will be replaced with real data later)
  const followers = 0;
  const following = 0;
  const portfolios = [];
  

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Header Section */}
      <div className="w-full bg-gradient-to-b from-purple-100/20 to-background dark:from-purple-900/10 pt-16 pb-8 animate-fade-in animation-delay-150">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 animate-fade-in animation-delay-300">
            {/* Avatar */}
            <Avatar className="size-32 border-4 border-background shadow-lg animate-fade-in animation-delay-450">
              <AvatarImage 
                src={fullProfileImageUrl} 
                alt={name}
                className="object-cover object-center"
                style={{ imageRendering: 'crisp-edges' }}
              />
              <AvatarFallback>{name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left animate-fade-in animation-delay-600">
              <h1 className="text-3xl font-bold">{name || 'Unknown User'}</h1>        
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4 text-sm text-muted-foreground">
                {joinedDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="size-4" />
                    <span>Joined {joinedDate}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap  flex-1 items-center justify-center md:justify-start gap-6 mb-6">
                <ProfileStatsEnhanced 
                  userId={profileUserId} 
                  portfoliosCount={userPortfolios ? userPortfolios.length : 0}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                {isOwnProfile ? (
                  <>
                    <Button variant="outline" className="space-x-2 " onClick={() => navigate('/settings/profile')}>
                      <Edit className="size-4" />
                      <span>Edit Profile</span>
                    </Button>
                    <Button variant="default" className="space-x-2 bg-purple-600 hover:bg-purple-700 hover:text-white" onClick={() => navigate('/create')}>
                      <Plus className="size-4" />
                      <span>New Portfolio</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <FollowButton userId={profileUserId} />
                    <Button variant="outline" className="space-x-2" onClick={() => navigate(`/chat?userId=${profileUserId}&userName=${encodeURIComponent(name || 'User')}`)}>
                      <MessageCircle className="size-4" />
                      <span>Message</span>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio & Social Links */}
      <div className="container max-w-4xl mx-auto px-4 py-8 animate-fade-in animation-delay-750">
        <div className="bg-card rounded-lg p-6 shadow-sm animate-fade-in animation-delay-900">
          <BioWithLinks bio={bio} className="text-lg mb-6 whitespace-pre-wrap" />
          
         
          
         
        </div>

        {/* Portfolios Section */}
        <div className="mt-12 animate-fade-in animation-delay-1050">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{isOwnProfile ? 'My Portfolios' : `${name}'s Portfolios`}</h2>
          
          </div>
          
          {portfoliosLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-6 animate-spin text-purple-600" />
              <span className="ml-2">Loading portfolios...</span>
            </div>
          ) : portfoliosError ? (
            <div className="text-center py-12 bg-card rounded-lg">
              <p className="text-lg text-red-500 mb-4">Error loading portfolios: {portfoliosError}</p>
              <Button onClick={() => dispatch(getUserPortfoliosThunk(profileUserId))}>
                Try Again
              </Button>
            </div>
          ) : userPortfolios && Array.isArray(userPortfolios) && userPortfolios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in animation-delay-1200">
              {userPortfolios.map((portfolio) => (
                <div key={portfolio.id} className="relative group">
<PortfolioCard
                    portfolio={{
                      ...portfolio,
                      user: {
                        id: profileUser.id,
                        name: profileUser.name,
                        profile_picture: profileUser.profile_picture
                      }
                    }}
                  />
                  {isOwnProfile && (
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate(`/edit-portfolio/${portfolio.id}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Edit3 className="size-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePortfolio(portfolio.id)}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Trash2 className="size-4" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg animate-fade-in animation-delay-1350">
              <p className="text-lg text-muted-foreground mb-4">
                {isOwnProfile ? 'No portfolios created yet.' : `${name} hasn't created any portfolios yet.`}
              </p>
              {isOwnProfile && (
                <Button onClick={() => navigate('/create')}>
                  <Plus className="size-4 mr-2" />
                  Create Your First Portfolio
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Portfolio"
        message="Are you sure you want to delete this portfolio? This action cannot be undone."
      />
    </div>
  );
};

export default Profile;