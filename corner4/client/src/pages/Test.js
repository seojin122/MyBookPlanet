import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "../styles/Main.css";
import logo from "../assets/logo.png";
import lamp from "../assets/lamp.png";
import book from '../assets/book.png';
import bookicon from '../assets/bookicon.png';

const questions = {
  start: {
    question: "Q1. 오늘은 책과 함께 여유를 즐기고픈 날이야. 지금 심정이 어때?",
    options: [
      { text: "상상의 나래를 펼치고 싶어!", next: "q1" },
      { text: "실용적인 배움을 얻고 싶어!", next: "q2" },
    ],
  },
  q1: {
    question: "Q2. 어떤 이야기가 끌려?",
    options: [
      { text: "감정을 깊이 느낄 수 있는 이야기", next: "q3" },
      { text: "새로운 시각과 아이디어를 주는 이야기", next: "q4" },
    ],
  },
  q2: {
    question: "Q2. 어떤 배움을 하고 싶어?",
    options: [
      { text: "세상을 더 깊이 이해하고 싶어.", next: "q5" },
      { text: "내 삶을 더 발전시키고 싶어.", next: "q6" },
    ],
  },
  q3: {
    question: "Q3. 감정을 느끼는 방식 중 선호하는 걸 골라줘!",
    options: [
      { text: "몰입해서 눈물 나게 만드는 이야기", result: ["문학(소설, 시, 에세이)", "감성을 노래하는 이야기꾼 🎭"] },
      { text: "동심의 세계에서 위로받고 싶어.", result: ["아동/청소년 문학", "꿈을 좇는 몽상가 🌌"] },
    ],
  },
  q4: {
    question: "Q3. 하고 싶은 경험을 골라줘!",
    options: [
      { text: "예술과 감각적인 것을 경험하고 싶어.", result: ["예술/대중문화", "창조적인 영감을 찾는 예술가 🎨"] },
      { text: "철학적인 고민이나 깊은 사색을 하고 싶어.", result: ["종교/철학/심리", "마음의 길을 걷는 철학자 🧘"] },
    ],
  },
  q5: {
    question: "Q3. 너의 관심 분야를 골라줘!",
    options: [
      { text: "인간과 사회에 대한 통찰을 원해.", result: ["인문/사회", "세상의 흐름을 읽는 사색가 🔍"] },
      { text: "제 흐름이나 돈 관리에 관심 있어.", result: ["경제/경영", "변화를 이끄는 전략가 📉"] },
    ],
  },
  q6: {
    question: "Q3. 너의 관심 분야를 골라줘!",
    options: [
      { text: "과학적 지식이나 기술을 익히고 싶어.", result: ["과학/기술", "호기심 넘치는 탐구자 🧪"] },
      { text: "생활 속에서 바로 적용할 수 있는 팁이 좋아.", result: ["자기계발/실용서", "인생을 업그레이드하는 메이커 ⚡"] },
    ],
  },
};

const Test = () => {
  const [currentStep, setCurrentStep] = useState("start"); // 현재 질문
  const [result, setResult] = useState(null); // 최종 결과

  const handleClick = (option) => {
    if (option.result) {
      setResult(option.result); // 결과 저장
    } else {
      setCurrentStep(option.next); // 다음 질문으로 이동
    }
  };

  return (
    <div className="MyDrawer">
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
            <img src={bookicon} className="logo-Drawer" alt="Logo" />
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

      <div className="logo-container-Drawer">
        <img src={logo} className="logo-Drawer" alt="Logo" />
        <h1>북루미테스트</h1>
      </div>

      <div className="container">
        <div className="content-box">
          {result ? (
            <>
              <h2 className="result-title">당신의 독서 유형은?</h2>
              <img src={book} className="logo-book-Test" alt="Logo" />
              {result.map((line, index) => (
                <p key={index} className="result-text">{line}</p>
              ))}

            </>
          ) : (
            <>
              <h2 className="question-title">{questions[currentStep].question}</h2>
              <div className="logo-container-Drawer">
                <img src={book} className="logo-book-Test" alt="Logo" />
              </div>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Test;