import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../styles/MyDrawer.css';
import logo from "../assets/logo.png";
import lamp from '../assets/lamp.png';
import logo_user from '../assets/user.png';
import book from '../assets/book.png';
import bookicon from '../assets/bookicon.png';

const MyDrawer = () => {
  const userId = "1"; // 실제 사용자 ID

  const [profile, setProfile] = useState({
    nickname: "로딩 중...",
    followingCount: 0,
    followerCount: 0,
  });

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${userId}`)
      .then(response => {
        setProfile(response.data);
        setNewNickname(response.data.nickname); // 닉네임 변경 초기값 설정
      })
      .catch(error => console.error("사용자 정보 불러오기 실패:", error));
  }, []);

  const handleEditNickname = () => setIsEditingNickname(true);
  const handleCancelNickname = () => setIsEditingNickname(false);
  
  const handleSaveNickname = () => {
    axios.put(`http://localhost:5000/api/users/${userId}/nickname`, { nickname: newNickname })
      .then(response => {
        setProfile(prevProfile => ({ ...prevProfile, nickname: response.data.nickname }));
        setIsEditingNickname(false);
      })
      .catch(error => console.error("닉네임 변경 실패:", error));
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
            <Link to="/Bestseller">베스트셀러</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/Test">북루미테스트</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/community">북작북작</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/myDrawer">나의 서랍</Link>
            <img src={bookicon} className="book-icon" alt="book icon" />
          </div>
        </div>
      </header>

      <div className="logo-container-Drawer">
        <img src={logo} className="logo" alt="Logo" />
        <h1>나의 서랍</h1>
      </div>

      <div className="main-container-Drawer">
        <div className="left-section">
          <img src={logo_user} className="logo-user" alt="User Profile" />

          {/* 닉네임 수정 */}
          <h3 className="greeting">
            {!isEditingNickname ? (
              <span>{profile.nickname} 님, 반가워요!</span>
            ) : (
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
              />
            )}
          </h3>

          {!isEditingNickname ? (
            <button className="nick-btn" onClick={handleEditNickname}>
              닉네임 변경하기
            </button>
          ) : (
            <div>
              <button className="nick-btn" onClick={handleSaveNickname}>
                저장
              </button>
              <button className="nick-btn" onClick={handleCancelNickname}>
                취소
              </button>
            </div>
          )}

          <img src={book} className="logo-Drawer" alt="Book Logo" />
          
          {/* 팔로잉/팔로워 수 표시 */}
          <h3 className="f-num">
            <span className="f1">팔로잉</span><span className="f2"> 팔로워</span>
            <span className="f3">{profile.followingCount}</span>
            <span className="f4">{profile.followerCount}</span>
          </h3>
        </div>

        <div className="right-section">
          <div className="intro">
            <h4 className="intro-title">한 줄 소개</h4>
            <div className="intro-container">
              <p className="introduction-box">📖 활기 넘치는 탐구자입니다!</p>
            </div>
          </div>

          <button className="delete-btn">👤 회원 탈퇴</button>
        </div>
      </div>
    </div>
  );
};

export default MyDrawer;
