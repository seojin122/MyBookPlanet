// .env 파일에서 환경 변수를 읽어옵니다.
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Sequelize 인스턴스를 생성하고, 환경 변수로부터 데이터베이스 연결 정보를 읽습니다.
const sequelize = new Sequelize(
    process.env.DB_NAME,  // 데이터베이스 이름
    process.env.DB_USER,  // 데이터베이스 사용자명
    process.env.DB_PASSWORD, // 데이터베이스 비밀번호
    {
        host: process.env.DB_HOST,  // 데이터베이스 호스트
        dialect: 'mysql',  // 사용할 DB의 종류 (MySQL)
        logging: false, // 쿼리 로그를 출력하지 않도록 설정
    }
);

// 데이터베이스 연결 확인
sequelize.authenticate()
    .then(() => console.log('Database connected successfully!'))
    .catch(err => console.error('Unable to connect to the database:', err));

// 데이터베이스 및 테이블 동기화
sequelize.sync({ force: false })
    .then(() => console.log('Database & tables created!'))
    .catch(err => console.error('Sync Error:', err));

// Sequelize 인스턴스를 외부에서 사용 가능하도록 export
module.exports = sequelize;
