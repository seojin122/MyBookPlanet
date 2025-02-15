const express = require("express");
const cors = require("cors");  // CORS 미들웨어 추가
const router = express.Router();
const { User, BooklumiTest } = require("../models");  // 모델 import

// CORS 설정 추가
/*
router.use(cors({
    origin: "*",
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
}));*/

router.post("/", async (req, res) => {
    try {
        console.log(req.body);  // 로그를 찍어서 요청 데이터를 확인
        
        const { userId, readerType } = req.body;

        // 서버에 readerType 저장
        const result = await BooklumiTest.create({
            readerType,                  // 독자 유형
        });

        // User와 BooklumiTest를 다대다 관계로 연결
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // 연결
        await user.addBooklumiTest(result);  // 중간 테이블을 통해 다대다 관계 연결

        // 응답 반환
        res.json({
            message: "설문 결과가 저장되었습니다.", // 성공 메시지
            booklumiId: result.id,                // 생성된 설문 결과의 고유 ID
            readerType                            // 저장된 독자 유형
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "설문 저장 중 오류 발생" });
    }
});

module.exports = router;
