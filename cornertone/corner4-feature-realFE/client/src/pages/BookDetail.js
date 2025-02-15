import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Bestseller.css";
import bookIcon from "../assets/bookicon.png";
import lamp from "../assets/lamp.png";
import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Bestseller = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allBooks, setAllBooks] = useState([]);

  const navigate = useNavigate();

  // 📌 베스트셀러 목록 가져오기
  const fetchBestseller = async () => {
    try {
      const response = await axios.get('/book/bestseller');
      console.log('📌 받아온 데이터:', response.data);
      setBooks(response.data.item); // 백엔드에서 반환한 item 배열 사용
      setAllBooks(response.data.item);
    } catch (error) {
      console.error("베스트셀러 목록을 가져오는 중 오류 발생:", error);
    }
  };

  // 📌 검색 기능
  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setBooks(allBooks);
    } else {
      try {
        const response = await axios.get(`/book/search?query=${searchTerm}`);
        console.log('📌 검색 결과:', response.data);
        setBooks(response.data);
      } catch (error) {
        console.error("검색 중 오류 발생:", error);
      }
    }
  };

  // 📌 페이지 로드 시 베스트셀러 목록 가져오기
  useEffect(() => {
    fetchBestseller();
  }, []);

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

      <div className="bestseller-section">
        <div className="bestseller-header">
          <Link to="/">
            <img src={logo} className="logo" alt="로고" />
          </Link>
          <h2>이달의 베스트셀러</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
        </div>

        <div className="book-list">
          {books.length > 0 ? (
            books.map((book, index) => (
              <div key={index} className="book-item">
                <span className="rank">{index + 1}</span>
                <img 
                  src={book.cover} 
                  alt={book.title} 
                  className="book-cover" 
                  onClick={() => navigate(`/book/${encodeURIComponent(book.title)}`)}
                  style={{ cursor: "pointer" }}
                />
                <p 
                  className="book-title"
                  onClick={() => navigate(`/book/${encodeURIComponent(book.title)}`)}
                  style={{ cursor: "pointer" }}
                >
                  {book.title}
                </p>
                <p className="book-author">{book.author}</p>
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  자세히 보기
                </a>
              </div>
            ))
          ) : (
            <p className="no-results">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bestseller;
