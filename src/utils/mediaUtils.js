const BASE_URL = 'http://127.0.0.1:8000';

export const getProfileImageUrl = (path, fallback = null) => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const storagePath = cleanPath.startsWith('storage/') ? cleanPath : `storage/${cleanPath}`;
  return `${BASE_URL}/${storagePath}`;
};

export const getPortfolioMediaUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const storagePath = path.startsWith('storage/') ? path : `storage/${path}`;
  return `${BASE_URL}/${storagePath}`;
};

// Keep the old name for backward compatibility (can be removed later)
export const getPortfolioImageUrl = getPortfolioMediaUrl;
