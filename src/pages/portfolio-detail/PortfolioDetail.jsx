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
import { useScrollToTop } from "../../utils/scrollToTop";
import StarRating from "@/components/StarRating";
import Tag from "@/components/ui/tag";
import Cookies from "js-cookie";
import { reportAPI } from "@/lib/api";
import { ImageGallery } from "@/components/ImageGallery";
import { VideoPlayer } from "@/components/VideoPlayer";
import { TextContent } from "@/components/TextContent";
import { AudioPlayer } from "@/components/AudioPlayer";
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
import PortfolioStats from "./components/PortfolioStats";
import PortfolioTags from "./components/PortfolioTags";

// Mock data for different portfolio types
const mockPortfolios = {
  images: {
    id: 1,
    title: "Minimalist UI Design Collection",
    creator: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      username: "alexdesign"
    },
    description: "A curated collection of minimalist UI designs focusing on clean aesthetics and user experience. This portfolio showcases various interface elements, mobile app designs, and web layouts that emphasize simplicity and functionality.",
    images: [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&q=80"
    ],
    tags: ["UI/UX", "Minimalism", "Web Design", "Mobile"],
    likes: 248,
    comments: 36,
    views: 1250,
    createdAt: "2024-01-15",
    category: "Design",
    tools: ["Figma", "Adobe XD", "Sketch"],
    type: "images"
  },
  video: {
    id: 2,
    title: "3D Character Animation Reel",
    creator: {
      name: "Sophie Garcia",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      username: "sophieanimator"
    },
    description: "A showcase of 3D character animations featuring various styles and techniques. This reel demonstrates character rigging, facial expressions, walk cycles, and complex action sequences created using industry-standard software.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=800&q=80",
    tags: ["3D Animation", "Character Design", "Motion Graphics", "Rigging"],
    likes: 176,
    comments: 19,
    views: 890,
    createdAt: "2024-01-10",
    category: "Animation",
    tools: ["Blender", "Maya", "After Effects"],
    type: "video",
    duration: "2:30"
  },
  text: {
    id: 3,
    title: "UX Case Study: E-commerce Redesign",
    creator: {
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80",
      username: "mayaux"
    },
    description: "A comprehensive UX case study documenting the complete redesign process of an e-commerce platform, from initial research to final implementation.",
    content: {
      sections: [
        {
          title: "Project Overview",
          content: "This case study explores the complete redesign of ShopEasy, a mid-sized e-commerce platform struggling with low conversion rates and poor user engagement. Over the course of 6 months, our team conducted extensive research, prototyping, and testing to create a more intuitive and conversion-focused experience."
        },
        {
          title: "The Challenge",
          content: "ShopEasy was experiencing several critical issues: Conversion rate of only 1.2% (industry average: 2.5%), High cart abandonment rate (78%), Poor mobile experience with 65% bounce rate, Confusing navigation and product discovery."
        },
        {
          title: "Research & Discovery",
          content: "We began with comprehensive user research including: User Interviews: 24 participants across different demographics, Analytics Analysis: 6 months of user behavior data, Competitive Analysis: Benchmarking against 8 major competitors, Heuristic Evaluation: Identifying usability issues."
        },
        {
          title: "Key Insights",
          content: "Our research revealed several critical pain points: Users couldn't find products easily due to poor search and filtering, The checkout process was too complex with 7 steps, Mobile experience was not optimized for touch interactions, Product pages lacked sufficient information and social proof."
        },
        {
          title: "Design Solutions",
          content: "Based on our findings, we implemented several key improvements: Enhanced Product Discovery, Streamlined Checkout, Mobile-First Approach."
        },
        {
          title: "Results",
          content: "After 3 months post-launch, we achieved remarkable improvements: Conversion Rate: Increased from 1.2% to 3.1% (+158%), Cart Abandonment: Reduced from 78% to 52% (-33%), Mobile Bounce Rate: Decreased from 65% to 28% (-57%), Average Order Value: Increased by 23%."
        },
        {
          title: "Lessons Learned",
          content: "This project reinforced several important UX principles: User research is invaluable for identifying real problems, Mobile experience can't be an afterthought, Simplicity often trumps feature richness, Continuous testing and iteration are essential."
        }
      ],
      readTime: "8 min read"
    },
    tags: ["UX Research", "Case Study", "E-commerce", "Mobile Design"],
    likes: 324,
    comments: 41,
    views: 2100,
    createdAt: "2024-01-08",
    category: "UX/UI",
    tools: ["Figma", "Miro", "Hotjar", "Google Analytics"],
    type: "text"
  },
  audio: {
    id: 4,
    title: "Electronic Music Mix",
    creator: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      username: "johndoe"
    },
    description: "A mix of electronic music tracks showcasing various styles and techniques.",
    content: {
      url: "https://example.com/audio.mp3",
      image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=800&q=80"
    },
    tags: ["Electronic Music", "Mix", "Audio"],
    likes: 100,
    comments: 10,
    views: 500,
    createdAt: "2024-01-12",
    category: "Music",
    tools: ["Ableton Live", "FL Studio"],
    type: "audio"
  }
};

const PortfolioDetail = () => {
  useScrollToTop();
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    // Simulate fetching portfolio data based on ID
    let mockData;
    switch (id) {
      case '2':
        mockData = mockPortfolios.video;
        break;
      case '3':
        mockData = mockPortfolios.text;
        break;
      case '4':
        mockData = mockPortfolios.audio;
        break;
      default:
        mockData = mockPortfolios.images;
    }
    setPortfolio(mockData);
    setLikesCount(mockData.likes);
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: portfolio?.title,
          text: `Check out this amazing portfolio: ${portfolio?.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const handleReport = async (reportData) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        console.error('No auth token found');
        return;
      }

      await reportAPI.create({
        content_type: 'portfolio',
        content_id: portfolio.id,
        reason: reportData.reason,
        description: reportData.description
      });
      
      setShowReportModal(false);
      // Show success message
    } catch (error) {
      console.error('Error reporting portfolio:', error);
    }
  };

  // Image navigation is now handled by ImageGallery component

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Dynamic Content Based on Type */}
            <div className="mb-6">
              {portfolio.type === 'images' && (
                <ImageGallery
                  images={portfolio.images}
                  title={portfolio.title}
                  showThumbnails={true}
                  showDownloadButton={true}
                  aspectRatio="aspect-video"
                />
              )}
              
              {portfolio.type === 'video' && (
                <VideoPlayer
                  videoUrl={portfolio.videoUrl}
                  title={portfolio.title}
                />
              )}
              
              {portfolio.type === 'text' && (
                <TextContent 
                  content={portfolio.content.sections.map(section => 
                    `<h2>${section.title}</h2><p>${section.content}</p>`
                  ).join('')} 
                  title={portfolio.title}
                  estimatedReadTime={portfolio.content.readTime || "5 min read"}
                />
              )}
              
              {portfolio.type === 'audio' && (
                <AudioPlayer
                  audioUrl={portfolio.content.url}
                  title={portfolio.title}
                  artist={portfolio.creator?.name || "Unknown Artist"}
                  cover={portfolio.content.image}
                  showDownload={true}
                />
              )}
            </div>

            {/* Portfolio Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{portfolio.title}</h1>
                  {portfolio.type === 'video' && portfolio.duration && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {portfolio.duration}
                    </Badge>
                  )}
                  {portfolio.type === 'text' && portfolio.content.readTime && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {portfolio.content.readTime}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {portfolio.description}
                </p>
              </div>

              <PortfolioTags tags={portfolio.tags} />
              
              {/* Tools Used */}
              {portfolio.tools && (
                <div>
                  <h3 className="font-semibold mb-2">Tools Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.tools.map((tool, index) => (
                      <Badge key={index} variant="secondary">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Creator Info */}
            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="size-12">
                  <AvatarImage src={portfolio.creator.avatar} alt={portfolio.creator.name} />
                  <AvatarFallback>
                    {portfolio.creator.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{portfolio.creator.name}</h3>
                  <p className="text-sm text-muted-foreground">@{portfolio.creator.username}</p>
                </div>
              </div>
              <Button className="w-full">Follow</Button>
            </Card>

            <PortfolioStats 
              likes={likesCount}
              comments={portfolio.comments}
              views={portfolio.views}
              createdAt={portfolio.createdAt}
            />

            {/* Actions */}
            <Card className="p-6">
              <div className="space-y-3">
                <Button 
                  variant={isLiked ? "default" : "outline"} 
                  className="w-full"
                  onClick={handleLike}
                >
                  <Heart className={cn("size-4 mr-2", isLiked && "fill-current")} />
                  {isLiked ? "Liked" : "Like"} ({likesCount})
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowComments(true)}
                >
                  <MessageCircle className="size-4 mr-2" />
                  Comments ({portfolio.comments})
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleShare}
                >
                  <Share2 className="size-4 mr-2" />
                  Share
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowReportModal(true)}
                >
                  <Flag className="size-4 mr-2" />
                  Report
                </Button>
              </div>
            </Card>

            {/* Rating */}
            <Card className="p-6">
              <h3 className="font-semibold mb-3">Rate this portfolio</h3>
              <StarRating 
                rating={userRating}
                onRatingChange={setUserRating}
              />
            </Card>
          </div>
        </div>

        {/* Comments Modal */}
        <CommentsModal
          isOpen={showComments}
          onClose={() => setShowComments(false)}
          portfolioId={portfolio.id}
        />

        {/* Report Modal */}
        <ReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReport}
          contentType="portfolio"
          contentTitle={portfolio.title}
        />
      </div>
    </div>
  );
};

export default PortfolioDetail;
