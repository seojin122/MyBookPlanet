import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import bookIcon from "../assets/bookicon.png";
import lamp from "../assets/lamp.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      }, { withCredentials: true });

      console.log("로그인 성공:", response.data);
      localStorage.setItem("token", response.data.token); // JWT 저장
      alert("로그인 성공!");
      navigate("/"); // 메인 페이지로 이동
    } catch (err) {
      console.error("로그인 실패:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "아이디 혹은 비밀번호를 다시 확인하여 주십시오.");
    }
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
            <Link to="/account">회원가입</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/login">로그인</Link>
            <img src={bookIcon} className="book-icon" alt="book icon" />
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
              alt="user icon"
            />
            <h2>로그인</h2>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>이메일</label>
            <input
              type="email"
              className="login-input"
              value={email}
              onChange={handleEmailChange}
              required
            />

            <label>비밀번호</label>
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={handlePasswordChange}
              required
            />

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-button">
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import bookIcon from "../assets/bookicon.png";
import lamp from "../assets/lamp.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      }, { withCredentials: true });

      console.log("로그인 성공:", response.data);
      localStorage.setItem("token", response.data.token); // JWT 저장
      alert("로그인 성공!");
      navigate("/"); // 메인 페이지로 이동
    } catch (err) {
      console.error("로그인 실패:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "아이디 혹은 비밀번호를 다시 확인하여 주십시오.");
    }
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
            <Link to="/account">회원가입</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/login">로그인</Link>
            <img src={bookIcon} className="book-icon" alt="book icon" />
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
              alt="user icon"
            />
            <h2>로그인</h2>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>이메일</label>
            <input
              type="email"
              className="login-input"
              value={email}
              onChange={handleEmailChange}
              required
            />

            <label>비밀번호</label>
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={handlePasswordChange}
              required
            />

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-button">
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
