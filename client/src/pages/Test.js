import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Main.css";
import "../styles/Test.css";
import logo from "../assets/logo.png";
import lamp from "../assets/lamp.png";
import book from '../assets/book.png';
import bookicon from '../assets/bookicon.png';
import booktest from '../assets/booktest.png';
import thinking from '../assets/thinking.png';

const questions = {
  start: {
    chapter: "Chapter 1",
    question: "오늘은 책과 함께 <br><br> 여유를 즐기고픈 날이야. <br><br> 지금 심정이 어때?",
    options: [
      { text: "🌈 상상의 나래를 펼치고 싶어!", next: "q1" },
      { text: "🧐 실용적인 배움을 얻고 싶어!", next: "q2" },
    ],
  },
  q1: {
    chapter: "Chapter 2",
    question: "어떤 이야기가 끌려?",
    options: [
      { text: "💧 감정을 깊이 느낄 수 있는 이야기", next: "q3" },
      { text: "👀 새로운 시각과 아이디어를 주는 이야기", next: "q4" },
    ],
  },
  q2: {
    chapter: "Chapter 2",
    question: "어떤 배움을 하고 싶어?",
    options: [
      { text: "🌍 세상을 더 깊이 이해하고 싶어.", next: "q5" },
      { text: "✨ 내 삶을 더 발전시키고 싶어.", next: "q6" },
    ],
  },
  q3: {
    chapter: "Chapter 3",
    question: "감정을 느끼는 방식 중 <br><br> 선호하는 걸 골라줘!",
    options: [
      { text: "💧 몰입해서 눈물 나게 만드는 이야기", result: "감성을 노래하는 이야기꾼 🎭"},
      { text: "🎈 동심의 세계에서 위로받고 싶어.", result: "꿈을 좇는 몽상가 🌌"},
    ],
  },
  q4: {
    chapter: "Chapter 3",
    question: "하고 싶은 경험을 골라줘!",
    options: [
      { text: "🎨 예술과 감각적인 것을 경험하고 싶어.", result: "창조적인 영감을 찾는 예술가 🎨" },
      { text: "🤔 철학적인 고민이나 깊은 사색을 하고 싶어.", result: "마음의 길을 걷는 철학자 🧘" },
    ],
  },
  q5: {
    chapter: "Chapter 3",
    question: "너의 관심 분야를 골라줘!",
    options: [
      { text: "🔎 인간과 사회에 대한 통찰을 원해.", result: "세상의 흐름을 읽는 사색가 🔍" },
      { text: "💰 경제 흐름이나 돈 관리에 관심 있어.", result: "변화를 이끄는 전략가 📉" },
    ],
  },
  q6: {
    chapter: "Chapter 3",
    question: "너의 관심 분야를 골라줘!",
    options: [
      { text: "🧪 과학적 지식이나 기술을 익히고 싶어.", result: "호기심 넘치는 탐구자 🧪" },
      { text: "⚡ 생활 속에서 바로 적용할 수 있는 팁이 좋아.", result: "인생을 업그레이드하는 메이커 ⚡" },
    ],
  },
};

// 각 유형별 부연 설명
const resultDescriptions = {
  "감성을 노래하는 이야기꾼 🎭": "당신은 감정을 깊이 느끼고, 이를 표현하는 데 능숙한 이야기꾼입니다. <br> 감동적인 이야기를 통해 사람들에게 위로와 영감을 줍니다.",
  "꿈을 좇는 몽상가 🌌": "당신은 상상력이 풍부하고, 꿈을 좇는 몽상가입니다. <br>동심의 세계에서 위로를 받고, 새로운 가능성을 탐구합니다.",
  "창조적인 영감을 찾는 예술가 🎨": "당신은 예술과 감각적인 경험을 통해 창조적인 영감을 찾는 예술가입니다. <br>예술을 통해 자신을 표현하고, 세상을 새롭게 바라봅니다.",
  "마음의 길을 걷는 철학자 🧘": "당신은 철학적인 고민과 깊은 사색을 통해 마음의 길을 걷는 철학자입니다. <br>삶의 의미를 탐구하고, 내면의 평화를 찾습니다.",
  "세상의 흐름을 읽는 사색가 🔍": "당신은 인간과 사회에 대한 통찰을 통해 세상의 흐름을 읽는 사색가입니다. <br>사회적 이슈에 관심이 많고, 깊이 있는 분석을 즐깁니다.",
  "변화를 이끄는 전략가 📉": "당신은 경제 흐름과 돈 관리에 관심이 많은 전략가입니다. <br>변화를 이끌고, 새로운 기회를 창출하는 데 능숙합니다.",
  "호기심 넘치는 탐구자 🧪": "당신은 과학적 지식과 기술에 대한 호기심이 넘치는 탐구자입니다. <br>새로운 지식을 습득하고, 이를 통해 세상을 이해하는 것을 즐깁니다.",
  "인생을 업그레이드하는 메이커 ⚡": "당신은 생활 속에서 바로 적용할 수 있는 팁을 좋아하는 메이커입니다. <br>실용적인 지식을 통해 자신의 삶을 업그레이드합니다.",
};

// listType에 대한 사용자 정의 이름 맵핑
const listTypes = [
  { type: "Bestseller", name: "베스트셀러" },
  { type: "ItemNewSpecial", name: "주목할 만한 신간" },
  { type: "ItemEditorChoice", name: "편집자 추천 도서" },
];

const Test = () => {
  const [currentStep, setCurrentStep] = useState("start"); // 현재 질문
  const [result, setResult] = useState(null); // 최종 결과
  const [recommendedBooks, setRecommendedBooks] = useState([]); // 추천 도서 목록
  const [isTestStarted, setIsTestStarted] = useState(false);
  const handleClick = (option) => {
    if (option.result) {
      setResult(option.result); // 결과 저장
    } else {
      setCurrentStep(option.next); // 다음 질문으로 이동
    }
  };

  // // 로그인된 사용자 정보 가져오기
  // const getUserId = () => {
  //   const userId = localStorage.getItem("userId"); // 실제 로그인 시 userId는 로컬스토리지나 상태에서 가져옵니다.
  //   console.log("userId from localStorage:", userId);
  //   return userId || "testUser"; 
  // };

  // const fetchBooklumiResult = async (userId, readerType) => {
  //   try {
  //     const response = await fetch("http://localhost:3002/api/booklumi", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ userId, readerType }),
  //     });
  
  //     const data = await response.json();
  //     console.log("Booklumi API 응답:", data);
  //   } catch (error) {
  //     console.error("Booklumi API 요청 실패:", error);
  //   }
  // };

  const fetchRecommendedBooks = async (result) => {
    const readerType = result;
    try {
      // 모든 listType에 대해 API 요청을 보냄
      const responses = await Promise.all(
        listTypes.map((list) =>
          fetch(`http://localhost:3002/api/booklist/${list.type}/${readerType}`)
        )
      );
  
      // 응답을 JSON 형식으로 변환
      const data = await Promise.all(responses.map((response) => response.json()));
      console.log("추천 도서 응답 데이터:", data);
      
      // listType별로 도서 데이터를 배열로 구분하여 저장
      const books = listTypes.reduce((acc, listType, index) => {
        acc[listType.type] = data[index].books; // 각 listType에 맞는 도서 배열을 저장
        return acc;
      }, {});

      setRecommendedBooks(books); // 추천 도서 업데이트
    } catch (error) {
      console.error("추천 도서 불러오기 실패:", error);
    }
  };
  
  // useEffect에서 `result`가 변경될 때 호출
  useEffect(() => {
    if (result) {
      //const userId = getUserId(); // 로그인 상태 확인 
      //fetchBooklumiResult(userId, result);
      fetchRecommendedBooks(result);
    }
  }, [result]);
  
  const startTest = () => {
    setIsTestStarted(true);
    setCurrentStep("start");
    setResult(null);
    setRecommendedBooks([]);
  };

  const resetTest = () => {
    setIsTestStarted(false);
    setCurrentStep("start");
    setResult(null);
    setRecommendedBooks([]);
  };

    return (
      <div className="Test">
        <header className="header">
          <div className="img-group">
            <img src={lamp} className="lamp" alt="lamp" />
            <img src={lamp} className="lamp" alt="lamp" />
            <img src={lamp} className="lamp" alt="lamp" />
          </div>
          <div className="nav-group">
            <div className="nav-item">
              <Link to="/Bestseller">베스트셀러</Link>
              <div className="underline"></div>
            </div>
            <div className="nav-item">
              <Link to="/Test">북루미테스트</Link>
              <img src={bookicon} className="book-icon" alt="book icon" />
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

        <div className="logo-container-Test">
          <img src={logo} className="logo" alt="Logo" />
          <h1>북루미테스트</h1>
        </div>

        <div className="test-container">
          <div className="start-section">
            {!isTestStarted ? (
              <div className="test-intro">
                <div className="test-intro-text">
                  <p>당신이 어떤 북루미인지 9가지 유형으로 분류해주는 테스트입니다.</p>
                  <p>‘시작하기'를 눌러 테스트를 진행하세요!</p>
                </div>
                <div className="test-intro-icons">
                <div className="test-image-container">
                  <img src={thinking} alt="Start Test" className="test-start-image" />
                  <div className="test-overlay-text">나는 어떤 루미일까..?</div>
                </div>
                <button onClick={startTest} className="test-start-btn">
                  <img src={book} alt="Start Test" className="test-start-btn-img" />
                  <span className="test-overlay-text">&emsp;시작&emsp;하기</span>
                </button>
              </div>
            </div>
            ) : result ? (
            <>
              <div className="result-section">
                <h2 className="result-title">나의 독서 유형은?</h2>
                <div classname="result-container">
                {Array.isArray(result) ? (
                  result.map((line, index) => (
                    <p key={index} className="result-text">{line}</p>
                  ))
                ) : (
                  <>
                  <p className="result-text">{result}</p>
                  <div className="result-description" dangerouslySetInnerHTML={{ __html: resultDescriptions[result] }} />
                  </>
                )}
                <img src={bookicon} className="logo-book-Test" alt="Logo" />
                <>
                <button className="reset-btn" onClick={resetTest}>다시 검사하기</button></>
                </div>
              {/* 추천 도서 표시 */}
              <h3 className="recommend-title">나를 위한 추천 도서</h3>
              {Object.keys(recommendedBooks).length > 0 ? (
                  <div className="book-categories">
                  {/* listTypes 순서대로 각 카테고리별 도서 목록 출력 */}
                  {listTypes.map((listType) => (
                      <div key={listType.type} className="book-category">
                        <h4 className="category-title">{listType.name}</h4>
                        <div className="book-list">
                          {recommendedBooks[listType.type].map((book, index) => (
                            <div key={index} className="book-item">
                              <img src={book.coverImage} alt={book.title} className="book-cover" />
                              <strong>{book.title}</strong> 
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="loading-text">추천 도서를 불러오는 중...</p>
              )}
              </div>
            </>
          ) : (
            <>
              <div className="book-question-container">
                <img src={booktest} className="book-question" alt="Logo" />
                
                {/* 왼쪽 페이지 - 질문 */}
                <div className="left-page">
                  <h1 id="chapter">{questions[currentStep].chapter}</h1>
                  {/* <h2>{questions[currentStep].question}</h2> */}
                  <h2 className="question-content" dangerouslySetInnerHTML={{ __html: questions[currentStep].question.replace(/\n/g, "<br/>") }} />
                </div>

                {/* 오른쪽 페이지 - 선택지 */}
                <div className="option-buttons">
                  {questions[currentStep].options.map((option, index) => (
                    <button
                      key={index}
                      className="option-button"
                      onClick={() => handleClick(option)}
                    >
                      {option.text}
                    </button>
                  ))}
              </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;