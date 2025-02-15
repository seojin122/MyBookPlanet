/* routes/booklist.js */

const express = require("express");
const { getBookList } = require("../services/booklist");

const router = express.Router();

router.get("/:listType/:readerType", async (req, res) => {
    // CORS 헤더 추가
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');  // 클라이언트 주소 허용
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  // 허용할 HTTP 메서드 설정
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');  // 허용할 헤더 설정
    
    const { listType, readerType } = req.params;

    if (!listType) {
        return res.status(400).json({ error: "listType이 필요합니다." });
    }

    const books = await getBookList(listType, readerType);
    
    if (!books.length) {
        return res.status(500).json({ error: "도서를 가져오는 데 실패했습니다." });
    }

    res.json({ books });
});

module.exports = router;
