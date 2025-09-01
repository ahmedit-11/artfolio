import React from "react";
import { useScrollToTop } from "../utils/scrollToTop";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Facebook,
  Globe,
  MapPin,
  Calendar,
  ExternalLink,
  Edit,
  Plus,
  Link as LinkIcon,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import PortfolioCard from "@/components/PortfolioCard";
import { useNavigate } from "react-router-dom";

// Social platforms config
const SOCIAL_PLATFORMS = [
  { key: "twitter", label: "Twitter", icon: Twitter },
  { key: "github", label: "GitHub", icon: Github },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "website", label: "Website", icon: Globe },
];

const SocialLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
  >
    <Icon className="size-4" />
    <span>{label}</span>
    <ExternalLink className="size-3" />
  </a>
);

const ProfileStats = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <span className="text-xl font-semibold">{value.toLocaleString()}</span>
    <span className="text-sm text-muted-foreground">{label}</span>
  </div>
);

// Utility to get profile data from localStorage
const PROFILE_KEY = "artfolio_profile";
function loadProfile() {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

const Profile = () => {
  useScrollToTop();
  const storedProfile = loadProfile();
  const userData = {
    username: "creative_artist",
    fullName: storedProfile?.fullName || "Sarah Anderson",
    avatar: storedProfile?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=creative_artist",
    bio: storedProfile?.bio || "Digital artist and UI designer passionate about creating immersive experiences. Always exploring new techniques and pushing creative boundaries.",
    location: "San Francisco, CA",
    joinedDate: "January 2024",
    followers: 1234,
    following: 567,
    isCurrentUser: true,
    socialLinks: storedProfile?.socialLinks || [
      { platform: "twitter", url: "https://twitter.com/creative_artist" },
      { platform: "github", url: "https://github.com/creative_artist" },
      { platform: "linkedin", url: "https://linkedin.com/in/creative_artist" },
      { platform: "website", url: "https://sarahanderson.com" },
      { platform: "custom", label: "Behance", url: "https://behance.net/creative_artist" },
    ],
    portfolios: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dWl8ZW58MHx8MHx8fDA%3D",
        title: "Digital Art Collection 2024",
        creator: storedProfile?.fullName || "Sarah Anderson",
        creatorImage: storedProfile?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=creative_artist",
        likes: 156,
        comments: 23,
        tags: ["Digital Art", "Illustration", "Creative"],
        initialLikes: 156
      },
      {
        id: 2,
        image: "https://plus.unsplash.com/premium_photo-1747314222141-8c7240150597?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "UI Design Portfolio",
        creator: storedProfile?.fullName || "Sarah Anderson",
        creatorImage: storedProfile?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=creative_artist",
        likes: 89,
        comments: 12,
        tags: ["UI Design", "Web Design", "Creative"],
        initialLikes: 89
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1746980776869-0443aaffc7f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "3D Art Explorations",
        creator: storedProfile?.fullName || "Sarah Anderson",
        creatorImage: storedProfile?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=creative_artist",
        likes: 245,
        comments: 34,
        tags: ["3D Art", "Animation", "Creative"],
        initialLikes: 245
      }
    ],
  };

  const {
    username,
    fullName,
    avatar,
    bio,
    location,
    joinedDate,
    followers,
    following,
    isCurrentUser,
    socialLinks,
    portfolios,
  } = userData;

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Header Section */}
      <div className="w-full bg-gradient-to-b from-purple-100/20 to-background dark:from-purple-900/10 pt-16 pb-8 animate-fade-in animation-delay-150">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 animate-fade-in animation-delay-300">
            {/* Avatar */}
            <Avatar className="size-32 border-4 border-background shadow-lg animate-fade-in animation-delay-450">
              <AvatarImage src={avatar} alt={fullName} />
              <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left animate-fade-in animation-delay-600">
              <h1 className="text-3xl font-bold">{fullName}</h1>
              <p className="text-lg text-muted-foreground mb-4">@{username}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4 text-sm text-muted-foreground">
                {location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    <span>{location}</span>
                  </div>
                )}
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
                {isCurrentUser ? (
                  <>
                    <Button variant="outline" className="space-x-2" onClick={() => navigate('/settings/profile')}>
                      <Edit className="size-4" />
                      <span>Edit Profile</span>
                    </Button>
                    <Button variant="default" className="space-x-2">
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
          <p className="text-lg mb-6">{bio}</p>
          
          <Separator className="my-6" />
          
          <div className="flex flex-col space-y-3">
            {socialLinks.map((link, idx) => {
              const platform = SOCIAL_PLATFORMS.find(p => p.key === link.platform);
              const Icon = platform ? platform.icon : LinkIcon;
              const label = platform ? platform.label : link.label || "Link";
              return link.url ? (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="size-4" />
                  <span>{label}</span>
                  <ExternalLink className="size-3" />
                </a>
              ) : null;
            })}
          </div>
        </div>

        {/* Portfolios Section */}
        <div className="mt-12 animate-fade-in animation-delay-1050">
          <h2 className="text-2xl font-bold mb-6">Portfolios</h2>
          
          {portfolios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in animation-delay-1200">
              {portfolios.map((portfolio, index) => (
                <PortfolioCard
                  key={portfolio.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${1350 + (index * 150)}ms` }}
                  image={portfolio.image}
                  title={portfolio.title}
                  creator={portfolio.creator}
                  creatorImage={portfolio.creatorImage}
                  likes={portfolio.likes}
                  comments={portfolio.comments}
                  tags={portfolio.tags}
                  initialLikes={portfolio.initialLikes}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg animate-fade-in animation-delay-1350">
              <p className="text-lg text-muted-foreground">
                No portfolios created yet.
                {isCurrentUser && (
                  <>
                    <br />
                    <Button variant="link" className="mt-2">
                      Create your first portfolio
                    </Button>
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 