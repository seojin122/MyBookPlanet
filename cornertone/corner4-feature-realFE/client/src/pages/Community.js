
import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Community.css';
import logo from "../assets/logo.png";
import lamp from '../assets/lamp.png';
import bookIcon from '../assets/bookicon.png';
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
    <div className="main-container">
      <header className="header">
        <div className="img-group">
          <img src={lamp} className="lamp" alt="lamp" />
          <img src={lamp} className="lamp" alt="lamp" />
          <img src={lamp} className="lamp" alt="lamp" />
        </div>
        <div className="nav-group">
          <div className="nav-item">
            <Link to="/Bestseller">베스트셀러</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/Test">북루미테스트</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/community">북작북작</Link>
            <img src={bookIcon} className="book-icon" alt="book icon" />
          </div>
          <div className="nav-item">
            <Link to="/myDrawer">나의 서랍</Link>
            <div className="underline"></div>
          </div>
        </div>
      </header>
      <div className="logo-container-Drawer">
        <img src={logo} className="logo-Drawer" alt="Logo" />
          <h1>북작북작</h1>
      </div>
      <div className="header_community">
      </div>
      <div className="container">
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
    </div>
  );
};


// 리뷰 클릭
const ReviewDetail = ({ setPage, review, currentUser }) => {
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const isAuthor = currentUser === review.nickname;
  const [replyTo, setReplyTo] = useState(null);
  const [replies, setReplies] = useState({});

  if (!review) return <div className="no-review">리뷰를 찾을 수 없습니다.</div>;

  const handleInputChange = (e) => { setNewComment(e.target.value); };
  const handleReplyChange = (e) => setReplyContent(e.target.value);

  const handleSubmit = (e) => { 
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments((prev) => [
      { id: prev.length + 1, nickname: currentUser, content: newComment },
      ...prev
    ]);
    setNewComment("");
  };

  const handleReply = (commentId) => {
    if (!replyContent.trim()) return;
  
    const newReply = replyContent;
    setReplies((prevReplies) => {
      const newReplies = { ...prevReplies };
      if (!newReplies[commentId]) {
        newReplies[commentId] = []; // replies가 없으면 빈 배열로 초기화
      }
      newReplies[commentId].push({ nickname: currentUser, content: newReply });
      return newReplies;
    });
    setReplyContent('');
  };

    const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked); 
  };

  

  return (
    <div className="main-container">
      <header className="header">
        <div className="img-group">
          <img src={lamp} className="lamp" alt="lamp" />
          <img src={lamp} className="lamp" alt="lamp" />
          <img src={lamp} className="lamp" alt="lamp" />
        </div>
        <div className="nav-group">
          <div className="nav-item">
            <Link to="/Bestseller">베스트셀러</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/Test">북루미테스트</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/community">북작북작</Link>
            <img src={bookIcon} className="book-icon" alt="book icon" />
          </div>
          <div className="nav-item">
            <Link to="/myDrawer">나의 서랍</Link>
            <div className="underline"></div>
          </div>
        </div>
      </header>
      <div className="logo-container-Drawer">
        <img src={logo} className="logo-Drawer" alt="Logo" />
        <h1>북작북작</h1>
      </div>
      
      <div className="container">
        <div className="review-container" style={{ display: 'flex', alignItems: 'center' }} >
          <div className="squre" style={{ display: 'inline-block', padding: '10px', border: '1px solid black', borderRadius: '8px',  marginBottom: '2px', width: '430px', height:"30px"}}>
            <h2 className="book-title" style={{ display: 'inline', fontsize: "22px" }}>{review.bookTitle}</h2>
            <p className="rating" style={{ display: 'inline' }}>{"⭐".repeat(review.rating)}</p>
          </div>
            
          <div className="user-info" style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
            <img src={logo_user} className="logo-Drawer" alt="Logo" style={{ width: '50px', height: 'auto' }} />
            <span className="nickname" style={{ marginRight: '10px' }}>{review.nickname}</span>
            <div>
              <img src={good} className={`logo-Drawer ${liked ? 'liked' : ''}`} alt="Logo" style={{ width: '50px', height: 'auto', cursor: 'pointer' }} onClick={handleLikeClick} />
              <button style={{display: "flex"}} onClick={handleLikeClick}>
                {liked ? "❤️ 좋아요 취소" : "🤍 좋아요"}
              </button>
            </div>
          </div>
        </div>
        <div className="squre" style={{ display: 'flex', alignItems: 'left', width: "700px", height: "250px" }}>
          <div className="squre" style={{ width: "300px", height: "25px", display: 'flex', justifyContent: 'center' }}>
            <h3 className="review-title" style={{ marginTop: '4px', marginLeft: '40px' }}>
              {review.reviewTitle}
            </h3>
            <br />
          </div>

          <div className="review-content" style={{ marginTop: '10px' }}>
            <br />
            <br />
            <h3 className="review-title" >
              {review.reviewContent}
            </h3>
          </div>
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

        <div style={{ margintop: "200px", display: "flex;", marginLeft: "-1000px" }}>
          <h2>댓글</h2>
          <hr style={{ border: '1px solid black', width: '10000000px'  }} />
        </div>
        <div className="squre" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: "700px", height: "auto"  }}>
          <form onSubmit={handleSubmit} className="comment-form" style={{ width: "100%", height: "100%" }}>
            <div className="user-info" style={{ marginLeft: '20px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <img src={logo_user} className="logo-community" alt="Logo" style={{ width: '50px', height: 'auto',  justifyContent: 'flex-start' }} />
              <span className="nickname" style={{ marginRight: '10px' }}>{review.nickname}</span>
            </div>
            <input type="text" name="reviewContent" placeholder="댓글 작성하기" value={newComment} onChange={handleInputChange} required style={{ width: "680px", height: "100px", fontSize: "16px", padding: "10px" }} />
            <button type="submit">등록</button>
          </form>
          
          <ul style={{ listStyleType: "none", padding: 0, width: "100%", display: 'flex', flexDirection: 'column-reverse' }}>
            {comments?.slice().reverse().map((comment) => (
              <li key={comment.id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
                <div className="user-info" style={{ marginLeft: '20px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <img src={logo_user} className="logo-community" alt="Logo" style={{ width: '50px', height: 'auto',  justifyContent: 'flex-start' }} />
                  <span className="nickname" style={{ marginRight: '10px' }}>{review.nickname}</span>
                </div>
                <strong>{comment.nickname}</strong>: {comment.content}
                <br />
                <br />
                <button onClick={() => setReplyTo(comment.id)} >답글 달기</button>

                {replyTo === comment.id && (
                  <div>
                    <input 
                      type="text" 
                      placeholder="답글 작성하기" 
                      value={replyContent} 
                      onChange={handleReplyChange} 
                      required 
                      style={{ marginTop: "25px", padding: "5px", fontSize: "14px" }} 
                    />
                    <button onClick={() => handleReply(comment.id)}>등록</button>
                  </div>
                )}

                {comment.replies?.length > 0 && (
                  <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
                    {comment.replies.map((reply) => (
                      <li key={reply.id} style={{ border: "1px solid #eee", padding: "5px", margin: "5px 0", borderRadius: "5px" }}>
                        <strong>{reply.nickname}</strong>: {reply.content}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


// 리뷰 작성하기
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

    const [rating, setRating] = useState(0); // 기본 평점은 0
  const stars = [1, 2, 3, 4, 5]; // 5개의 별을 나타내는 배열

  const handleClick = (index) => {
    setRating(index); // 클릭한 별의 인덱스를 평점으로 설정
  };

  return (
    <div className="main-container">
      <header className="header">
        <div className="img-group">
          <img src={lamp} className="lamp" alt="lamp" />
          <img src={lamp} className="lamp" alt="lamp" />
          <img src={lamp} className="lamp" alt="lamp" />
        </div>
        <div className="nav-group">
          <div className="nav-item">
            <Link to="/Bestseller">베스트셀러</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/Test">북루미테스트</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/community">북작북작</Link>
            <img src={bookIcon} className="book-icon" alt="book icon" />
          </div>
          <div className="nav-item">
            <Link to="/myDrawer">나의 서랍</Link>
            <div className="underline"></div>
          </div>
        </div>
      </header>
      <div className="logo-container-Drawer">
        <img src={logo} className="logo-Drawer" alt="Logo" />
        <h1>북작북작</h1>
      </div>
      <div className="header_community">
      </div>  
      <div style={{ textAlign: "left", marginLeft: "450px" }}>
        <h1>리뷰 작성</h1>
      </div>
      <div class="form-container">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "10px" }}>
            <input type="text" name="bookTitle" placeholder="책 제목을 입력하세요." value={newReview.bookTitle} onChange={handleInputChange} required style={{ width: "300px", height: "30px", textAlign: "left", marginTop: "10px",backgroundColor: "#f9f6ec"}} />
            <h3>책의 평점을 매겨주세요.</h3>
          <div>
              {stars.map((star) => (
                <span key={star} onClick={() => handleClick(star)} style={{ cursor: 'pointer', fontSize: '30px', color: star <= rating ? 'gold' : 'gray', }}>★</span>
              ))}
            </div>
          </div>
          <div className="squre">
            <input type="text" name="reviewTitle" placeholder="감상평 제목" value={newReview.reviewTitle} onChange={handleInputChange} required style={{ width: "300px", height: "30px",  marginTop: "10px",backgroundColor: "#f9f6ec"}}/>
            <br />
            <input type="text" name="reviewCotent" placeholder="감상평 내용" value={newReview.reviewCotent} onChange={handleInputChange} required style={{ width: "660px", height: "195px",  marginTop: "10px",backgroundColor: "#f9f6ec"}}/>
            <div class="button-container">
              <button type="submit" class="submit-btn">작성</button>
            </div>
          </div>
              
        </form>
        <button onClick={() => setPage("main")}>취소</button>
      </div>
    </div>
  );
};

export default Community;