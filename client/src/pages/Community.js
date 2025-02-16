import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../styles/Community.css';
import logo from "../assets/logo.png";
import lamp from '../assets/lamp.png';
import bookicon from '../assets/bookicon.png';
import bookIcon from '../assets/bookicon.png';
import logo_user from '../assets/user.png';
import good from '../assets/good.png';

const Community = () => {
  const [page, setPage] = useState("main");
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]); // 🔹 필터링된 리뷰 저장

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3002/posts", {
          headers: { "Content-Type": "application/json" }
        });
        setReviews(response.data);
        setFilteredReviews(response.data); // 🔹 초기 데이터 설정
      } catch (error) {
        console.error("게시글 목록 불러오기 실패:", error);
      }
    };

    fetchReviews();
  }, []);

  // 🔹 검색어 입력 시 자동 필터링
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter((review) =>
        review.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.reviewTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReviews(filtered);
    }
  }, [searchTerm, reviews]);

  return (
    <div>
      {page === "main" && (
        <MainPage
          setPage={setPage}
          setSelectedReview={setSelectedReview}
          reviews={filteredReviews}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
      {page === "form" && <ReviewForm setPage={setPage} setReviews={setReviews} />}
      {page === "detail" && <ReviewDetail setPage={setPage} review={selectedReview} />}
    </div>
  );
};

//seojin
const PostDetail = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3002/posts/${postId}`)
      .then(res => res.json())
      .then(data => {
        console.log("📌 API 응답:", data); // 🔥 응답 데이터 확인
        setPost(data);
      })
      .catch(error => console.error("🚨 API 오류:", error));
  }, [postId]);
  if (!post) return <p>Loading...</p>;
  return (
    <div>
      <h2>{post.bookTitle}</h2>
      <h3>{post.reviewTitle} (⭐ {post.rating})</h3>
      <p>{post.content}</p>
      <button onClick={() => handleLike(postId)}>❤️ {post.likes}</button>
    </div>
  );
};

// 게시글 좋아요 기능
const handleLike = (postId) => {
  fetch(`http://localhost:3002/posts/${postId}/like`, { method: 'POST' })
    .then(res => res.json())
    .then(updatedPost => console.log("Liked:", updatedPost));
};

const MainPage = ({ setPage, setSelectedReview, reviews, searchTerm, setSearchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentReviews = reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      <div className="h-container">
        <div className="search-bar">
          <div className="h-search-input">
            <input
              type="text"
              placeholder="검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // 🔹 입력할 때마다 자동 필터링
            />
          </div>
          <button className="h-write-button" onClick={() => setPage("form")}>작성하기</button>
        </div>
        <div className="review-list">
          {currentReviews.length > 0 ? (
            currentReviews.map((review) => (
              <div key={review.id} className="review-card" onClick={() => { setSelectedReview(review); setPage("detail"); }}>
                <p className="h-book-title">{review.bookTitle}</p>
                <div className="stars">{"⭐".repeat(review.rating)}</div>
                <h2 className="h-review-title">{review.reviewTitle}</h2>
                <div className="nickname">👤 {review.user?.nick ?? "알 수 없음"}</div>
              </div>
            ))
          ) : (
            <p className="no-results">검색 결과가 없습니다.</p>
          )}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

//<div className="pin">📌</div>
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

        <div style={{ margintop: "200px", display: "flex", marginLeft: "-1000px" }}>
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