import React from "react";
import "./Rating.scss";
const Ratings = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return <p>No reviews available</p>;

  const totalReviews = reviews.length;

   
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    ratingCounts[review.rating - 1]++;
  });

   
  const ratingPercentages = ratingCounts.map(
    (count) => (count / totalReviews) * 100
  );
 
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  return (
    <div className="rating-summary">
      <h3>Customer Reviews</h3>
      <p>
        ⭐ {averageRating.toFixed(1)} out of 5 ({totalReviews} global ratings)
      </p>
      {ratingPercentages.map((percentage, index) => (
        <div key={index} className="rating-row">
          <span>{5 - index} star</span>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${percentage}%` }}></div>
          </div>
          <span>{percentage.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
};

export default Ratings;
