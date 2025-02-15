/* routes/booklist.js */

const express = require("express");
const { getBookList } = require("../services/booklist");

const router = express.Router();

router.get("/:listType/:readerType", async (req, res) => {
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
