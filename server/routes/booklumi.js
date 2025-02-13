const express = require("express");
const router = express.Router();
const BooklumiTest = require("../models/BooklumiTest");  // 모델 import

router.post("/", async (req, res) => {
    try {
        console.log(req.body);  // 로그를 찍어서 요청 데이터를 확인

        const { userId, readerType } = req.body;

        // 서버에 readerType 저장
        const result = await BooklumiTest.create({
            userId: userId || null,     // 사용자 ID, 로그인하지 않았을 때도 검사 가능 
            readerType                  // 독자 유형 
        });

        // 응답 반환
        res.json({
            message: "설문 결과가 저장되었습니다.", // 성공 메시지
            booklumiId: result.id,                 // 생성된 설문 결과의 고유 ID
            readerType                             // 저장된 독자 유형
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "설문 저장 중 오류 발생" });
    }
});

module.exports = router;