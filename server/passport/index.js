const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      console.log('🔹 deserializeUser 호출됨. 사용자 ID:', id);

      const user = await User.findOne({
        where: { id },
        include: [
          {
            model: User,
            attributes: ['id', 'nick'],
            as: 'Followers',
          },
          {
            model: User,
            attributes: ['id', 'nick'],
            as: 'Followings',
          },
        ],
      });

      if (!user) {
        console.log("❌ 사용자 정보를 찾을 수 없습니다. ID:", id);
        return done(null, false);
      }

      console.log("✅ 사용자 정보 복원 완료:", user.nick);
      return done(null, user);
    } catch (error) {
      console.error("🔥 `deserializeUser` 오류 발생:", error);
      return done(error);
    }
  });

  local();
};
