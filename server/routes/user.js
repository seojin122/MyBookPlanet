// const express = require('express');

// const router = express.Router();

// // GET /user 라우터
// router.get('/', (req, res) => {
//   res.send('Hello, User');
// });

// module.exports = router;


const express = require('express');

const { isLoggedIn } = require('../middlewares');
const { follow } = require('../controllers/user');
const { User } = require('../models');

const router = express.Router();

// POST /user/:id/follow
router.post('/:id/follow', isLoggedIn, follow);

// 닉네임 목록 뜨게
// router.get('/mypage', isLoggedIn, async (req, res, next) => {
//   try {
//     const users = await User.findAll({ attributes: ['nick'] }); // 닉네임만 조회
//     console.log(users); // 콘솔에 출력해서 데이터 확인
//     res.render('mypage', { users, user: req.user }); // 템플릿에 전달
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });

// const express = require('express');
// const { User } = require('../models');  // User 모델을 가져옵니다.
// const router = express.Router();

// 모든 사용자 목록 조회 (로그인한 경우에만 접근 가능)

router.get('/list', isLoggedIn, async (req, res, next) => {
  try {
    const users = await User.findAll();  // User 테이블에서 모든 사용자 조회
    res.render('layout', {  // layout.html 템플릿에 users 배열 전달
      title: '회원 목록',  // 페이지 타이틀
      users: users,      // 조회한 사용자 목록
      user: req.user      // 로그인한 사용자 정보
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


//닉네임 변경 api
router.post('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    const { newNick } = req.body;
    
    if (!newNick) {
      return res.status(400).json({ message: '닉네임을 입력하세요.' });
    }

    const existingUser = await User.findOne({ where: { nick: newNick } });
    if (existingUser) {
      return res.status(400).json({ message: '이미 존재하는 닉네임입니다.' });
    }

    await User.update({ nick: newNick }, { where: { id: req.user.id } });

    res.json({ message: '닉네임이 변경되었습니다!' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});




module.exports = router;
