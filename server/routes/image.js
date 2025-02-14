const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const fs = require('fs');  // fs 모듈 추가

// 이미지 파일을 저장할 디렉토리 설정
const uploadDirectory = path.join(__dirname, '../uploads');

// uploads 폴더가 없으면 생성
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Multer 설정: 저장 위치와 파일명 규칙 지정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);  // 이미지가 저장될 디렉토리
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);  // 파일 확장자 추출
    cb(null, `${timestamp}${extension}`);  // 고유한 파일명 생성 (타임스탬프 + 확장자)
  }
});

// 업로드 제한 (파일 크기 제한, 파일 타입 제한 등)
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // 5MB 제한
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];  // 허용되는 이미지 파일 타입
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);  // 허용된 파일
    } else {
      cb(new Error('허용되지 않는 파일 형식입니다.'), false);  // 허용되지 않은 파일 형식
    }
  }
});

// 이미지 업로드 라우터
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: '파일을 업로드 해주세요.' });
  }

  // // 🔹 `req.user`가 없을 경우 에러 방지
  // if (!req.user || !req.user.id) {
  //   return res.status(401).json({ message: '인증된 사용자가 아닙니다.' });
  // }

  // 사용자 ID를 파일명에 포함시킴
  const userId = req.user.id;  // 로그인된 사용자의 ID (req.user 객체에서 가져옴)
  const originalFilename = req.file.filename; // 원래 파일명
  const newFilename = `${userId}_${originalFilename}`; // 새로운 파일명 생성 (userId_원본파일명)

  // 파일을 새로운 이름으로 저장
  const newFilePath = path.join(uploadDirectory, newFilename);
  fs.renameSync(path.join(uploadDirectory, originalFilename), newFilePath);


  // 파일이 업로드되었을 때의 로직
  const filePath = `/uploads/${req.file.filename}`;  // 저장된 파일의 경로
  res.json({ message: '파일 업로드 성공', filePath: filePath });
});

// Multer 에러 처리
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
});

module.exports = router;
