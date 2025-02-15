import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/BookDetail.css";
import { Link, useNavigate } from "react-router-dom";
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
      </header>

    <div className="book-detail">
      <h2>{book.title}</h2>
      <img src={book.cover} alt={book.title} className="book-cover" />
      <p><strong>저자:</strong> {book.author}</p>
      <p><strong>설명:</strong> {book.description}</p>
    </div>
    </div>
  );
};

export default BookDetail;