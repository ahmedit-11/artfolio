import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Facebook,
  Globe,
} from "lucide-react";

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

const ProfileView = ({ userData }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <Avatar className="size-32">
          <AvatarImage src={userData.avatar} alt={userData.fullName} />
          <AvatarFallback className="text-2xl">
            {userData.fullName?.split(' ').map(n => n[0]).join('') || 'SA'}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Profile Info */}
      <div className="flex-grow space-y-4">
        <div>
          <h1 className="text-3xl font-bold">{userData.fullName}</h1>
          <p className="text-muted-foreground">@{userData.username}</p>
        </div>

        <p className="text-foreground max-w-2xl">{userData.bio}</p>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="size-4" />
            <span>{userData.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="size-4" />
            <span>Joined {userData.joinedDate}</span>
          </div>
        </div>

        {/* Social Links */}
        {userData.socialLinks && userData.socialLinks.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Connect</h3>
            <div className="flex flex-wrap gap-4">
              {userData.socialLinks.map((link, index) => {
                const platform = SOCIAL_PLATFORMS.find(p => p.key === link.platform);
                if (platform) {
                  return (
                    <SocialLink
                      key={index}
                      href={link.url}
                      icon={platform.icon}
                      label={platform.label}
                    />
                  );
                } else if (link.platform === "custom" && link.label) {
                  return (
                    <SocialLink
                      key={index}
                      href={link.url}
                      icon={Globe}
                      label={link.label}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
