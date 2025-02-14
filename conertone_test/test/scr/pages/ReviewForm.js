import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReviewForm = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("감상평이 등록되었습니다.");
    navigate("/");
  };

  return (
    <div>
      <h2>감상평 작성</h2>
      <form onSubmit={handleSubmit}>
        <label>책 제목:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>평점:</label>
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" required />

        <label>감상평:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />

        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default ReviewForm;
