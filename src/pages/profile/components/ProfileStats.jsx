import React from "react";

const ProfileStats = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <span className="text-xl font-semibold">{value.toLocaleString()}</span>
    <span className="text-sm text-muted-foreground">{label}</span>
  </div>
);

const ProfileStatsSection = ({ userData }) => {
  return (
    <div className="flex justify-center lg:justify-start gap-8">
      <ProfileStats label="Followers" value={userData.followers} />
      <ProfileStats label="Following" value={userData.following} />
      <ProfileStats label="Portfolios" value={userData.portfolios?.length || 0} />
    </div>
  );
};

export default ProfileStatsSection;
