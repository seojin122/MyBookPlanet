const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');


/* routes */
const booklist = require('./routes/booklist');
// const bookrecommend = require('./routes/bookrecommend');
const booklumi = require('./routes/booklumi'); 


const app = express();
app.use('/api', indexRouter);  //FE에서 작성
app.set('port', process.env.PORT || 3002);  //node 서버가 사용할 포트 번호, 리액트의 포트번호(3000)와 충돌하지 않게 다른 번호로 할당
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
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

app.use('/', indexRouter);
app.use('/user', userRouter);


/* routes */
app.use('/api/booklist', booklist);  // 도서 목록 API
// app.use('/api/bookrecommend', bookrecommend);  // 도서 추천 API
app.use('/api/booklumi', booklumi);  // booklumi API (독자 유형 저장)


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