import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const LoginPromptModal = ({ 
  isOpen, 
  onClose, 
  title = "Unlock Full Access",
  description = "Sign in to access this feature and discover amazing creative work from our community.",
  features = [
    "Access exclusive content",
    "Interact with the community", 
    "Save your favorites",
    "Connect with creators"
  ],
  actionContext = "this feature"
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSignIn = () => {
    onClose();
    navigate('/auth/signin');
  };

  const handleSignUp = () => {
    onClose();
    navigate('/auth/signup');
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
      />
      
      {/* Modal */}
      <Card 
        className="relative w-full max-w-md mx-4 p-0 overflow-hidden animate-scale-in shadow-2xl border-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700" />
        
        {/* Content */}
        <div className="relative p-8 text-center text-white">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
              <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
            {title}
          </h2>

          {/* Description */}
          <p className="text-white/90 mb-6 leading-relaxed">
            {description}
          </p>

          {/* Features list */}
          <div className="mb-8 space-y-3 text-left">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-sm text-white/80">
                <Sparkles className="h-4 w-4 text-yellow-300 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleSignIn}
              className="w-full bg-white text-purple-700 hover:bg-white/90 font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              <span>Sign In</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              onClick={handleSignUp}
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white/10 font-medium py-3 rounded-xl backdrop-blur-sm"
            >
              Create Account
            </Button>
          </div>

          {/* Footer text */}
          <p className="mt-6 text-xs text-white/60">
            Join thousands of creators sharing their work
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
      </Card>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default LoginPromptModal;
