import React from "react";
import { Link } from "react-router-dom";
import "../styles/Account.css";
import bookIcon from "../assets/bookicon.png";
import lamp from "../assets/lamp.png";

const Account = () => {
  return (
    <div className="main-container">
      <header className="header">
        <div className="img-group">
        <img src={lamp} className="lamp"/>
        <img src={lamp} className="lamp" />
        <img src={lamp} className="lamp" />
        </div>
        <div className="nav-group">
          <div className="nav-item">
            <Link to="/account">회원가입</Link>
            <img src={bookIcon} className="book-icon"/>
          </div>
          <div className="nav-item">
            <Link to="/login">로그인</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/myDrawer">나의 서랍</Link>
            <div className="underline"></div>
          </div>
        </div>
      </header>

      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"

              className="login-icon"
            />
            <h2>회원가입</h2>
          </div>

          <div className="login-form">
            <label>이메일</label>
            <input type="email" className="login-input" />

            <label>닉네임</label>
            <input type="text" className="login-input" />

            <label>비밀번호</label>
            <input type="password" className="login-input" />

            <button className="login-button">회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
