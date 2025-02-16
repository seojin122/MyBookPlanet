// import { createContext, useContext, useState } from "react";

// // 인증 컨텍스트 생성
// const AuthContext = createContext();

// // AuthProvider 컴포넌트
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     return JSON.parse(localStorage.getItem("user")) || null; // 로컬스토리지에서 로그인 상태 가져옴
//   });

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData)); // 로그인 정보 저장
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user"); // 로그아웃 시 제거
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // useAuth 훅 (로그인 정보 사용)
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
