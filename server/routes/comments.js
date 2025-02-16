const express = require("express");
const router = express.Router();
const { Comment, User, Post } = require("../models");

// 📌 [1] 댓글 작성 (POST /comments)
router.post("/", async (req, res) => {
    try {
        const { postId, content, parentId } = req.body;

        if (!req.user) {
            return res.status(401).json({ message: "로그인이 필요합니다." });
        }

        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
        }

        const comment = await Comment.create({
            content,
            postId,
            userId: req.user.id,
            parentId: parentId || null
        });

        res.json({ message: "댓글이 작성되었습니다.", comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류" });
    }
});

// 📌 [2] 댓글 조회 (GET /comments/:postId)
router.get("/:postId", async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { postId: req.params.postId, parentId: null }, // 부모 댓글만 가져오기
            include: [
                { model: User, as: "user", attributes: ["id", "nick"] },
                { 
                    model: Comment, as: "replies",
                    include: [{ model: User, as: "user", attributes: ["id", "nick"] }]
                }
            ],
            order: [["createdAt", "ASC"]]
        });

        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류" });
    }
});

// 📌 [3] 댓글 수정 (POST /comments/:id/edit)
router.post("/:id/edit", async (req, res) => {
    try {
        const { content } = req.body;
        const comment = await Comment.findByPk(req.params.id, {
            include: [{ model: Post, as: "post" }]
        });

        if (!comment) {
            return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
        }

        // ✅ 게시글 작성자만 수정 가능
        if (req.user.id !== comment.post.userId) {
            return res.status(403).json({ message: "댓글 수정 권한이 없습니다." });
        }

        comment.content = content;
        await comment.save();

        res.json({ message: "댓글이 수정되었습니다.", comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류" });
    }
});


// 📌 [4] 댓글 삭제 (POST /comments/:id/delete)
router.post("/:id/delete", async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id, {
            include: [{ model: Post, as: "post" }]
        });

        if (!comment) {
            return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
        }

        // ✅ 게시글 작성자만 삭제 가능
        if (req.user.id !== comment.post.userId) {
            return res.status(403).json({ message: "삭제 권한이 없습니다." });
        }

        await comment.destroy();
        res.json({ message: "댓글이 삭제되었습니다." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류" });
    }
});

module.exports = router;
