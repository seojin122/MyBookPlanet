const User = require("../models/user");

// 로그인한 유저 정보 반환
exports.getUserProfile = async (req, res) => {
  try {
    if (!req.user) {  // 로그인 안 한 상태라면
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    // req.user는 passport.js에서 설정된 로그인한 사용자 정보
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ["nick"],  // 닉네임만 가져옴
    });

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.json({ nickname: user.nick });
  } catch (error) {
    console.error("유저 정보 가져오기 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};
