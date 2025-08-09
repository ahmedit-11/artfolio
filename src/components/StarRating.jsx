import React, { useState } from "react";
import { FaStar } from 'react-icons/fa';

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="flex items-center gap-2">
      <div className="star-rating flex items-center gap-1">
        {[...Array(5)].map((_, index) => {
          const currentRate = index + 1;
          return (
            <label key={index} className="cursor-pointer">
              <input
                type="radio"
                name="rate"
                value={currentRate}
                onClick={() => setRating(currentRate)}
                className="sr-only"
              />
              <FaStar
                size={24}
                className={`transition-colors duration-200 ${
                  currentRate <= (hover || rating) 
                    ? "text-yellow-400" 
                    : "text-gray-300"
                }`}
                onMouseEnter={() => setHover(currentRate)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      
      {rating && (
        <span className="text-lg font-medium text-gray-700">
          {rating}
        </span>
      )}
    </div>
  );
};

export default StarRating;