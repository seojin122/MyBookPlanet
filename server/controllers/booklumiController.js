/* controllers/booklumiControllers.js */

/* 독자 유형을 저장하는 API */

const BooklumiTest = require("../models/BooklumiTest");

exports.submitBooklumi = async (req, res) => {
    try {
        const { userId, bookType, categoryID, readerType } = req.body;

        // 서버에 `bookType`, `categoryID`, `readerType` 저장
        const result = await BooklumiTest.create({
            userId: userId || null,     // 사용자 ID, 로그인하지 않았을 때도 검사 가능 
            bookType,                   // 책의 유형
            categoryID,                 // 카테고리 ID 
            readerType                  // 독자 유형 
        });

        // 응답 반환
        res.json({
            message: "설문 결과가 저장되었습니다.", // 성공 메시지
            booklumiId: result.id,                 // 생성된 설문 결과의 고유 ID
            bookType,                              // 저장된 책의 유형
            categoryID,                            // 저장된 카테고리 ID
            readerType                             // 저장된 독자 유형
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "설문 저장 중 오류 발생" });
    }
};