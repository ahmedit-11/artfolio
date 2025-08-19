import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, ArrowLeft, ExternalLink } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";


import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CommentsModal from "@/components/CommentsModal";
import ReportModal from "@/components/ReportModal";
import PageTitle from "@/components/PageTitle";
import { useScrollToTop } from "@/utils/scrollToTop";
import StarRating from "@/components/StarRating";
import Tag from "../components/ui/tag";
import Cookies from "js-cookie";
import { reportAPI } from "@/lib/api";
import  ImageGallery  from "@/components/ImageGallery";
import  VideoPlayer from "@/components/VideoPlayer";
import  TextContent  from "@/components/TextContent";
import AudioPlayer  from "@/components/AudioPlayer";
import {
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
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  MoreHorizontal,

  Flag,
} from "lucide-react";

import { cn } from "@/lib/utils";
// import CommentsModal from "@/components/CommentsModal";
// import PageTitle from "../components/PageTitle";
// Mock data for different portfolio types
const mockPortfolios = {
  images: {
    id: 1,
    title: "Minimalist UI Design Collection",
    creator: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      bio: "UI/UX Designer & Digital Artist",
    },
    createdAt: "2024-03-15",
    updatedAt: "2024-03-20",
    description: "A collection of minimalist UI designs exploring clean aesthetics and user-friendly interfaces. This project showcases various mobile and web applications with a focus on simplicity and functionality.",
    tags: ["UI/UX", "Minimalism", "Mobile Design", "Web Design"],
    stats: {
      views: 1234,
      likes: 248,
      comments: 36,
      shares: 89,
      rating: "5.0",
    },
    content: {
      type: "images",
      items: [
        {
          id: 1,
          type: "image",
          url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 2,
          type: "image",
          url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 3,
          type: "image",
          url: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 4,
          type: "image",
          url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 5,
          type: "image",
          url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 6,
          type: "image",
          url: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 7,
          type: "image",
          url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
        },
        {
          id: 8,
          type: "image",
          url: "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    comments: [
      {
        id: 1,
        user: {
          name: "Sarah Wilson",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
        },
        content: "Love the minimalist approach! The color scheme is perfect.",
        createdAt: "2024-03-19",
      },
      {
        id: 2,
        user: {
          name: "Mike Chen",
          avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80",
        },
        content: "The dashboard design is exactly what I was looking for. Great inspiration!",
        createdAt: "2024-03-18",
      },
    ],
  },
  video: {
    id: 2,
    title: "Motion Design Showreel 2024",
    creator: {
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80",
      bio: "Motion Designer & Animator",
    },
    createdAt: "2024-03-10",
    updatedAt: "2024-03-15",
    description: "A showcase of my latest motion design work, featuring animations for various brands and personal projects. This collection demonstrates my approach to storytelling through motion and visual effects.",
    tags: ["Motion Design", "Animation", "Visual Effects", "Showreel"],
    stats: {
      views: 2156,
      likes: 342,
      comments: 45,
      shares: 123,
      rating: "3.0",
    },
    content: {
      type: "video",
      url: "https://example.com/video.mp4",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    },
    comments: [
      {
        id: 1,
        user: {
          name: "David Kim",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        },
        content: "The transitions are so smooth! What software do you use?",
        createdAt: "2024-03-14",
      },
    ],
  },
  audio: {
    id: 3,
    title: "Ambient Soundscapes",
    creator: {
      name: "Sophie Garcia",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      bio: "Sound Designer & Composer",
    },
    createdAt: "2024-03-05",
    updatedAt: "2024-03-12",
    description: "A collection of ambient soundscapes created for meditation and relaxation. Each track is carefully crafted to create a peaceful atmosphere and help listeners find their inner calm.",
    tags: ["Sound Design", "Ambient", "Meditation", "Music"],
    stats: {
      views: 1876,
      likes: 289,
      comments: 32,
      shares: 76,
      rating: "4.0",
    },
    content: {
      type: "audio",
      url: "https://example.com/audio.mp3",
      duration: "45:30",
    },
    comments: [
      {
        id: 1,
        user: {
          name: "Emma Thompson",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        },
        content: "This is exactly what I needed for my morning meditation routine. Beautiful work!",
        createdAt: "2024-03-11",
      },
    ],
  },
  text: {
    id: 4,
    title: "The Art of Digital Storytelling",
    creator: {
      name: "Daniel Lee",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80",
      bio: "Writer & Digital Content Creator",
    },
    createdAt: "2024-03-01",
    updatedAt: "2024-03-08",
    description: "An exploration of how digital platforms are transforming the way we tell stories. This collection of essays examines the intersection of traditional storytelling and modern technology.",
    tags: ["Writing", "Digital Media", "Storytelling", "Content Creation"],
    stats: {
      views: 3245,
      likes: 412,
      comments: 67,
      shares: 145,
      rating: "4.5",
    },
    content: {
      type: "text",
      sections: [
        {
          title: "Chapter 1: The Digital Revolution",
          content: "The way we consume and create stories has undergone a dramatic transformation in the digital age. Traditional narrative structures are being reimagined through interactive media, social platforms, and immersive technologies...",
        },
        {
          title: "Chapter 2: New Forms of Expression",
          content: "Digital platforms have given rise to entirely new forms of storytelling. From micro-blogging to interactive fiction, creators are finding innovative ways to engage their audiences...",
        },
      ],
    },
    comments: [
      {
        id: 1,
        user: {
          name: "James Wilson",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        },
        content: "Your analysis of digital storytelling is spot on. Would love to see more content like this!",
        createdAt: "2024-03-07",
      },
    ],
  },
};

const PortfolioDetail = () => {
  const [isClosing, setIsClosing] = useState(false);

  // Jump to top instantly on mount
  useScrollToTop();

  // navigate after fade-out
  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => navigate(-1), 300); // duration matches CSS
      return () => clearTimeout(timer);
    }
  }, [isClosing]);

  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);

  // Get portfolio based on URL parameter or default to images
  const { id } = useParams();
  const getPortfolio = () => {
    switch (id) {
      case '2':
        return mockPortfolios.video;
      case '3':
        return mockPortfolios.audio;
      case '4':
        return mockPortfolios.text;
      default:
        return mockPortfolios.images;
    }
  };
  const portfolio = getPortfolio();

  // Initialize likes from portfolio data
  React.useEffect(() => {
    setLikes(portfolio.stats.likes);
  }, [portfolio.stats.likes]);

  // Image navigation is now handled by ImageGallery component

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could add a toast notification here
  };

  const handleReport = async (reportData) => {
    try {
      await reportAPI.reportPortfolio(portfolio.id, {
        reason: reportData.reason,
        reason_type: reportData.reasonType
      });
      // You could add a success toast notification here
      console.log('Portfolio reported successfully');
    } catch (error) {
      console.error('Failed to report portfolio:', error);
      // You could add an error toast notification here
      throw error;
    }
  };

  // Fullscreen gallery functionality is now handled by ImageGallery component

  const renderContent = () => {
    switch (portfolio.content.type) {
      case "images":
        const imageUrls = portfolio.content.items.map(item => item.url);
        return (
          <ImageGallery
            images={imageUrls}
            title={portfolio.title}
            showThumbnails={true}
            showDownloadButton={true}
            aspectRatio="aspect-video"
          />
        );
      case "video":
        return (
          <VideoPlayer
            videoUrl={portfolio.content.url}
            title={portfolio.title}
          />
        );
      case "audio":
        return (
          <AudioPlayer
            audioUrl={portfolio.content.url}
            title={portfolio.title}
            artist={portfolio.creator?.name || "Unknown Artist"}
            cover={portfolio.image}
            showDownload={true}
          />
        );
      case "text":
        const textContent = portfolio.content.sections.map(section => 
          `<h2>${section.title}</h2><p>${section.content}</p>`
        ).join('');
        return (
          <TextContent 
            content={textContent} 
            title={portfolio.title}
            estimatedReadTime={portfolio.content.readTime || "5 min read"}
          />
        );
      default:
        return null;
    }
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
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
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
            
            {/* Report Button */}
            {token && (
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
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Creator */}
            <div>
              <PageTitle>
              {portfolio.title}
              </PageTitle>
             
              <div className="flex items-center gap-4">
                <Avatar className="size-12">
                  <AvatarImage src={portfolio.creator.avatar} alt={portfolio.creator.name} />
                  <AvatarFallback>{portfolio.creator.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{portfolio.creator.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {portfolio.creator.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            {renderContent()}

            {/* Description */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">About this Project</h2>
              <p className="text-muted-foreground">{portfolio.description}</p>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="p-6 ">
              <div className="" onClick={handelTranslate}>
                <h3 className="font-semibold mb-4">Stats</h3>
                <div className="flex flex-col gap-4  items-center justify-between">
                <div className="grid grid-cols-2 justify-center gap-4">

                  <Button
                    variant="ghost"
                    onClick={handleLike}
                    className={cn(
                      "text-center p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/20 h-auto flex flex-col transition-all duration-200",
                      isLiked && "text-purple-600"
                    )}
                  >
                    <Heart className={cn("size-5 mx-auto mb-2 transition-all text-purple-600 duration-200", isLiked && "fill-current")} />
                    <div className="font-semibold">{likes}</div>
                    <div className="text-sm text-muted-foreground">Likes</div>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setShowComments(true)}
                    className="text-center p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/20 h-auto flex flex-col transition-all duration-200"
                  >
                    <MessageCircle className="size-5 mx-auto mb-2 text-purple-600" />
                    <div className="font-semibold">
                      {portfolio.stats.comments}
                    </div>
                    <div className="text-sm text-muted-foreground">Comments</div>
                  </Button>
                  {/* <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
                    <Share2 className="size-5 mx-auto mb-2 text-purple-600" />
                    <div className="font-semibold">{portfolio.stats.shares}</div>
                    <div className="text-sm text-muted-foreground">Shares</div>
                  </div> */}
                  <div className="text-center items-center col-span-2 align-center  p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
                    <Star className="size-5 mx-auto mb-2  text-purple-600" />
                    <div className="font-semibold">{portfolio.stats.rating}</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                </div>
              <StarRating />
              </div>
              </div>
            </Card>

            {/* Tags */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {portfolio.tags.map((tag) => (
                  <Tag key={tag}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </Card>

            {/* Dates */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Dates</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span>
                    {new Date(portfolio.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Updated</span>
                  <span>
                    {new Date(portfolio.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
             
            </Card>
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      <CommentsModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        portfolioId={portfolio.id}
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