import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ReviewDetail from "./pages/ReviewDetail";
import ReviewForm from "./pages/ReviewForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/review/:id" element={<ReviewDetail />} />
        <Route path="/write" element={<ReviewForm />} />
      </Routes>
    </Router>
  );
}

export default App;
