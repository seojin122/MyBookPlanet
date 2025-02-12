import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import bookIcon from "../assets/bookicon.png";
import lamp from "../assets/lamp.png";
//import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [error, setError] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  
  /*백엔드 연동?

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    setError(""); // 기존 에러 초기화

    try {
      const response = await axios.post("http://localhost:3002/api/login", {
        email,
        password,
      });

      console.log("로그인 성공:", response.data);

      // 로그인 성공 시, JWT 토큰을 저장
      localStorage.setItem("token", response.data.token);

      // 로그인 후 메인 페이지로 이동
      window.location.href = "/";
    } catch (err) {
      console.error("로그인 실패:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "로그인에 실패했습니다.");
    }
      */
    const handleSubmit = async (e) => {
    e.preventDefault();
    
      try {
        const MOCK_RESPONSE = {
          token: "fake-jwt-token",
          message: "로그인 성공!",
        };
    
        console.log("로그인 성공:", MOCK_RESPONSE);
        localStorage.setItem("token", MOCK_RESPONSE.token);
  
        alert("로그인 성공! 메인 페이지로 이동합니다."); // ✅ 성공 메시지 alert
        window.location.href = "/"; // ✅ 메인 페이지로 이동
      } catch (err) {
        console.error("로그인 실패:", err.message);
        alert("로그인 실패! 아이디나 비밀번호를 다시 확인하여 주세요."); // ✅ 실패 메시지 alert
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