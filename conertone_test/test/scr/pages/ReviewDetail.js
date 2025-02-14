import { useParams } from "react-router-dom";
import { useState } from "react";

const ReviewDetail = () => {
  const { id } = useParams();
  const [review] = useState({
    id,
    title: "책 제목1",
    rating: 4,
    content: "이 책을 읽고 느낀 점...",
  });
  const [comments, setComments] = useState([
    { id: 1, user: "독자1", text: "좋은 리뷰네요!" },
    { id: 2, user: "독자2", text: "저도 이 책 읽어보고 싶어요." },
  ]);

  return (
    <div>
      <h2>{review.title}</h2>
      <p>⭐ {review.rating}점</p>
      <p>{review.content}</p>

      <h3>댓글</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.user}:</strong> {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewDetail;
