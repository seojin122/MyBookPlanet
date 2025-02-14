/* services/aladinApiService.js */

/* 알라딘 API를 호출하여 도서 데이터 가져오기 */

const axios = require("axios");

// 알라딘 API 키
const TTBKey =  process.env.TTB_KEY || "ttb726iy0202001";

// 도서 카테고리 ID 매핑 
const categoryMapping = {
    "소설/시/희곡": 1,
    "청소년": 1108,
    "예술/대중 문화": 517,
    "종교/역학": 1230,
    "인문학": 656,
    "사회과학": 798,
    "경제경영": 170,
    "과학": 987, 
    "자기계발": 336 
};

// 알라딘 API에서 카테고리 ID로 도서 목록을 가져오는 함수
const getBooksByCategory = async (categoryId) => {
    // categoryId가 없는 경우 처리 
    if (!categoryId) {
        console.log('카테고리가 없습니다.');
        return [];
    }

     // 알라딘 API URL (카테고리별 베스트셀러 도서 목록 조회)
    const url = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${TTBKey}&QueryType=Bestseller&MaxResults=10&start=1&SearchTarget=Book&Output=JS&Version=20131101&CategoryId=${categoryId}`;
    try {
        // 알라딘 API 요청 
        const response = await axios.get(url);
        // 응답 데이터를 가공하여 책 정보만 반환 (책 제목, 저자, 출판사, 표지 이미지, 링크)
        return response.data.item?.map(book => ({
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            coverImage: book.cover,
            link: book.link
        })) || [];
    } catch (error) {
        console.error("알라딘 API 오류:", error);
        return [];
    }
};

// 책 추천 함수 (bookType을 받아 카테고리 ID로 변환 후 해당 카테고리의 도서 목록을 조회)
const getBooksByType = async (bookType) => {
    // bookType을 카테고리 ID로 변환
    const categoryId = categoryMapping[bookType];
    // 카테고리 ID가 유효한 경우 도서 목록을 가져오고, 없으면 빈 배열 반환
    return categoryId ? getBooksByCategory(categoryId) : [];
};

module.exports = { getBooksByType };