// const User = require('../models/user');

// exports.follow = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ where: { id: req.user.id } });
//     if (user) { // req.user.id가 followerId, req.params.id가 followingId
//       await user.addFollowing(parseInt(req.params.id, 10));
//       res.send('success');
//     } else {
//       res.status(404).send('no user');
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };



//쥐삐띠니

const { User } = require('../models');

exports.follow = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });

        if (!user) {
            return res.status(404).json({ message: '존재하지 않는 사용자입니다.' });
        }

        await req.user.addFollowing(user); // 시퀄라이즈의 관계 메서드 사용

        return res.status(200).json({ message: '팔로우 성공!' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
