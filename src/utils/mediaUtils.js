const BASE_URL = 'http://127.0.0.1:8000';

export const getProfileImageUrl = (path, fallback = null) => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  
  // Backend already returns paths with /storage/ prefix like "/storage/profile_pictures/image.jpg"
  // We just need to prepend the base URL
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
};

export const getPortfolioMediaUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  
  // Backend already returns paths with /storage/ prefix like "/storage/project_covers/image.jpg" or "/storage/project_media/image.jpg"
  // We just need to prepend the base URL
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
};

// Specific function for cover images
export const getCoverImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  
  // Backend returns cover image paths with /storage/ prefix like "/storage/project_covers/image.jpg"
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
};

// Keep the old name for backward compatibility (can be removed later)
export const getPortfolioImageUrl = getPortfolioMediaUrl;
