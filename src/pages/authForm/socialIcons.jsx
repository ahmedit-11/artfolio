import React from 'react';

const SocialIcons = () => {
  const platforms = ['google', 'facebook', 'github', 'linkedin'];
  
  return (
    <div className="social-icons">
      {platforms.map((platform) => (
        <a
          key={platform}
          href="#"
          aria-label={`Login with ${platform}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={`bx bxl-${platform}`} />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;