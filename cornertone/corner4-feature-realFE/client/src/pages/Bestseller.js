import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Bestseller.css";
import bookIcon from "../assets/bookicon.png";
import lamp from "../assets/lamp.png";
import logo from "../assets/logo.png";
import axios from "axios";

// 더미 데이터터
const dummyData = [
  {
    title: "광현원의 진보를 위한 역사",
    author: "저자 A",
    cover: "https://via.placeholder.com/150",
    link: "#"
  },
  {
    title: "초역 부처님의 말",
    author: "저자 B",
    cover: "https://via.placeholder.com/150",
    link: "#"
  },
  {
    title: "소년이 온다",
    author: "저자 C",
    cover: "https://via.placeholder.com/150",
    link: "#"
  },
  {
    title: "대한민국 건국은 혁명이었다",
    author: "저자 D",
    cover: "https://via.placeholder.com/150",
    link: "#"
  },
  {
    title: "해커스 토익 VOCA",
    author: "저자 E",
    cover: "https://via.placeholder.com/150",
    link: "#"
  }
];

const Bestseller = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [allBooks, setAllBooks] = useState([]);
  const navigate = useNavigate();

  // API 호출하여 베스트셀러 목록 가져오기
  const fetchBestseller = async () => {
    try {
      const response = await axios.get('/book/bestseller', {
        headers: {
          'Cache-Control': 'no-cache', 
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
  
      console.log('받아온 데이터:', response.data); // 데이터 확인
      
      // item 배열로 데이터 저장
      const items = response.data.item || response.data; // item이 없으면 data 전체 사용
      setBooks(items); 
      setAllBooks(items); 

    } catch (error) {
      console.error("베스트셀러 목록을 가져오는 중 오류 발생:", error);
    }
  };

  // 페이지 로드 시 API 호출
  useEffect(() => {
    fetchBestseller();
  }, []);

  // 입력된 검색어로 필터링
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setBooks(allBooks);
    } else {
      const filteredBooks = allBooks.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setBooks(filteredBooks);
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
          {books && books.length > 0 ? (
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
