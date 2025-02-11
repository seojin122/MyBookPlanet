import React from "react";
import { Link } from "react-router-dom";
import "../styles/Main.css";
import logo from "../assets/logo.png";

const Main = () => {
  return (
    <div className="main-container">
      <header className="header">
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

        <button className="logout-btn">👤 로그아웃</button>
      </header>

      <div className="logo-container">
        <img src={logo} className="logo" />
        <h1>My Book Planet</h1>
      </div>

      <div className="button-group">
        <Link to="/bestseller" className="btn brown">이달의 베스트셀러</Link>
        <Link to="/test" className="btn green">북루미 테스트</Link>
        <Link to="/create" className="btn brown">북작북작</Link>
      </div>
    </div>
  );
};

export default Main;
