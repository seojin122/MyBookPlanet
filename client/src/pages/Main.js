import React from "react";
import { Link } from "react-router-dom";
import "../styles/Main.css";
import logo from "../assets/logo.png";
import lamp from "../assets/lamp.png";

const Main = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'GET',
        credentials: 'include', // 쿠키 포함
      });
      if (response.ok) {
        alert('로그아웃 되었습니다.');
        localStorage.removeItem('token'); // 필요 시 토큰 삭제
        window.location.href = '/'; // 메인 페이지로 이동
      } else {
        alert('로그인 상태가 아닙니다.');
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
      alert('서버 오류');
    }
  };

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
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/login">로그인</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/myDrawer">나의 서랍</Link>
            <div className="underline">
        </div> </div>
        </div>

        <button className="logout-btn"  onClick={handleLogout}>👤 로그아웃</button>
      </header>

      <div className="logo-container">
        <img src={logo} className="logo" />
        <h1>My Book Planet</h1>
      </div>

      <div className="button-group">
        <Link to="/bestseller" className="btn brown">베스트셀러</Link>
        <Link to="/test" className="btn green">북루미 테스트</Link>
        <Link to="/community" className="btn brown">북작북작</Link>
      </div>
    </div>
  );
};

export default Main;
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Main.css";
import logo from "../assets/logo.png";
import lamp from "../assets/lamp.png";

const Main = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'GET',
        credentials: 'include', // 쿠키 포함
      });
      if (response.ok) {
        alert('로그아웃 되었습니다.');
        localStorage.removeItem('token'); // 필요 시 토큰 삭제
        window.location.href = '/'; // 메인 페이지로 이동
      } else {
        alert('로그인 상태가 아닙니다.');
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
      alert('서버 오류');
    }
  };

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
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/login">로그인</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/myDrawer">나의 서랍</Link>
            <div className="underline">
        </div> </div>
        </div>

        <button className="logout-btn"  onClick={handleLogout}>👤 로그아웃</button>
      </header>

      <div className="logo-container">
        <img src={logo} className="logo" />
        <h1>My Book Planet</h1>
      </div>

      <div className="button-group">
        <Link to="/bestseller" className="btn brown">베스트셀러</Link>
        <Link to="/test" className="btn green">북루미 테스트</Link>
        <Link to="/community" className="btn brown">북작북작</Link>
      </div>
    </div>
  );
};

export default Main;