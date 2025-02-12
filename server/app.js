const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks');
const passport = require('passport');

dotenv.config();
const pageRouter = require('./routes/page');
const { sequelize } = require('./models');
const authRouter = require('./routes/auth');
const passportConfig = require('./passport');
const userRouter = require('./routes/user');

const { User } = require('./models'); // User 모델을 임포트
const { Follow } = require('./models');  // Follow 모델 임포트
const { Intro } = require('./models');  // Intro 모델 임포트

const app = express();
app.set('port', process.env.PORT || 3002);

passportConfig(); // 패스포트 설정

// 템플릿 엔진 설정
app.set('view engine', 'html');
nunjucks.configure('views', { 
  express: app,
  watch: true,
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

  //미들웨어 설정
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);

// 동적 렌더링
const fs = require('fs');

app.get('/:page', (req, res) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, 'views', `${page}.html`);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send('Page not found');
    } else {
      res.render(page);  // 해당 페이지를 렌더링
    }
  });
});


// 로그인 페이지(GET 요청)
// app.get('/join', (req, res) => {
//   // 쿼리 파라미터에 error=true가 있을 때, 로그인 실패 메시지를 보여주기 위해 전달
//   const error = req.query.error === 'true'; // error가 true일 때 실패 메시지 표시
//   res.render('views/join', { error });
// });

// 로그인 처리(POST 요청)
app.post('/join', (req, res) => {
  const { username, password } = req.body;
  
  // 로그인 로직 예시
  if (username !== 'user' || password !== 'password') {
    return res.redirect('/join?error=true');  // 실패 시, error=true 쿼리 파라미터와 함께 리다이렉트
  }

  // 로그인 성공 시
  res.redirect('/');
});

// 회원 목록 조회
app.get('/users', (req, res) => {
  User.findAll()
    .then(users => {
      res.render('layout', { 
        title: '회원 목록', 
        users: users,
        user: req.user,
        myId: req.user ? req.user.id : null // 로그인한 사용자의 ID
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("서버 오류");
    });
});



// 팔로우 처리
// app.post('/follow', (req, res) => {
//   const followerId = req.user.id;  // 현재 로그인한 사용자의 ID
//   const followingId = req.body.userId;  // 팔로우하려는 사용자의 ID
  
//   // 이미 팔로우 중인지 확인
//   Follow.findOrCreate({
//     where: { followerId, followingId }
//   })
//     .then(([follow, created]) => {
//       if (created) {
//         res.send('팔로우 성공');
//       } else {
//         res.send('이미 팔로우한 사용자입니다');
//       }
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).send("서버 오류");
//     });
// });


app.post('/follow', async (req, res) => {
  try {
    console.log('req.user:', req.user); // ✅ 로그 추가
    console.log('req.body:', req.body); // ✅ 로그 추가

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: '로그인이 필요합니다.' });
    }

    const followerId = req.user.id;
    const followingId = req.body.userId;

    if (!followingId) {
      return res.status(400).json({ error: '팔로우할 유저 ID가 필요합니다.' });
    }

    await Follow.create({ followerId, followingId });
    res.status(200).json({ message: '팔로우 성공!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 오류' });
  }
});



// 로그인한 사용자만 한줄소개 폼 볼수있게 하기위함
app.get('/', (req, res) => {
  res.render('main', {
    user: req.user,  // 로그인한 사용자 정보 (로그인 상태 확인용)
  });
});


// 한줄소개 저장
// app.post('/save-intro', (req, res) => {
//   const { content } = req.body;
//   const userId = req.user.id;  // 로그인된 사용자의 ID

//   // 글이 비어있는지 확인
//   if (!content) {
//     return res.status(400).send('내용을 입력해주세요.');
//   }

//   // 한줄소개 저장
//   Intro.create({
//     content,
//     userId,
//   })
//     .then(() => {
//       res.redirect('/');  // 글 작성 후 홈으로 리다이렉트
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('서버 오류');
//     });
// });




// 한줄소개 저장
app.post('/save-intro', async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;  // 로그인된 사용자의 ID

  // 글이 비어있는지 확인
  if (!content) {
    return res.status(400).send('내용을 입력해주세요.');
  }

  try {
    // 짧은 글 저장
    await Intro.create({
      content,
      userId,
    });

    // 저장된 데이터를 클라이언트로 반환
    const intros = await Intro.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']], // 최신 글 먼저 보여주기
    });

    res.status(200).json(intros);  // 저장된 모든 데이터를 클라이언트로 응답
  } catch (err) {
    console.error(err);
    res.status(500).send('서버 오류');
  }
});




app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
