const User = require('../models/user');

// exports.getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findOne({
//       where: { id: req.params.id },
//       attributes: ['id', 'nick'], // 닉네임만 가져오기
//     });

//     if (!user) {
//       return res.status(404).json({ message: "사용자를 찾을 수 없음" });
//     }

//     res.json({
//       id: user.id,
//       nickname: user.nick, // 닉네임 반환
//     });
//   } catch (error) {
//     console.error("사용자 정보 조회 오류:", error);
//     res.status(500).json({ message: "서버 오류 발생", error: error.message });
//   }
// };


// exports.getUserProfile = async (req, res) => {
//     try {
//       const user = await User.findOne({
//         where: { id: req.params.id },
//         include: [
//           { model: User, as: 'Followers', attributes: ['id', 'nick'] },
//           { model: User, as: 'Followings', attributes: ['id', 'nick'] }
//         ]
//       });
  
//       console.log("user", user);  // ✅ 유저 데이터 확인용 로그
  
//       if (!user) {
//         return res.status(404).json({ message: "사용자를 찾을 수 없음" });
//       }
  
//       res.json({
//         id: user.id,
//         nickname: user.nick,
//         followingCount: user.Followings ? user.Followings.length : 0,
//         followerCount: user.Followers ? user.Followers.length : 0,
//         followings: user.Followings,
//         followers: user.Followers
//       });
//     } catch (error) {
//       console.error("사용자 정보 조회 오류:", error);
//       res.status(500).json({ message: "서버 오류 발생", error: error.message });
//     }
//   };


// const { User } = require("../models");

//유저 프로필 가져오는 컨트롤러 함수
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },  // 🔹 현재 로그인한 사용자 ID로 조회
      include: [
        { model: User, as: "Followers", attributes: ["id", "nick"] },
        { model: User, as: "Followings", attributes: ["id", "nick"] }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.json({
      nickname: user.nick,
      introduction: user.introduction || "",
      followings: user.Followings || [],
      followers: user.Followers || []
    });
  } catch (error) {
    console.error("유저 정보 조회 오류:", error);
    res.status(500).json({ message: "서버 오류 발생" });
  }
};