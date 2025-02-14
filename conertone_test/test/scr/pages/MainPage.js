import { Link } from "react-router-dom";
import { useState } from "react";

const MainPage = () => {
  const [reviews, setReviews] = useState([
    { id: 1, title: "책 제목1", rating: 4, content: "감상평 내용1" },
    { id: 2, title: "책 제목2", rating: 5, content: "감상평 내용2" },
  ]);

  return (
    <div>
      <h1>북적북작</h1>
      <Link to="/write">✍ 감상평 작성</Link>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <Link to={`/review/${review.id}`}>
              <h2>{review.title}</h2>
              <p>⭐ {review.rating}점</p>
              <p>{review.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
