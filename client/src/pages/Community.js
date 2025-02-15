
import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Community.css';
import logo from "../assets/logo.png";
import lamp from '../assets/lamp.png';
import bookicon from '../assets/bookicon.png';
import logo_user from '../assets/user.png';
import good from '../assets/good.png';

const Community = () => {
    const [page, setPage] = useState("main");
    const [selectedReview, setSelectedReview] = useState(null);
    const [reviews, setReviews] = useState([
        { id: 1, bookTitle: "책 제목 1", reviewTitle: "감상평 제목 1", reviewContent: "감상평1", nickname: "user1", rating: 5 },
        { id: 2, bookTitle: "책 제목 2", reviewTitle: "감상평 제목 2", reviewContent: "감상평2", nickname: "user2", rating: 4 },
    ]);

    return (
        <div>
            {page === "main" && <MainPage setPage={setPage} setSelectedReview={setSelectedReview} reviews={reviews} />}
            {page === "form" && <ReviewForm setPage={setPage} setReviews={setReviews} />}
            {page === "detail" && <ReviewDetail setPage={setPage} review={selectedReview} />}
        </div>
    );
};

const MainPage = ({ setPage, setSelectedReview, reviews }) => {
    return (
        <div className="container">
            <div className="MyDrawer">
                <header className="header">
                    <div className="img-group">
                        <img src={lamp} className="lamp" alt="lamp" />
                        <img src={lamp} className="lamp" alt="lamp" />
                        <img src={lamp} className="lamp" alt="lamp" />
                    </div>
                    <div className="nav-group">
                        <div className="nav-item">
                            <Link to="/account">회원가입</Link>
                            <div className="underline"></div>
                        </div>
                        <div className="nav-item">
                            <Link to="/login">로그인</Link>
                            <div className="underline"></div>
                        </div>
                        <div className="nav-item">
                            <Link to="/community">북작북작</Link>
                            <img src={bookicon} className="logo-Drawer" alt="Logo" />
                        </div>
                        <div className="nav-item">
                            <Link to="/myDrawer">나의 서랍</Link>
                            <div className="underline"></div>
                        </div>
                    </div>
                    <button className="logout-btn">👤 로그아웃</button>
                </header>
                <div className="logo-container-Drawer">
                    <img src={logo} className="logo-Drawer" alt="Logo" />
                    <h1>북작북작</h1>
                </div>
            </div>
            <div className="header_community">
            </div>
            <div className="search-bar">
                <div className="search-input">
                    <input type="text" placeholder="검색" />
                </div>
                <button className="write-button" onClick={() => setPage("form")}>작성하기</button>
            </div>

            <div className="review-list">
                {reviews.map((review) => (
                    <div key={review.id} className="review-card" onClick={() => { setSelectedReview(review); setPage("detail"); }}>
                        <div className="pin">📌</div>
                        <p className="book-title">{review.bookTitle}</p>
                        <div className="stars">{"⭐".repeat(review.rating)}</div>
                        <h2 className="review-title">{review.reviewTitle}</h2>
                        <div className="nickname">👤 {review.nickname}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ReviewDetail = ({ setPage, review, currentUser }) => {
    const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  if (!review) return <div className="no-review">리뷰를 찾을 수 없습니다.</div>;
  
  const isAuthor = currentUser === review.nickname;

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments((prev) => [
      { id: prev.length + 1, nickname: currentUser, content: newComment },
      ...prev
    ]);
    setNewComment("");
  };

  return (
      <div className="container">
        <div className="MyDrawer">
            <header className="header">
                  <div className="img-group">
                      <img src={lamp} className="lamp" alt="lamp" />
                      <img src={lamp} className="lamp" alt="lamp" />
                      <img src={lamp} className="lamp" alt="lamp" />
                  </div>
                  <div className="nav-group">
                      <div className="nav-item">
                          <Link to="/account">회원가입</Link>
                          <div className="underline"></div>
                      </div>
                      <div className="nav-item">
                          <Link to="/login">로그인</Link>
                          <div className="underline"></div>
                      </div>
                      <div className="nav-item">
                          <Link to="/community">북작북작</Link>
                          <img src={bookicon} className="logo-Drawer" alt="Logo" />
                      </div>
                      <div className="nav-item">
                          <Link to="/myDrawer">나의 서랍</Link>
                          <div className="underline"></div>
                      </div>
                  </div>
                  <button className="logout-btn">👤 로그아웃</button>
            </header>
            <div className="logo-container-Drawer">
                <img src={logo} className="logo-Drawer" alt="Logo" />
                <h1>북작북작</h1>
            </div>
        </div>
        <div className="review-container">
          <div className="review-container" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="view_rectangle" style={{ display: 'inline-block', padding: '10px', border: '1px solid black', borderRadius: '8px',  marginBottom: '20px'}}>
              <h2 className="book-title" style={{ display: 'inline' }}>{review.bookTitle}</h2>
              <p className="rating" style={{ display: 'inline' }}>{"⭐".repeat(review.rating)}</p>
            </div>
          
            <div className="user-info" style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
              <img src={logo_user} className="logo-Drawer" alt="Logo" style={{ width: '50px', height: 'auto' }} />
              <span className="nickname" style={{ marginRight: '10px' }}>{review.nickname}</span>
              <img src={good} className="logo-Drawer" alt="Logo"style={{ width: '50px', height: 'auto' }}  />
              <button className="like-button" style={{ padding: '5px 10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                좋아요
              </button>
            </div>
          </div>
        </div>
        <div className="view_ractangle" style={{ padding: '30px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 className="review-title">{review.reviewTitle}</h3>
        </div>
        <div className="view_ractangle" style={{ padding: '30px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 className="review-title">{review.reviewContent}</h3>
        </div>
        <div className="view_ractangle" style={{ padding: '10px', borderRadius: '8px' }}>
          <p className="author">작성자: {review.nickname}</p>
        </div>
        <div className="button-group">
          <button 
            className="back-button"
            onClick={() => setPage("main")}
          >
            뒤로 가기
          </button>
            {isAuthor && (
              <>
                <button className="edit-button">수정</button>
                <button className="delete-button">삭제</button>
              </>
            )}
        </div>
        <div className="comments-section">
          <div className="logo-container-Drawer">
            <img src={logo} className="logo-Drawer" alt="Logo" />
            <h1>댓글</h1>
          </div>
          <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            name="reviewContent"
            placeholder="댓글 작성하기"
            value={newComment}
            onChange={handleInputChange}
            required
          />
          <button type="submit">등록</button>
        </form>
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <strong>{comment.nickname}:</strong> {comment.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ReviewForm = ({ setPage, setReviews }) => {
    const [newReview, setNewReview] = useState({ bookTitle: "", reviewTitle: "", reviewCotent: "", nickname: "", rating: 5 });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setReviews((prev) => [{ id: prev.length + 1, ...newReview }, ...prev]);
        setPage("main");
    };

    return (
        <div>
          <header className="header">
            <div className="img-group">
                <img src={lamp} className="lamp" alt="lamp" />
                <img src={lamp} className="lamp" alt="lamp" />
                <img src={lamp} className="lamp" alt="lamp" />
            </div>
            <div className="nav-group">
              <div className="nav-item">
                            <Link to="/account">회원가입</Link>
                            <div className="underline"></div>
                        </div>
                        <div className="nav-item">
                            <Link to="/login">로그인</Link>
                            <div className="underline"></div>
                        </div>
                        <div className="nav-item">
                            <Link to="/community">북작북작</Link>
                            <img src={bookicon} className="logo-Drawer" alt="Logo" />
                        </div>
                        <div className="nav-item">
                            <Link to="/myDrawer">나의 서랍</Link>
                            <div className="underline"></div>
                        </div>
                    </div>
                    <button className="logout-btn">👤 로그아웃</button>
                </header>
                <div className="logo-container-Drawer">
                    <img src={logo} className="logo-Drawer" alt="Logo" />
                    <h1>북작북작</h1>
                </div>

            <div className="header_community">
            </div>
  
            <div class="form-container">
              <h2>리뷰 작성</h2>
              <form onSubmit={handleSubmit}>
                  <input type="text" name="bookTitle" placeholder="책 제목" value={newReview.bookTitle} onChange={handleInputChange} required />
                  <input type="text" name="reviewTitle" placeholder="감상평 제목" value={newReview.reviewTitle} onChange={handleInputChange} required />
                  <input type="text" name="reviewCotent" placeholder="감상평" value={newReview.reviewCotent} onChange={handleInputChange} required />
                  <input type="text" name="nickname" placeholder="닉네임" value={newReview.nickname} onChange={handleInputChange} required />
                  <input type="number" name="rating" placeholder="평점 (1-5)" value={newReview.rating} onChange={handleInputChange} min="1" max="5" required />
                  <button type="submit">등록</button>
              </form>
              <button onClick={() => setPage("main")}>취소</button>
          </div>
        </div>
    );
};

export default Community;