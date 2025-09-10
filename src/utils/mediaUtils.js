const BASE_URL = 'http://127.0.0.1:8000';

export const getProfileImageUrl = (path, fallback = null) => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  
  // Clean up multiple /storage/ prefixes caused by backend calling Storage::url() multiple times
  let cleanPath = path;
  
  // Remove multiple /storage/ prefixes and normalize
  if (cleanPath.includes('/storage/')) {
    // Extract the actual file path after the last /storage/
    const parts = cleanPath.split('/storage/');
    const actualPath = parts[parts.length - 1]; // Get the last part
    cleanPath = `/storage/${actualPath}`;
  } else if (cleanPath.startsWith('profile_pictures/')) {
    // Add /storage/ prefix for relative paths
    cleanPath = `/storage/${cleanPath}`;
  } else {
    // Default case - add leading slash
    cleanPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  }
  
  const finalUrl = `${BASE_URL}${cleanPath}`;
  return finalUrl;
};

export const getPortfolioMediaUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  
  // Clean up multiple /storage/ prefixes caused by backend calling Storage::url() multiple times
  let cleanPath = path;
  
  // Remove multiple /storage/ prefixes and normalize
  if (cleanPath.includes('/storage/')) {
    // Extract the actual file path after the last /storage/
    const parts = cleanPath.split('/storage/');
    const actualPath = parts[parts.length - 1]; // Get the last part
    cleanPath = `/storage/${actualPath}`;
  } else if (cleanPath.startsWith('project_covers/') || cleanPath.startsWith('project_media/')) {
    // Add /storage/ prefix for relative paths
    cleanPath = `/storage/${cleanPath}`;
  } else {
    // Default case - add leading slash
    cleanPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  }
  return `${BASE_URL}${cleanPath}`;
};

// Specific function for cover images
export const getCoverImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  
  // Clean up multiple /storage/ prefixes caused by backend calling Storage::url() multiple times
  let cleanPath = path;
  
  // Remove multiple /storage/ prefixes and normalize
  if (cleanPath.includes('/storage/')) {
    // Extract the actual file path after the last /storage/
    const parts = cleanPath.split('/storage/');
    const actualPath = parts[parts.length - 1]; // Get the last part
    cleanPath = `/storage/${actualPath}`;
  } else if (cleanPath.startsWith('project_covers/')) {
    // Add /storage/ prefix for relative paths
    cleanPath = `/storage/${cleanPath}`;
  } else {
    // Default case - add leading slash
    cleanPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  }
  return `${BASE_URL}${cleanPath}`;
};

// Keep the old name for backward compatibility (can be removed later)
export const getPortfolioImageUrl = getPortfolioMediaUrl;
