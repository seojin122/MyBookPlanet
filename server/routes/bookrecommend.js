// /* routes/bookrecommend.js */

// const express = require("express");
// const { recommendBooks } = require("../services/bookrecommend");

// const router = express.Router();

// router.get("/:readerType/:listType", async (req, res) => {
//     const { readerType, listType } = req.params; 

//     // 필수 파라미터 검증
//     if (!readerType || !listType) {
//         return res.status(400).json({ error: "readerType과 listType이 필요합니다." });
//     }

//     try {
//         const { recommendations, error } = await recommendBooks(decodeURIComponent(readerType), listType);

//         if (error) {
//             return res.status(500).json({ error });
//         }

//         if (!recommendations || recommendations.length === 0) {
//             return res.status(404).json({ error: "추천할 도서가 없습니다." });
//         }

//         res.json({ recommendations });
//     } catch (error) {
//         console.error("도서 추천 오류:", error);
//         res.status(500).json({ error: "도서 추천을 처리하는 데 실패했습니다." });
//     }
// });

// module.exports = router;
