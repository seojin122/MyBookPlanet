const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const aladinApiKey = process.env.ALADIN_API_KEY;
const aladinApiBaseUrl = "https://www.aladin.co.kr/ttb/api/ItemList.aspx";
const aladinApiSearchUrl = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx";


// ✅ [1] 베스트셀러 조회 API
router.get("/bestseller", async (req, res) => {
  const queryType = "Bestseller";
  const aladinApiUrl = `${aladinApiBaseUrl}?ttbkey=${aladinApiKey}&QueryType=${queryType}&MaxResults=10&start=1&SearchTarget=Book&output=js&Cover=Big&Version=20131101`;

  try {
    const response = await axios.get(aladinApiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("알라딘 API 요청 실패:", error);
    res.status(500).json({ error: "베스트셀러 목록을 가져오지 못했습니다." });
  }
});
// ✅ [2] 도서 검색 API
router.get("/search", async (req, res) => {
    const { query } = req.query; // 검색어 받기
    if (!query) {
      return res.status(400).json({ error: "검색어를 입력하세요." });
    }
  
    const aladinApiUrl = `${aladinApiSearchUrl}?ttbkey=${aladinApiKey}&Query=${encodeURIComponent(query)}&MaxResults=10&start=1&SearchTarget=Book&output=js&Cover=Big&Version=20131101`;
  
    try {
      const response = await axios.get(aladinApiUrl);
      const formattedBooks = response.data.item.map((book) => ({
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        pubDate: book.pubDate,
        cover: book.cover,
        link: book.link,
        price: book.priceSales,
        category: book.categoryName,
      }));
  
      res.json(formattedBooks);
    } catch (error) {
      console.error("도서 검색 API 요청 실패:", error);
      res.status(500).json({ error: "도서 검색 결과를 가져오지 못했습니다." });
    }
  });

module.exports = router;