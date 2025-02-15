import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Bestseller.css";
import bookIcon from "../assets/bookicon.png";
import lamp from "../assets/lamp.png";
import logo from "../assets/logo.png";
import axios from "axios";

const Bestseller = () => {
  const [books, setBooks] = useState([]); // 화면에 보여줄 책 목록
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 입력값
  const [allBooks, setAllBooks] = useState([]); // 전체 책 데이터 저장용

  // 📌 API 호출하여 베스트셀러 목록 가져오기
  const fetchBestseller = async () => {
    try {
      const response = await axios.get('/book/bestseller', {
        headers: {
          'Cache-Control': 'no-cache', 
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
  
      console.log('📌 받아온 데이터:', response.data); // 📌 데이터 확인
  
      setBooks(response.data);
      setAllBooks(response.data);
    } catch (error) {
      console.error("베스트셀러 목록을 가져오는 중 오류 발생:", error);
    }
  };
  /*
    // 📌 API 호출하여 베스트셀러 목록 가져오기
  const fetchBestseller = async () => {
    try {
      // 더미 데이터로 테스트트
      const dummyData = [
        {
          title: "황현필의 진보를 위한 역사",
          author: "황현필",
          cover: "https://image.aladin.co.kr/product/35711/76/cover200/k612036127_1.jpg",
          link: "http://www.aladin.co.kr/shop/wproduct.aspx?ItemId=357117660",
        },
        {
          title: "초역 부처의 말",
          author: "이케다 사야카",
          cover: "https://image.aladin.co.kr/product/1470/34/cover500/8997227203_1.jpg",
          link: "http://www.aladin.co.kr/shop/wproduct.aspx?ItemId=357117661",
        },
      ];
  
      setBooks(dummyData);
  
    } catch (error) {
      console.error("베스트셀러 목록을 가져오는 중 오류 발생:", error);
    }
  };
  
  useEffect(() => {
    fetchBestseller();
  }, []);
   */
  

  // 📌 페이지 로드 시 API 호출
  useEffect(() => {
    fetchBestseller();
  }, []);

  // 📌 검색 기능 (입력된 검색어로 필터링)
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setBooks(allBooks);
    } else {
      const filteredBooks = allBooks.filter((book) =>
        book.title.includes(searchTerm)
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
          {books.length > 0 ? (
            books.map((book, index) => (
              <div key={index} className="book-item">
                <span className="rank">{index + 1}</span>
                <img src={book.cover} alt={book.title} className="book-cover" />
                <p className="book-title">{book.title}</p>
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

/*BookView
endpoint : /book/bestseller
service : get_bestseller()

응답 예시 (JSON) : [
    {
    "title": "황현필의 진보를 위한 역사",
    "author": "황현필",
    "publisher": "역바연",
    "pubDate": "2025-02-07",
    "cover": "https://image.aladin.co.kr/product/35711/76/cover200/k612036127_1.jpg",
    "link": "http://www.aladin.co.kr/shop/wproduct.aspx?ItemId=357117660",
    "price": 19800,
    "category": "국내도서>역사>한국사 일반"
    }
    ]
 */