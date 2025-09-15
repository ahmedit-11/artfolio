import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from 'react-icons/fa';
import { rateProjectThunk } from "@/store/ratings/thunk/rateProjectThunk";
import { deleteRatingThunk } from "@/store/ratings/thunk/deleteRatingThunk";
import { toast } from 'react-toastify';
import { Trash2 } from "lucide-react";
import { useAuthModal } from "@/hooks/useAuthModal";
import Cookies from "js-cookie";

const StarRating = ({ projectSlug, showDeleteButton = true }) => {
  const dispatch = useDispatch();
  const { loading, userRating, averageRating, ratingsCount, currentProjectId } = useSelector(state => state.ratings);
  const [hover, setHover] = useState(null);
  const { requireAuth } = useAuthModal({
    title: "Rate This Project",
    description: "Share your opinion and help others discover great content!",
    features: ["Rate projects with 1-5 stars", "Help creators get feedback", "Discover top-rated content"],
    actionContext: "rating projects"
  });

  // Use Redux state if available for current project, otherwise show average
  const displayRating = (currentProjectId === projectSlug && userRating !== null) ? userRating : null;

  const handleRating = async (rating) => {
    requireAuth(async () => {
      try {
        const result = await dispatch(rateProjectThunk({ projectSlug, rating }));
        
        if (rateProjectThunk.fulfilled.match(result)) {
          toast.success("Rating submitted successfully!");
        } else {
          toast.error("Failed to submit rating. Please try again.");
        }
      } catch (error) {
        console.error("Rating error:", error);
        toast.error("An error occurred while rating.");
      }
    });
  };

  const handleDeleteRating = async () => {
    requireAuth(async () => {
      try {
        const result = await dispatch(deleteRatingThunk(projectSlug));
        
        if (deleteRatingThunk.fulfilled.match(result)) {
          toast.success("Rating removed successfully!");
        } else {
          toast.error("Failed to remove rating. Please try again.");
        }
      } catch (error) {
        console.error("Delete rating error:", error);
        toast.error("An error occurred while removing rating.");
      }
    });
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="star-rating flex items-center gap-1">
          {[...Array(5)].map((_, index) => {
            const currentRate = index + 1;
            return (
              <label key={index} className="cursor-pointer">
                <input
                  type="radio"
                  name="rate"
                  value={currentRate}
                  onClick={() => handleRating(currentRate)}
                  className="sr-only"
                  disabled={loading}
                />
                <FaStar
                  size={20}
                  className={`transition-colors duration-200 ${
                    currentRate <= (hover || displayRating) 
                      ? "text-yellow-400" 
                      : "text-gray-300"
                  } ${loading ? "opacity-50" : ""}`}
                  onMouseEnter={() => !loading && setHover(currentRate)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
        
        <div className="flex items-center gap-2">
          {displayRating && (
            <span className="text-sm font-medium text-green-600">
              You rated this before with  {displayRating} star{displayRating > 1 ? 's' : ''}
            </span>
          )}
          
          {displayRating && showDeleteButton && (
            <button
              onClick={handleDeleteRating}
              disabled={loading}
              className="text-red-500 hover:text-red-700 transition-colors duration-200 disabled:opacity-50"
              title="Remove rating"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default StarRating;