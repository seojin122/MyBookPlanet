import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/MyDrawer.css';
import logo from "../assets/logo.png";
import lamp from '../assets/lamp.png';
import logo_user from '../assets/user.png';
import book from '../assets/book.png';
import bookicon from '../assets/bookicon.png';

const MyDrawer = () => {
  const [profile, setProfile] = useState({
    nickname: "닉네임",
    introduction: "안녕하세요~",
    readerType: "📖 활기 넘치는 탐구자",
    following: 120, 
    followers: 350, 
  });

  const [reviews, setReviews] = useState([
    [
      { title: "어린왕자", rating: "⭐⭐⭐⭐", comment: "감상평..." },
      { title: "성난돌아다니는소녀", rating: "⭐⭐⭐", comment: "감상평..." },
      { title: "어드벤처 타임", rating: "⭐⭐⭐⭐⭐", comment: "재밌어요!" }
    ],
    [
      { title: "호밀밭의 파수꾼", rating: "⭐⭐⭐", comment: "재밌는 이야기" },
      { title: "모비딕", rating: "⭐⭐⭐⭐", comment: "긴장감 넘침" },
      { title: "1984", rating: "⭐⭐⭐⭐⭐", comment: "강력 추천!" }
    ]
  ]);

  const [content, setContent] = useState("MyDrawer_following");

  const handleBookClick = () => {
    setContent(content === "MyDrawer_following" ? "MyDrawer_profile" : "MyDrawer_following");
  };

  return (
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
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/myDrawer">나의 서랍</Link>
            <img src={bookicon} className="logo-Drawer" alt="Logo" />
          </div>
        </div>
        <button className="logout-btn">👤 로그아웃</button>
      </header>

      <div className="logo-container-Drawer">
        <img src={logo} className="logo-Drawer" alt="Logo" />
        <h1>내서랍</h1>
      </div>

      <div className="main-container-Drawer">
        <div className="left-section">
          <img
            src={logo_user}
            className="logo-Drawer"
            alt="User Profile"
            onClick={handleBookClick}
          />
          <h3>{profile.nickname}</h3>

          <img
            src={book}
            className="logo-Drawer"
            alt="Book Logo"
            onClick={handleBookClick}
          />
          <h3>
            팔로잉: {profile.following} <br />
            팔로워: {profile.followers}
          </h3>
        </div>

        <div className="right-section">
          {content === "MyDrawer_following" ? (
            <>
              <div className="profile-details">
                <p className="introduction-box">
                  {profile.introduction}
                  <span className="reader-badge">{profile.readerType}</span>
                </p>
              </div>
              <div className="reviews">
                {reviews.map((row, rowIndex) => (
                  <div key={rowIndex} className="review-row">
                    {row.map((review, index) => (
                      <div key={index} className="review-card">
                        <div className="review-title">
                          <strong>{review.title}</strong> {review.rating}
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="profile-details2">
              <div className="info-box">
                <h3>팔로잉/팔로워 정보</h3>
              </div>
              <div className="following-followers">
                <div className="following-section">
                  <h3>팔로잉</h3>
                  <div className="logos">
                    {[...Array(6)].map((_, index) => (
                      <img
                        src={logo_user}
                        className="logo-Drawer"
                        alt={`팔로잉 로고 ${index + 1}`}
                        key={index}
                      />
                    ))}
                  </div>
                </div>

                <div className="follower-section">
                  <h3>팔로워</h3>
                  <div className="logos">
                    {[...Array(6)].map((_, index) => (
                      <img
                        src={logo_user}
                        className="logo-Drawer"
                        alt={`팔로워 로고 ${index + 1}`}
                        key={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyDrawer;