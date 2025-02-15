const User = require('../models/User');

// ✅ 사용자 정보 조회 API
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, as: 'Followers', attributes: ['id', 'nick'] },
        { model: User, as: 'Followings', attributes: ['id', 'nick'] }
      ]
    });

    if (!user) return res.status(404).json({ message: "사용자를 찾을 수 없음" });

    res.json({
      id: user.id,
      nickname: user.nick,
      followingCount: user.Followings.length,
      followerCount: user.Followers.length,
      followings: user.Followings,
      followers: user.Followers
    });
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
};

// ✅ 닉네임 변경 API
exports.updateNickname = async (req, res) => {
  try {
    const { nickname } = req.body;
    const user = await User.findByPk(req.params.id);
    
    if (!user) return res.status(404).json({ message: "사용자를 찾을 수 없음" });

    user.nick = nickname;
    await user.save();

    res.json({ message: "닉네임 변경 완료", nickname });
  } catch (error) {
    res.status(500).json({ message: "닉네임 변경 실패" });
  }
};
