import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import bookIcon from "../assets/bookicon.png";
import lamp from "../assets/lamp.png";

const Bestseller= () => {
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
                <Link to="/account">베스트셀러</Link>
                <img src={bookIcon} className="book-icon" alt="book icon" />
            </div>
            <div className="nav-item">
                <Link to="/account">북루미 테스트</Link>
                <div className="underline"></div>
            </div>
            <div className="nav-item">
                <Link to="/login">북작북작</Link>
                <div className="underline"></div>
            </div>
            <div className="nav-item">
                <Link to="/myDrawer">나의 서랍</Link>
                <div className="underline"></div>
            </div>
            </div>
        </header>
        </div>
  );
};
export default Bestseller;