// const nori = require('nori');
// const { getBookList } = require("./booklist");
// const stopwords = require("stopword");
// const natural = require("natural");

// // 사용자 유형 설명
// const readerDescriptions = {
//     "호기심 넘치는 탐구자": "탐구 교육 미래 창작 과학 공학 기술 수학 등에 관심이 많은 사람",    
//     "창조적인 영감을 찾는 예술가": "예술과 창작을 사랑하며 감성을 자극하는 작품을 찾는 사람",
// };

// // 텍스트 전처리 함수 (비동기)
// const preprocessText = async (text) => {
//     if (!text) return "";

//     // 한글만 남기고 나머지 문자 제거
//     text = text.replace(/[^가-힣\s]/g, "");  // 한글과 공백만 남기고 제거

//     // nori의 형태소 분석: 텍스트를 분석하고 토큰을 생성
//     const tokens = await nori.tokenize(text);  // nori.tokenize() 메서드 사용
//     const words = tokens.flat().map(token => token.surfaceForm);  // 형태소 분석 결과에서 단어만 추출
//     return words.join(" ");  // 공백으로 단어들을 연결
// };

// // 벡터 크기를 맞추는 함수
// const vectorize = (tfidf, docIndex) => {
//     const vector = new Array(tfidf.documents.length).fill(0);
//     tfidf.listTerms(docIndex).forEach(term => {
//         vector[term.index] = term.tf;
//     });
//     return vector;
// };

// // 사용자 유형과 도서 설명 간 유사도를 계산하는 함수
// const cosineSimilarity = (vecA, vecB) => {
//     const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);  // 내적 계산
//     const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));  // 벡터 A의 크기
//     const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));  // 벡터 B의 크기
//     return dotProduct / (magnitudeA * magnitudeB || 1);  // 0으로 나누는 경우 방지
// };

// // 추천 도서 목록 생성
// const recommendBooks = async (readerType, listType) => {
//     // 도서 목록을 가져오기
//     const books = await getBookList(listType);
//     if (!books || books.length === 0) return { error: "도서를 가져오는 데 실패했습니다." };

//     const tfidf = new natural.TfIdf();
//     const validBooks = books.filter(book => book.description && book.description.trim() !== "");

//     // 비동기 처리: 모든 책의 텍스트를 전처리
//     const processedDescriptions = await Promise.all(validBooks.map(book => preprocessText(book.description)));

//     // TF-IDF에 도서 설명 추가
//     processedDescriptions.forEach(desc => tfidf.addDocument(desc));

//     // readerType에 대한 설명이 없으면 기본 값으로 처리
//     const readerText = readerDescriptions[readerType] || readerType;
//     const processedReaderText = await preprocessText(readerText);
//     tfidf.addDocument(processedReaderText);

//     // readerType 벡터 가져오기
//     const vecA = vectorize(tfidf, tfidf.documents.length - 1);

//     // 디버깅: readerType 벡터 출력
//     console.log(`Reader Type Vector: ${vecA}`);

//     // 각 도서와 유사도 계산
//     const similarities = validBooks.map((book, index) => {
//         const bookVector = vectorize(tfidf, index);
//         const similarity = cosineSimilarity(vecA, bookVector);

//         console.log(`Book: ${book.title}, Similarity: ${similarity}`);

//         return {
//             title: book.title,
//             similarity: similarity,
//             author: book.author,
//             coverImage: book.coverImage,
//             rating: book.rating,
//             link: book.link,
//         };
//     });

//     // 유사도 내림차순 정렬 후 상위 5개 추천
//     const recommendations = similarities.sort((a, b) => b.similarity - a.similarity).slice(0, 5);
//     console.log(`Top Recommendations: ${recommendations.map(r => r.title).join(", ")}`);

//     return recommendations.length ? { recommendations } : { error: "추천할 도서가 없습니다." };
// };

// module.exports = { recommendBooks };
