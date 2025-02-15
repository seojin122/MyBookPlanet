/* services/booklist.js */

/* 알라딘 API를 호출하여 특정 타입의 도서 데이터 가져오기 */

const axios = require("axios");

// 알라딘 API 키
const TTBKey = process.env.TTB_KEY || "ttb726iy0202001";  
const BASE_URL = "https://www.aladin.co.kr/ttb/api/ItemList.aspx";

// 도서 카테고리 ID 매핑 
const categoryMapping = {
    "감성을 노래하는 이야기꾼": 1,
    "꿈을 좇는 몽상가": 1108,
    "창조적인 영감을 찾는 예술가": 517,
    "마음의 길을 걷는 철학자": 1230,
    "세상의 흐름을 읽는 사색가": 656,
    "변화를 이끄는 전략가": 170,
    "호기심 넘치는 탐구자": 987, 
    "인생을 업그레이드하는 메이커": 336 
};

/**
 * 알라딘 API를 통해 특정 타입의 도서 리스트 가져오기
 * @param {string} listType - "Bestseller", "ItemNewSpecial", "ItemEditorChoice"
 */

const getBookList = async (listType, readerType) => {
    try {
        const categoryId = categoryMapping[readerType];
        const response = await axios.get(BASE_URL, {
            params: {
                ttbkey: TTBKey,
                QueryType: listType,
                MaxResults: 20,
                Output: "JS",
                SearchTarget: "Book",
                Version: "20131101",
                CategoryId: categoryId
            },
        });

        // API 응답이 예상과 다른 경우 처리
        if (!response.data || !Array.isArray(response.data.item)) {
            console.error("알라딘 API 응답 오류:", response.data);
            return [];
        }


        const books = response.data.item.map(book => ({
            title: book.title,                      // 책 제목
            author: book.author,                    // 저자
            description: book.description || "",    // 책 소개
            coverImage: book.cover,                 // 표지 이미지
            rating: book.customerReviewRank || 0,   // 고객 리뷰 평점
            link: book.link,                        // 상세 페이지 링크
        }));

        // 평점 높은 순으로 내림차순 정렬하고, 상위 5개만 반환
        const sortedBooks = books
            .sort((a, b) => b.rating - a.rating)   // 평점 기준 내림차순 정렬
            .slice(0, 5);                          // 상위 5개만 추출

        return sortedBooks;
    } catch (error) {
        console.error(`알라딘 API 오류: ${error}`);
        return [];
    }
};

module.exports = { getBookList };