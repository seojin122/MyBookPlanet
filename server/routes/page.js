const express = require('express');
const { renderProfile, renderJoin, renderMain } = require('../controllers/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

const router = express.Router();

// 회원가입한 목록 가져올거야
const User = require('../models/user');

// 팔로잉, 팔로우
router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    next();
  });


router.get('/users', (req, res) => {
    User.findAll()
      .then(users => {
        console.log(users);  // 여기서 출력되는 데이터를 확인
        res.render('users', { users });  // 'users' 템플릿에 전달
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("서버 오류");
      });
  });


  
  

router.get('/profile', isLoggedIn, renderProfile);

router.get('/join', isNotLoggedIn, renderJoin);

router.get('/', renderMain);

module.exports = router;

