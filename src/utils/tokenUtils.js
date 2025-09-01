// Utility to decode JWT token and extract user info
export function decodeToken(token) {
  try {
    // JWT tokens have 3 parts separated by dots: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    // Decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]));
    
    // Extract user info from token payload
    // Laravel Sanctum/JWT typically includes user data in the token
    return {
      id: payload.sub || payload.user_id || payload.id,
      name: payload.name || payload.user_name || 'User',
      email: payload.email || payload.user_email || '',
      exp: payload.exp // expiration time
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

// Check if token is expired
export function isTokenExpired(token) {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  
  // exp is in seconds, Date.now() is in milliseconds
  return decoded.exp * 1000 < Date.now();
}

// Get user from localStorage as fallback
export function getStoredUser() {
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  } catch (error) {
    console.error('Error getting stored user:', error);
  }
  return null;
}
