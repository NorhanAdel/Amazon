import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import "./RatingIcon.scss"
const Rating = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return <p>No reviews yet.</p>;

 
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const totalStars = 5;

  return (
    <div className="rating">
      <div className="stars">
        {[...Array(totalStars)].map((_, i) => (
          <span key={i}>
            {averageRating >= i + 1 ? (
              <FaStar />
            ) : averageRating >= i + 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <AiOutlineStar />
            )}
          </span>
        ))}
      </div>
      <span className="average">{averageRating.toFixed(1)} out of 5</span>
     
    </div>
  );
};

export default Rating;
