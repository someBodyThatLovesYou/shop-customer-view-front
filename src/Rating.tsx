// Rating.tsx
import React from "react";

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <div className="RC-form-item rating-section">
      {[1, 2, 3, 4, 5].map((rating) => (
        <div key={rating} className="d-flex justify-content-center">
          <input
            type="radio"
            id={`rating${rating}`}
            name="rating"
            value={rating}
            checked={value === rating}
            onChange={handleChange}
            className="hidden-radio"
          />
          <label htmlFor={`rating${rating}`} className="custom-radio">
            {rating == 1 && (
              <>
                <p>😒</p>
                <span className="tooltip-text">Terrible</span>
              </>
            )}
            {rating == 2 && (
              <>
                <p>😣</p>
                <span className="tooltip-text">bad</span>
              </>
            )}
            {rating == 3 && (
              <>
                <p>🤔</p>
                <span className="tooltip-text">okay</span>
              </>
            )}
            {rating == 4 && (
              <>
                <p>😊</p>
                <span className="tooltip-text">good</span>
              </>
            )}
            {rating == 5 && (
              <>
                <p>😀</p>
                <span className="tooltip-text">great</span>
              </>
            )}
          </label>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Rating;
