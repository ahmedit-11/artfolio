import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Flag, 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  MoreHorizontal, 
  Send, 
  X,
  Download,
  Eye,
  Calendar,
  Clock,
  User,
  Camera,
  Palette,
  Monitor,
  Smartphone,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card } from "@/components/ui/card";
import { FaStar } from 'react-icons/fa';
import { useScrollToTop } from '../../utils/scrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfolioDetailsThunk } from "@/store/portfolioDetails/thunk/getPortfolioDetailsThunk";
import { getLikeStatusThunk } from "@/store/social/thunk/getLikeStatusThunk";
import { getRatingsThunk } from "@/store/ratings/thunk/getRatingsThunk";
import { getCurrentUserThunk } from "@/store/currentUser/thunk/getCurrentUserThunk";
import { getPortfolioMediaUrl, getProfileImageUrl } from '../../utils/mediaUtils';
import { cn } from "@/lib/utils";
import { reportAPI } from "@/lib/api";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import StarRating from "@/components/StarRating";
import Tag from "../../components/ui/tag";
import ImageGallery from "@/components/ImageGallery";
import VideoPlayer from "@/components/VideoPlayer";
import TextContent from "@/components/TextContent";
import AudioPlayer from "@/components/AudioPlayer";
import PageTitle from "@/components/PageTitle";
import CommentsModal from "@/components/CommentsModal";
import ReportModal from "@/components/ReportModal";
import LikeButton from "@/components/LikeButton";
import CommentButton from "@/components/CommentButton";


const PortfolioDetail = () => {
  useScrollToTop();
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // All state hooks must be declared at the top level
  const [isClosing, setIsClosing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { data: portfolio, loading, error } = useSelector(state => state.portfolioDetails);
  const { averageRating, ratingsCount } = useSelector(state => state.ratings);
  const { currentUser } = useSelector(state => state.currentUser);

  // Fetch portfolio data on component mount
  useEffect(() => {
    if (slug) {
      dispatch(getPortfolioDetailsThunk(slug));
    }
  }, [slug, dispatch]);

  // Fetch like status and ratings when portfolio loads
  useEffect(() => {
    if (portfolio?.slug) {
      dispatch(getLikeStatusThunk(portfolio.slug));
      dispatch(getRatingsThunk(portfolio.slug));
    }
  }, [portfolio?.slug, dispatch]);

  // Fetch current user data
  useEffect(() => {
    const token = Cookies.get("token");
    if (token && !currentUser) {
      dispatch(getCurrentUserThunk());
    }
  }, [dispatch, currentUser]);

  // Debug: Log portfolio data when it changes

  // Reset image index when portfolio changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [portfolio]);

  // navigate after fade-out
  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => navigate(-1), 300);
      return () => clearTimeout(timer);
    }
  }, [isClosing, navigate]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading portfolio: {error}</p>
          <Button onClick={() => dispatch(getPortfolioDetailsThunk(slug))}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Portfolio not found</p>
          <Button onClick={() => navigate('/')}>
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  // Image navigation is now handled by ImageGallery component


  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Portfolio link copied to clipboard!");
  };

  const handleReport = async (reportData) => {
    try {
      await reportAPI.reportPortfolio(portfolio.id, {
        reason: reportData.reason,
        reason_type: reportData.reasonType
      });
      setShowReportModal(false);
      toast.success("Portfolio reported successfully!");
    } catch (error) {
      console.error('Failed to report portfolio:', error);
      toast.error("Failed to report portfolio. Please try again.");
      throw error;
    }
  };

  // Handle creator click navigation
  const handleCreatorClick = () => {
    if (!portfolio?.user) return;
    
    // Check if this is the current user's portfolio
    const isOwnPortfolio = currentUser && currentUser.id === portfolio.user.id;
    
    if (isOwnPortfolio) {
      // Navigate to own profile
      navigate("/profile");
    } else {
      // Navigate to other user's profile
      navigate(`/profile/${portfolio.user.id}`);
    }
  };

  // Fullscreen gallery functionality is now handled by ImageGallery component

  const renderContent = () => {
    if (!portfolio.media || portfolio.media.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No media content available
        </div>
      );
    }

    // Group media by type
    const images = portfolio.media.filter(item => item.file_type?.startsWith('image/'));
    const videos = portfolio.media.filter(item => item.file_type?.startsWith('video/'));
    const audios = portfolio.media.filter(item => item.file_type?.startsWith('audio/'));
    const textFiles = portfolio.media.filter(item => 
      item.file_type?.startsWith('text/') || 
      item.file_type?.includes('pdf') ||
      item.file_type?.includes('document') ||
      item.file_type?.includes('msword') ||
      item.file_path?.endsWith('.txt') ||
      item.file_path?.endsWith('.md') ||
      item.file_path?.endsWith('.pdf') ||
      item.file_path?.endsWith('.docx')
    );

    return (
      <div className="space-y-6">
        {/* Images - Always show one image at full size with navigation */}
        {images.length > 0 && (
          <div className="space-y-4">
            {/* Main full-size image display */}
            <div className="w-full">
              <img
                src={getPortfolioMediaUrl(images[currentImageIndex].file_path)}
                alt={`${portfolio.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-auto max-h-[600px] object-cover rounded-lg shadow-lg"
              />
            </div>
            
            {/* Navigation and thumbnails for multiple images */}
            {images.length > 1 && (
              <div className="space-y-3">
                {/* Navigation buttons */}
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                    disabled={images.length <= 1}
                  >
                    ← Previous
                  </Button>
                  <span className="flex items-center px-3 text-sm text-muted-foreground">
                    {currentImageIndex + 1} of {images.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                    disabled={images.length <= 1}
                  >
                    Next →
                  </Button>
                </div>
                
                {/* Thumbnail navigation */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                        currentImageIndex === index
                          ? "border-purple-500 ring-2 ring-purple-200"
                          : "border-gray-200 hover:border-purple-300"
                      )}
                    >
                      <img
                        src={getPortfolioMediaUrl(image.file_path)}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Videos */}
        {videos.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Videos</h3>
            {videos.map((video, index) => (
              <VideoPlayer
                key={index}
                videoUrl={getPortfolioMediaUrl(video.file_path)}
                title={`${portfolio.title} - Video ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Audio */}
        {audios.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Audio</h3>
            {audios.map((audio, index) => (
              <AudioPlayer
                key={index}
                audioUrl={getPortfolioMediaUrl(audio.file_path)}
                title={`${portfolio.title} - Audio ${index + 1}`}
                artist={portfolio.user?.name || "Unknown Artist"}
                cover={images.length > 0 ? getPortfolioMediaUrl(images[0].file_path) : '/placeholder.svg'}
                showDownload={true}
              />
            ))}
          </div>
        )}

        {/* Text Files */}
        {textFiles.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Documents</h3>
            {textFiles.map((textFile, index) => {
              const fileName = textFile.file_path?.split('/').pop() || `Document ${index + 1}`;
              const fileExtension = fileName.split('.').pop()?.toLowerCase();
              const fileUrl = getPortfolioMediaUrl(textFile.file_path);
              
              // All files get the same simple treatment
              return (
                <Card key={index} className="p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{fileName}</p>
                        <p className="text-xs text-muted-foreground uppercase">
                          {fileExtension} document
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(fileUrl, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = fileUrl;
                          link.download = fileName;
                          link.click();
                        }}
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  };
  const handelTranslate = () => {
    if (!Cookies.get("token")) {
      navigate('/signIn')
    }
  }
  const token = Cookies.get("token")
  return (
    <div className={cn("min-h-screen bg-background", isClosing ? "animate-fade-out" : "animate-fade-in")}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b animate-fade-in animation-delay-150">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
             <Button
              variant="ghost"
              onClick={() => setIsClosing(true)}
              className="hover:bg-purple-100 dark:hover:bg-purple-900/20"
            >
              <ArrowLeft className="size-4 mr-2" />
              Back
            </Button>
            
            {/* Report Button - Only show if not viewing own portfolio */}
            {token && currentUser && currentUser.id !== portfolio.user?.id && (
              <Button
                variant="ghost"
                onClick={() => setShowReportModal(true)}
                className="text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
              >
                <Flag className="size-4 mr-2" />
                Report
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 py-8 animate-fade-in animation-delay-300">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in animation-delay-450">
            {/* Title and Creator */}
            <div className="animate-fade-in animation-delay-600">
              <PageTitle>
              {portfolio.title}
              </PageTitle>
             
              <div 
                className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
                onClick={handleCreatorClick}
              >
                <Avatar className="size-12">
                  <AvatarImage 
                    src={getProfileImageUrl(portfolio.user?.profile_picture)} 
                    alt={portfolio.user?.name}
                    onError={(e) => {
                      console.log('Avatar image failed to load:', portfolio.user?.profile_picture);
                      console.log('Generated URL:', getProfileImageUrl(portfolio.user?.profile_picture));
                    }}
                  />
                  <AvatarFallback>{portfolio.user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold hover:text-purple-600 transition-colors">{portfolio.user?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentUser && currentUser.id === portfolio.user?.id ? 'Your portfolio' : 'Portfolio creator'}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="animate-fade-in animation-delay-750">
              {renderContent()}
            </div>

            {/* Description */}
            <Card className="p-6 animate-fade-in animation-delay-900">
              <h2 className="text-xl font-semibold mb-4">About this Project</h2>
              <p className="text-muted-foreground">{portfolio.description}</p>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6 animate-fade-in animation-delay-1050">
            {/* Stats */}
            <Card className="p-6 animate-fade-in animation-delay-1200">
              <div className="" onClick={handelTranslate}>
                <h3 className="font-semibold mb-4">Stats</h3>
                <div className="flex flex-col gap-4  items-center justify-between">
                <div className="grid grid-cols-2 justify-center gap-4">

                  <LikeButton 
                    projectId={portfolio.slug}
                    likesCount={portfolio.likes_count || 0}
                  />
                  <CommentButton 
                    projectSlug={portfolio.slug}
                    commentsCount={portfolio.comments_count || 0}
                    onClick={() => setShowComments(true)}
                  />
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
                                <Calendar className="ssize-5 mx-auto mb-2 text-purple-600" />
    
                    <div className="font-semibold">{new Date(portfolio.created_at).toLocaleDateString('en-GB')}</div>
                    <div className="text-sm text-muted-foreground">Created At</div>
                  </div>
                  <div className="text-center items-center  align-center  p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
                    <Star className="size-5 mx-auto mb-2  text-purple-600" />
                    <div className="font-semibold">{averageRating || portfolio.average_rating || '0.0'}</div>
                    <div className="text-sm text-muted-foreground">Avg Rating</div>
                  </div>
                </div>
              </div>
              </div>
            </Card>

            {/* Rating */}
            <Card className="p-6 animate-fade-in animation-delay-1350">
              <h3 className="font-semibold mb-4">Rate this Project</h3>
              <StarRating projectSlug={portfolio.slug} />
            </Card>

            {/* Tags */}
            <Card className="p-6 animate-fade-in animation-delay-1400">
              <h3 className="font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {portfolio.tags?.map((tag) => (
                  <Tag key={tag.id || tag.name}>
                    {tag.name || tag}
                  </Tag>
                ))}
              </div>
            </Card>
          

           
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      <CommentsModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        portfolioSlug={portfolio.slug}
        portfolioTitle={portfolio.title}
      />

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        portfolioId={portfolio.id}
        portfolioTitle={portfolio.title}
        onSubmit={handleReport}
      />

      {/* Fullscreen functionality is now handled by ImageGallery component */}
    </div>
  );
};

export default PortfolioDetail; 