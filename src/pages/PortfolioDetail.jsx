import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Calendar,
  User,
  Tag,
  Eye,
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import CommentsModal from "@/components/CommentsModal";

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // navigate after fade-out
  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => navigate(-1), 300); // duration matches CSS
      return () => clearTimeout(timer);
    }
  }, [isClosing]);

  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showFullscreenGallery, setShowFullscreenGallery] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);

  // For demo purposes, we'll use the images portfolio
  const portfolio = mockPortfolios.images;

  // Initialize likes from portfolio data
  React.useEffect(() => {
    setLikes(portfolio.stats.likes);
  }, [portfolio.stats.likes]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? portfolio.content.items.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === portfolio.content.items.length - 1 ? 0 : prev + 1
    );
  };

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

  const openFullscreenGallery = (imageIndex) => {
    setFullscreenImageIndex(imageIndex);
    setShowFullscreenGallery(true);
  };

  const closeFullscreenGallery = () => {
    setShowFullscreenGallery(false);
  };

  const navigateFullscreenImage = (direction) => {
    if (direction === 'prev') {
      setFullscreenImageIndex(prev => 
        prev === 0 ? portfolio.content.items.length - 1 : prev - 1
      );
    } else {
      setFullscreenImageIndex(prev => 
        prev === portfolio.content.items.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleKeyDown = (e) => {
    if (showFullscreenGallery) {
      if (e.key === 'Escape') {
        closeFullscreenGallery();
      } else if (e.key === 'ArrowLeft') {
        navigateFullscreenImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateFullscreenImage('next');
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showFullscreenGallery]);

  const renderContent = () => {
    switch (portfolio.content.type) {
      case "images":
        return (
          <div className="space-y-8">
            {/* Cover Image */}
            <div 
              className="relative aspect-[16/9] rounded-xl overflow-hidden bg-secondary/20 cursor-pointer group"
              onClick={() => openFullscreenGallery(0)}
            >
              <img
                src={portfolio.content.items[0].url}
                alt={portfolio.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolio.content.items.slice(1).map((item, index) => (
                <div
                  key={item.id}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-secondary/20 cursor-pointer group"
                  onClick={() => openFullscreenGallery(index + 1)}
                >
                  <img
                    src={item.url}
                    alt={`${portfolio.title} - Image ${item.id}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        );
      case "video":
        return (
          <div className="aspect-video relative rounded-xl overflow-hidden">
            <video
              className="w-full h-full object-cover"
              controls
              poster={portfolio.content.thumbnail}
            >
              <source src={portfolio.content.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case "audio":
        return (
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="size-12 rounded-full bg-purple-100 dark:bg-purple-900/20"
              >
                {isPlaying ? (
                  <Pause className="size-6 text-purple-600" />
                ) : (
                  <Play className="size-6 text-purple-600" />
                )}
              </Button>
              <div className="flex-1">
                <div className="h-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                  <div className="h-full w-1/3 bg-purple-600 rounded-full"></div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>0:00</span>
                  <span>{portfolio.content.duration}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="text-muted-foreground hover:text-foreground"
              >
                {isMuted ? (
                  <VolumeX className="size-5" />
                ) : (
                  <Volume2 className="size-5" />
                )}
              </Button>
            </div>
          </Card>
        );
      case "text":
        return (
          <div className="space-y-8">
            {portfolio.content.sections.map((section, index) => (
              <Card key={index} className="p-6 prose dark:prose-invert max-w-none">
                <h2>{section.title}</h2>
                <p>{section.content}</p>
              </Card>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

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
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLike}
                className={cn(
                  "hover:bg-purple-100 dark:hover:bg-purple-900/20",
                  isLiked && "text-purple-600"
                )}
              >
                <Heart className={cn("size-5", isLiked && "fill-current")} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={cn(
                  "hover:bg-purple-100 dark:hover:bg-purple-900/20",
                  isBookmarked && "text-purple-600"
                )}
              >
                <Bookmark className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-purple-100 dark:hover:bg-purple-900/20"
              >
                <Share2 className="size-5" />
              </Button>
            </div>
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                {portfolio.title}
              </h1>
              <div className="flex items-center gap-4">
                <img
                  src={portfolio.creator.avatar}
                  alt={portfolio.creator.name}
                  className="size-12 rounded-full"
                />
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
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="ghost"
                  onClick={handleLike}
                  className={cn(
                    "text-center p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/20 h-auto flex flex-col transition-all duration-200",
                    isLiked && "text-purple-600"
                  )}
                >
                  <Heart className={cn("size-5 mx-auto mb-2 transition-all duration-200", isLiked && "fill-current")} />
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
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
                  <Share2 className="size-5 mx-auto mb-2 text-purple-600" />
                  <div className="font-semibold">{portfolio.stats.shares}</div>
                  <div className="text-sm text-muted-foreground">Shares</div>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
                  <Eye className="size-5 mx-auto mb-2 text-purple-600" />
                  <div className="font-semibold">{portfolio.stats.views}</div>
                  <div className="text-sm text-muted-foreground">Views</div>
                </div>
              </div>
            </Card>

            {/* Tags */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {portfolio.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full text-sm"
                  >
                    {tag}
                  </span>
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

      {/* Fullscreen Image Gallery */}
      {showFullscreenGallery && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={closeFullscreenGallery}
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            >
              <X className="size-6" />
            </Button>

            {/* Navigation buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateFullscreenImage('prev')}
              className="absolute left-4 z-10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="size-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateFullscreenImage('next')}
              className="absolute right-4 z-10 text-white hover:bg-white/20"
            >
              <ChevronRight className="size-8" />
            </Button>

            {/* Image */}
            <img
              src={portfolio.content.items[fullscreenImageIndex].url}
              alt={`${portfolio.title} - Image ${fullscreenImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
              {fullscreenImageIndex + 1} / {portfolio.content.items.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioDetail; 