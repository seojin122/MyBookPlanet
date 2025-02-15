import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/MyDrawer.css';
import logo from "../assets/logo.png";
import lamp from '../assets/lamp.png';
import logo_user from '../assets/user.png';
import book from '../assets/book.png';
import bookicon from '../assets/bookicon.png';

const MyDrawer = () => {
  const [profile, setProfile] = useState({
    nickname: "닉네임",
    introduction: localStorage.getItem("introduction") || "📖 활기 넘치는 탐구자입니다!", // localStorage에서 가져오기  // 한 줄 소개
    following: 120, 
    followers: 350, 
  });

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState(profile.nickname);

  const [isEditingIntroduction, setIsEditingIntroduction] = useState(false);
  const [newIntroduction, setNewIntroduction] = useState(profile.introduction);

  const handleEditNickname = () => {
    setIsEditingNickname(true);
  };

  const handleCancelNickname = () => {
    setIsEditingNickname(false);
    setNewNickname(profile.nickname);
  };

  const handleSaveNickname = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      nickname: newNickname,
    }));
    setIsEditingNickname(false);
  };

  // profile.introduction이 변경될 때 newIntroduction도 갱신되도록 설정
  useEffect(() => {
    setNewIntroduction(profile.introduction);
  }, [profile.introduction]);

  const handleEditIntroduction = () => {
    setNewIntroduction(profile.introduction); // 현재 값으로 설정
    setIsEditingIntroduction(true);
  };

  const handleCancelIntroduction = () => {
    setIsEditingIntroduction(false);
    setNewIntroduction(profile.introduction); // 기존 값으로 복구
  };

  const handleSaveIntroduction = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      introduction: newIntroduction,
    }));
    localStorage.setItem("introduction", newIntroduction); // localStorage에 저장
    setIsEditingIntroduction(false);
  };

  const [content, setContent] = useState("MyDrawer_following");

  const handleBookClick = () => {
    setContent(content === "MyDrawer_following" ? "MyDrawer_profile" : "MyDrawer_following");
  };

  return (
    // 상단바
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
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/community">북작북작</Link>
            <div className="underline"></div>
          </div>
          <div className="nav-item">
            <Link to="/myDrawer">나의 서랍</Link>
            <img src={bookicon} className="book-icon" alt="book icon" />
          </div>
        </div>
      </header>

      <div className="logo-container-Drawer">
        <img src={logo} className="logo" alt="Logo" />
        <h1>나의 서랍</h1>
      </div>

      <div className="main-container-Drawer">
        <div className="left-section">
          <img
            src={logo_user}
            className="logo-user"
            alt="User Profile"
            onClick={handleBookClick}
          />

          {/* 닉네임 수정하기 */}
          <h3 className="greeting">
            {!isEditingNickname ? (
              <span>{profile.nickname} 님, 반가워요!</span>
            ) : (
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
              />
            )}
          </h3>

          {!isEditingNickname ? (
            <button className="nick-btn" onClick={handleEditNickname}>
              닉네임 변경하기
            </button>
          ) : (
            <div>
              <button className="nick-btn" onClick={handleSaveNickname}>
                저장
              </button>
              <button className="nick-btn" onClick={handleCancelNickname}>
                취소
              </button>
            </div>
          )}

          <img
            src={book}
            className="logo-Drawer"
            alt="Book Logo"
            onClick={handleBookClick}
          />
          {/* 책 이미지 위에 팔로잉, 팔로워수 표시 */}
          <h3 className="f-num">
            <span className="f1">팔로잉</span><span className="f2"> 팔로워</span>
            <span className="f3">{profile.following}</span><span className="f4">{profile.followers}</span>
          </h3>
        </div>

{/* 한줄소개 설정 및 수정 */}
        <div className="right-section">
          {content === "MyDrawer_following" ? (
            <div className="intro">
            <h4 className="intro-title">한 줄 소개</h4>
            <div className="intro-container">
            {!isEditingIntroduction ? (
              <p className="introduction-box">{profile.introduction}</p>
            ) : (
              <input
                type="text" 
                className="edit-input"
                value={newIntroduction}
                onChange={(e) => setNewIntroduction(e.target.value)}
              />
            )}

            {!isEditingIntroduction ? (
              <button className="edit-btn" onClick={handleEditIntroduction}>
                수정하기
              </button>
            ) : (
              <div>
                <button className="edit-btn" onClick={handleSaveIntroduction}>
                  저장
                </button>
                <button className="edit-btn" onClick={handleCancelIntroduction}>
                  취소
                </button>
              </div>
            )}
            </div>
          </div>
          ) : ( 
            // 팔로잉 팔로워 목록
            <div className="profile-details2">
              <div className="info-box">
                <h3>팔로잉/팔로워 정보</h3>
              </div>
              <div className="following-followers">
              <div className="following-section">
              <h4>팔로잉 목록</h4>
              {profile.followings && profile.followings.length > 0 ? (
                profile.followings.map((following) => (
                  <div key={following.nick}>
                    <Link to={`/myDrawer/${following.nick}`}>
                      {following.nick}
                    </Link>
                  </div>
                ))
              ) : (
                <p>팔로잉이 없습니다.</p>
              )}
            </div>

            {/* 책 이미지 클릭하면 팔로워 목록 보여줌 */}
            <div className="follower-section">
              <h4>팔로워 목록</h4>
              {profile.followersList && profile.followersList.length > 0 ? (
                profile.followersList.map((follower) => (
                  <div key={follower.nick}>
                    <Link to={`/myDrawer/${follower.nick}`}>
                      {follower.nick}
                    </Link>
                  </div>
                ))
              ) : (
                <p>팔로워가 없습니다.</p>
              )}
            </div>
              </div>
            </div>



          )}

          {/* 회원 탈퇴 버튼 */}
          <button className="delete-btn">👤 회원 탈퇴</button>
        </div>
      </div>
    </div>
  );
};

export default MyDrawer;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import '../styles/MyDrawer.css';
// import logo from "../assets/logo.png";
// import lamp from '../assets/lamp.png';
// import logo_user from '../assets/user.png';
// import book from '../assets/book.png';
// import bookicon from '../assets/bookicon.png';

// const MyDrawer = () => {
//   const [profile, setProfile] = useState({
//     nickname: "닉네임",  // 기본값 (로그인하면 변경됨)
//     introduction: "📖 활기 넘치는 탐구자입니다!",  
//     following: 120, 
//     followers: 350, 
//   });

//   // 🔹 닉네임 불러오기 (백엔드에서 가져옴)
//   useEffect(() => {
//     fetch("http://localhost:3002/api/user", {  // 백엔드 API 요청
//       method: "GET",
//       credentials: "include",  // 세션 쿠키 포함 (로그인 상태 유지)
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.nickname) {
//           setProfile((prevProfile) => ({
//             ...prevProfile,
//             nickname: data.nickname,  // 닉네임 업데이트
//           }));
//         }
//       })
//       .catch((error) => console.error("닉네임 불러오기 오류:", error));
//   }, []);

//   return (
//     <div className="MyDrawer">
//       <header className="header">
//         <div className="img-group">
//           <img src={lamp} className="lamp" alt="lamp" />
//           <img src={lamp} className="lamp" alt="lamp" />
//           <img src={lamp} className="lamp" alt="lamp" />
//         </div>
//         <div className="nav-group">
//           <div className="nav-item">
//             <Link to="/Bestseller">베스트셀러</Link>
//             <div className="underline"></div>
//           </div>
//           <div className="nav-item">
//             <Link to="/Test">북루미테스트</Link>
//             <div className="underline"></div>
//           </div>
//           <div className="nav-item">
//             <Link to="/community">북작북작</Link>
//             <div className="underline"></div>
//           </div>
//           <div className="nav-item">
//             <Link to="/myDrawer">나의 서랍</Link>
//             <img src={bookicon} className="book-icon" alt="book icon" />
//           </div>
//         </div>
//       </header>

//       <div className="logo-container-Drawer">
//         <img src={logo} className="logo" alt="Logo" />
//         <h1>나의 서랍</h1>
//       </div>

//       <div className="main-container-Drawer">
//         <div className="left-section">
//           <img
//             src={logo_user}
//             className="logo-user"
//             alt="User Profile"
//           />

//           {/* 🔹 로그인한 유저의 닉네임 표시 */}
//           <h3 className="greeting">
//             <span>{profile.nickname} 님, 반가워요!</span>
//           </h3>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyDrawer;
