import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Account from "./pages/Account";
import MyDrawer from "./pages/MyDrawer";
import Test from "./pages/Test";
import Bestseller from "./pages/Bestseller";
import Community from "./pages/Community";
import BookDetail from "./pages/BookDetail";

function App() {
  return (
  <div className="App">
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/account" element={<Account />} />
      <Route path="/myDrawer" element={<MyDrawer />} />
      <Route path="/test" element={<Test />} />
      <Route path="/bestseller" element={<Bestseller />} />
      <Route path="/book/:title" element={<BookDetail />} />
      <Route path="/community" element={<Community />} />
    </Routes>
    </div>
  );
}
export default App;