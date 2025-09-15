import { useState } from 'react';
import Cookies from 'js-cookie';

/**
 * Custom hook for handling authentication checks and login modal
 * @param {Object} options - Configuration options
 * @param {string} options.title - Modal title
 * @param {string} options.description - Modal description
 * @param {Array} options.features - Array of feature strings to display
 * @param {string} options.actionContext - Context for the action being performed
 * @returns {Object} - Authentication state and modal controls
 */
export const useAuthModal = (options = {}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isAuthenticated = !!Cookies.get('token');

  const {
    title = "Unlock Full Access",
    description = "Sign in to access this feature and discover amazing creative work from our community.",
    features = [
      "Access exclusive content",
      "Interact with the community", 
      "Save your favorites",
      "Connect with creators"
    ],
    actionContext = "this feature"
  } = options;

  /**
   * Check if user is authenticated, show modal if not
   * @param {Function} callback - Function to execute if authenticated
   * @returns {boolean} - Whether the action should proceed
   */
  const requireAuth = (callback) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return false;
    }
    if (callback) callback();
    return true;
  };

  /**
   * Close the login modal
   */
  const closeModal = () => {
    setShowLoginModal(false);
  };

  /**
   * Open the login modal
   */
  const openModal = () => {
    setShowLoginModal(true);
  };

  return {
    isAuthenticated,
    showLoginModal,
    requireAuth,
    closeModal,
    openModal,
    modalProps: {
      title,
      description,
      features,
      actionContext
    }
  };
};

export default useAuthModal;
