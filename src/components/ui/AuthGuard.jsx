import React from 'react';
import { useAuthModal } from '@/hooks/useAuthModal';
import LoginPromptModal from '@/components/ui/LoginPromptModal';

/**
 * AuthGuard component - Wraps content that requires authentication
 * Shows login modal for unauthenticated users when they try to interact
 */
const AuthGuard = ({ 
  children, 
  fallback = null,
  modalOptions = {},
  onAuthRequired = null 
}) => {
  const { 
    isAuthenticated, 
    requireAuth, 
    showLoginModal, 
    closeModal, 
    modalProps 
  } = useAuthModal(modalOptions);

  // If authenticated, render children normally
  if (isAuthenticated) {
    return children;
  }

  // If not authenticated, render fallback or children with auth protection
  const protectedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    // Clone child with auth-protected onClick
    return React.cloneElement(child, {
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (onAuthRequired) {
          onAuthRequired();
        }
        
        requireAuth(() => {
          // Execute original onClick if it exists
          if (child.props.onClick) {
            child.props.onClick(e);
          }
        });
      }
    });
  });

  return (
    <>
      {fallback || protectedChildren}
      
      {/* Login Modal */}
      {showLoginModal && (
        <LoginPromptModal
          isOpen={showLoginModal}
          onClose={closeModal}
          {...modalProps}
        />
      )}
    </>
  );
};

export default AuthGuard;
