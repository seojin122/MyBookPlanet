const express = require('express');
const app = express();
const PORT = 3002;
const cors = require('cors');
app.use(cors());

// JSON 데이터 파싱
app.use(express.json());

// /user 경로 라우팅
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);  // 이 라인이 '/user' 경로를 연결해 줍니다

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
