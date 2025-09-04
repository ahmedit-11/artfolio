const BASE_URL = 'http://127.0.0.1:8000';

export const getProfileImageUrl = (path, fallback = null) => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_URL}/${cleanPath}`;
};

export const getPortfolioImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const storagePath = path.startsWith('storage/') ? path : `storage/${path}`;
  return `${BASE_URL}/${storagePath}`;
};
