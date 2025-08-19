import React from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileView from "./components/ProfileView";
import ProfileStatsSection from "./components/ProfileStats";
import PortfolioCard from "@/components/PortfolioCard";

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
  const navigate = useNavigate();
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
        tags: ["UI/UX", "Design", "Web"],
        initialLikes: 89
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0fGVufDB8fDB8fHww",
        title: "Abstract Compositions",
        creator: storedProfile?.fullName || "Sarah Anderson",
        creatorImage: storedProfile?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=creative_artist",
        likes: 203,
        comments: 31,
        tags: ["Abstract", "Art", "Experimental"],
        initialLikes: 203
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <ProfileView userData={userData} />
        
        <Separator className="my-8" />
        
        <ProfileStatsSection userData={userData} />

        {/* Action Buttons */}
        {userData.isCurrentUser && (
          <div className="flex gap-4 mb-8">
            <Button 
              onClick={() => navigate('/settings/profile')}
              className="flex items-center gap-2"
            >
              <Edit className="size-4" />
              Edit Profile
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/create')}
              className="flex items-center gap-2"
            >
              <Plus className="size-4" />
              Add Portfolio
            </Button>
          </div>
        )}

        <Separator className="my-8" />

        {/* Portfolio Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">My Portfolios</h2>
          {userData.portfolios.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.portfolios.map((portfolio) => (
                <PortfolioCard
                  key={portfolio.id}
                  image={portfolio.image}
                  title={portfolio.title}
                  creator={portfolio.creator}
                  creatorImage={portfolio.creatorImage}
                  likes={portfolio.likes}
                  comments={portfolio.comments}
                  tags={portfolio.tags}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No portfolios yet</p>
              <Button onClick={() => navigate('/create')}>
                <Plus className="size-4 mr-2" />
                Create Your First Portfolio
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
