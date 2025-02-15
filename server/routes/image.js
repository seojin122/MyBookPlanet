const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { User } = require("../models");

const router = express.Router();

// ✅ 이미지 저장 폴더 설정
const uploadDirectory = path.join(__dirname, "../uploads");

// ✅ uploads 폴더가 없으면 생성
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// ✅ Multer 설정 (파일 저장)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const extension = path.extname(file.originalname);
        cb(null, `${timestamp}${extension}`);  // 고유한 파일명 생성
    }
});

// ✅ 파일 업로드 제한 및 필터 설정
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // 5MB 제한
    fileFilter: (req, file, cb) => {
        const allowedMimes = ["image/jpeg", "image/png", "image/gif"];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("허용되지 않는 파일 형식입니다."), false);
        }
    }
});

// ✅ 🔥 `POST /image/profile` (프로필 이미지 업로드)
router.post("/profile", upload.single("profileImage"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "파일을 업로드 해주세요." });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "로그인이 필요합니다." });
        }

        const filePath = `/uploads/${req.file.filename}`;

        console.log(`🛠 DB 업데이트 시작: User ${req.user.id}, 이미지 경로: ${filePath}`);

        // ✅ **DB에 프로필 이미지 저장**
        const [updated] = await User.update(
            { profileImage: filePath },
            { where: { id: req.user.id } }
        );

        if (!updated) {
            console.error(`❌ User ${req.user.id} 프로필 이미지 업데이트 실패`);
            return res.status(500).json({ message: "DB 업데이트 실패" });
        }

        console.log(`✅ User ${req.user.id} 프로필 이미지 업데이트 성공`);

        // ✅ **세션 정보 갱신 (🔥 중요!)**
        req.user.profileImage = filePath;
        req.session.save(() => {  // 🚀 세션을 강제로 저장 (중요!!)
            return res.json({ success: true, profileImage: filePath });
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류" });
    }
});

// ✅ 🔥 `POST /image/upload` (게시글 이미지 업로드)
router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "파일을 업로드 해주세요." });
        }

        const filePath = `/uploads/${req.file.filename}`;
        console.log(`✅ 게시글 이미지 업로드 성공: ${filePath}`);

        res.json({ message: "파일 업로드 성공", filePath });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "서버 오류" });
    }
});

// ✅ **업로드된 이미지 접근 가능하도록 정적 파일 서빙**
router.use('/uploads', express.static(uploadDirectory));

// ✅ Multer 에러 처리
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
    }
    next(err);
});

module.exports = router;
