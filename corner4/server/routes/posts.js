const express = require("express");
const router = express.Router();

// ✅ Sequelize 모델 임포트 (DB 연동 가능)
const { Post, User } = require("../models");

// 📌 [1] 게시글 목록 조회 (GET /posts)
// 📌 [1] 게시글 목록 조회 (GET /posts)
router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: User,
                as: "user", // ✅ 별칭 명시
                attributes: ["nick"]
            }],
            order: [["createdAt", "DESC"]],
        });

        res.render("posts", { posts }); // HTML 렌더링
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류" });
    }
});


// 📌 [2] 게시글 작성 페이지 (GET /posts/new)
router.get("/new", (req, res) => {
    if (!req.user) {
        return res.redirect("/auth/login"); // 로그인하지 않은 경우 로그인 페이지로 이동
    }
    res.render("posts_create", { user: req.user });
});

// 📌 [3] 게시글 작성 (POST /posts)
router.post("/", async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "로그인이 필요합니다." });
        }

        const { bookTitle, reviewTitle, rating } = req.body;
        const newPost = await Post.create({
            bookTitle,
            reviewTitle,
            rating: Number(rating),
            userId: req.user.id, // 현재 로그인한 사용자의 ID 저장
        });

        res.redirect("/posts"); // 저장 후 게시글 목록으로 이동
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류" });
    }
});

module.exports = router;
