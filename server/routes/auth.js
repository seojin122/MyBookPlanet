const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');

const User = require('../models/user'); // 모델 경로에 맞게 수정

const router = express.Router();

// POST /auth/join - 회원가입 처리
router.post('/join', isNotLoggedIn, join);

// POST /auth/login - 로그인 처리
router.post('/login', isNotLoggedIn, passport.authenticate('local', {
  failureRedirect: '/auth/login',  // 로그인 실패 시 다시 로그인 페이지로 리다이렉트
  failureFlash: true,
}), (req, res) => {
  // 로그인 성공 시 / 페이지로 리다이렉트
  res.redirect('/');
});

// GET /auth/logout - 로그아웃 처리
router.get('/logout', isLoggedIn, logout);


// 회원 탈퇴

router.post("/delete", isLoggedIn, async (req, res, next) => {
  try {
    await User.destroy({
      where: { id: req.user.id }
    });

    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy(() => {
        res.json({ message: "회원 탈퇴가 완료되었습니다." });
      });
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;
