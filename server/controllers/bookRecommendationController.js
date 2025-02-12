/* controllers/bookRecommendationController.js */

/* 사용자가 선택한 도서 유형(bookType)을 받아 알라딘 API에서 관련 책을 가져와 추천 */

// 알라딘 API 호출 함수 (카테고리 기반)
const { getBooksByType } = require("../services/aladinApiService");

// 사용자가 요청한 도서 유형(bookType)을 받아 해당 카테고리의 책을 추천하는 함수 
const recommendBooks = async (req, res) => {
    const { bookType } = req.params;  // URL 파라미터에서 bookType 값 가져오기 

    if (!bookType) {
        return res.status(400).json({ error: "도서 분야 정보가 필요합니다." });
    }

    try {
        // 올바른 카테고리 기반 추천 API 호출
        const books = await getBooksByType(bookType);
        
        res.json({
            message: books.length ? "추천된 책 목록" : "해당 분야의 추천 도서를 찾을 수 없습니다.",
            bookType,
            books: books.sort(() => Math.random() - 0.5).slice(0, 4) // 랜덤 4개 선택
        });

    } catch (error) {
        console.error("책 추천 중 오류 발생:", error);
        res.status(500).json({ error: "책 추천 중 오류 발생", details: error.message });
    }
};

module.exports = { recommendBooks };
