import React from 'react';
import { ExternalLink, Link } from 'lucide-react';

const BioWithLinks = ({ bio, className = "" }) => {
  if (!bio) return <p className={className}>No bio available</p>;

  // Extract URLs from bio
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|\b[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;
  const extractedLinks = bio.match(urlRegex) || [];

  // Remove URLs from bio text for clean display
  const cleanBio = bio.replace(urlRegex, '').replace(/\s+/g, ' ').trim();

  return (
    <div>
      {/* Clean bio text */}
      <p className={className}>{cleanBio}</p>
      
      {/* Extracted links section */}
      {extractedLinks.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <Link className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">My Links:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {extractedLinks.map((url, index) => {
              let href = url;
              if (!url.startsWith('http://') && !url.startsWith('https://')) {
                href = 'https://' + url;
              }
              
              return (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors duration-200 border border-blue-200 dark:border-blue-800"
                >
                  <ExternalLink className="w-3 h-3" />
                  {url}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BioWithLinks;
