const express = require("express");
const router = express.Router();
const { Post, User, Like } = require("../models"); // ✅ Like 모델 추가

// 📌 [1] 게시글 목록 조회 (GET /posts)
router.get("/", async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: User,
                as: "user",
                attributes: ["id", "nick"]
            }],
            order: [["createdAt", "DESC"]],
        });

        res.render("posts", { posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류" });
    }
});

// 📌 [2] 게시글 상세 조회 (GET /posts/:id)
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            include: [{
                model: User,
                as: "user",
                attributes: ["id", "nick"]
            }]
        });

        if (!post) {
            return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
        }

        // ✅ 현재 게시글의 좋아요 개수 가져오기
        const likeCount = await Like.count({ where: { postId: post.id } });

        // ✅ 사용자가 좋아요를 눌렀는지 확인
        let userLiked = false;
        if (req.user) {
            userLiked = await Like.findOne({ where: { postId: post.id, userId: req.user.id } });
        }

        res.render("posts_detail", { post, user: req.user, likeCount, userLiked });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류" });
    }
});

// 📌 [3] 게시글 좋아요 기능 (POST /posts/:id/like)
router.post("/:id/like", async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "로그인이 필요합니다." });
        }

        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
        }

        const existingLike = await Like.findOne({ where: { postId: post.id, userId: req.user.id } });

        if (existingLike) {
            await existingLike.destroy(); // ✅ 좋아요 취소
            return res.json({ message: "좋아요 취소", liked: false });
        } else {
            await Like.create({ postId: post.id, userId: req.user.id }); // ✅ 좋아요 추가
            return res.json({ message: "좋아요!", liked: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류" });
    }
});

module.exports = router;
