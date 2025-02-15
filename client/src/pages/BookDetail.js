import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/BookDetail.css";
import bookIcon from "../assets/bookicon.png";
import lamp from "../assets/lamp.png";
import logo from "../assets/logo.png";
import axios from "axios";

const BookDetail = () => {
  const { title } = useParams(); // URL에서 title 가져오기
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(`/book/bestseller`);
        const books = response.data.item || response.data;

        // title이 일치하는 책 찾기 
        const foundBook = books.find(b => decodeURIComponent(b.title) === decodeURIComponent(title));
        setBook(foundBook);
      } catch (error) {
        console.error("책 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchBookDetail();
  }, [title]);

  if (!book) {
    return <p>책 정보를 찾을 수 없습니다.</p>;
  }

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
            <Link to="/bestseller">베스트셀러</Link>
            <img src={bookIcon} className="book-icon" alt="book icon" />
          </div>
          <div className="nav-item">
            <Link to="/test">북루미 테스트</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/community">북작북작</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/myDrawer">나의 서랍</Link>
            <div className="underline"></div>
          </div>
        </div>
        <button className="logout-btn">👤 로그아웃</button>
      </header>



      <div className="bestseller-section">
        <div className="bestseller-header">
          <Link to="/">
            <img src={logo} className="logo" alt="로고" />
          </Link>

          <h2>도서 정보</h2>
          </div>

<div className="book-detail">
<img src={book.cover} alt={book.title} className="book-cover" />

<div className="information">
<div className="book-information">
<h2 className="book-detail-title">{book.title}</h2>
<p className="author"><strong></strong> {book.author},</p>
<p className="publisher"><strong></strong> {book.publisher}</p>
</div>
<hr></hr>
<p className="intro"><strong></strong> {book.description}</p>
</div>
</div>


</div>
</div>
  );
};

export default BookDetail;
