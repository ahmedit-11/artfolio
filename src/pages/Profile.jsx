import React from "react";
import { useScrollToTop } from "../utils/scrollToTop";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, LinkIcon, MapPin, ExternalLink, Edit, MessageCircle, UserPlus, UserMinus, Settings, Share2, MoreHorizontal, Users, Heart, Eye, Clock,Twitter,Facebook,Linkedin,Github,Instagram,Globe,Plus,Trash2,Loader2,Edit3 } from 'lucide-react';
import BioWithLinks from '../components/BioWithLinks';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserThunk } from "@/store/currentUser/thunk/getCurrentUserThunk";
import { getUserPortfoliosThunk } from "@/store/userPortfolios/thunk/getUserPortfoliosThunk";
import { deletePortfolioThunk } from "@/store/deletePortfolio/thunk/deletePortfolioThunk";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getProfileImageUrl, getPortfolioImageUrl } from "@/utils/imageUtils";
import PortfolioCard from "@/components/PortfolioCard";
import ConfirmDialog from "@/components/ConfirmDialog"




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
  
  const { currentUser, error, loading } = useSelector(state => state.currentUser);
  const { data: userPortfolios, loading: portfoliosLoading, error: portfoliosError } = useSelector(state => state.userPortfolios);
  const { loading: deleteLoading } = useSelector(state => state.deletePortfolio);
  
  // State for confirm dialog
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [portfolioToDelete, setPortfolioToDelete] = useState(null);

  useEffect(() => {
    dispatch(getCurrentUserThunk());
  }, [dispatch])

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getUserPortfoliosThunk(currentUser.id));
    }
  }, [dispatch, currentUser?.id])

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
        dispatch(getUserPortfoliosThunk(currentUser.id));
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
  if (loading) {
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
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-500 mb-4">Error loading profile: {typeof error === 'string' ? error : 'Something went wrong'}</p>
          <Button onClick={() => dispatch(getCurrentUserThunk())}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  // Show no data state
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">No user data found</p>
        </div>
      </div>
    );
  }

  // Safely destructure currentUser data
  const { name, email, profile_picture, created_at, bio } = currentUser || {};
  
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

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-6">
                <ProfileStats label="Followers" value={followers} />
                <ProfileStats label="Following" value={following} />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                {currentUser ? (
                  <>
                    <Button variant="outline" className="space-x-2" onClick={() => navigate('/settings/profile')}>
                      <Edit className="size-4" />
                      <span>Edit Profile</span>
                    </Button>
                    <Button variant="default" className="space-x-2" onClick={() => navigate('/create')}>
                      <Plus className="size-4" />
                      <span>New Portfolio</span>
                    </Button>
                  </>
                ) : (
                  <Button variant="default">
                    Follow
                  </Button>
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
            <h2 className="text-2xl font-bold">My Portfolios</h2>
          
          </div>
          
          {portfoliosLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-6 animate-spin text-purple-600" />
              <span className="ml-2">Loading portfolios...</span>
            </div>
          ) : portfoliosError ? (
            <div className="text-center py-12 bg-card rounded-lg">
              <p className="text-lg text-red-500 mb-4">Error loading portfolios: {portfoliosError}</p>
              <Button onClick={() => dispatch(getUserPortfoliosThunk(currentUser?.id))}>
                Try Again
              </Button>
            </div>
          ) : userPortfolios && Array.isArray(userPortfolios) && userPortfolios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in animation-delay-1200">
              {userPortfolios
                .filter(portfolio => portfolio.user_id === currentUser?.id || portfolio.user?.id === currentUser?.id)
                .map((portfolio) => (
                <div key={portfolio.id} className="relative group">
                  <PortfolioCard
                    image={getPortfolioImageUrl(portfolio.media?.[0]?.file_path) || '/placeholder.svg'}
                    title={portfolio.title}
                    creator={name}
                    creatorImage={fullProfileImageUrl}
                    likes={portfolio.likes_count || 0}
                    comments={portfolio.comments_count || 0}
                    tags={portfolio.tags?.map(tag => tag.name) || []}
                    initialLikes={portfolio.likes_count || 0}
                  />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/edit/${portfolio.id}`)}
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
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg animate-fade-in animation-delay-1350">
              <p className="text-lg text-muted-foreground mb-4">
                No portfolios created yet.
              </p>
              <Button onClick={() => navigate('/create')}>
                <Plus className="size-4 mr-2" />
                Create Your First Portfolio
              </Button>
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