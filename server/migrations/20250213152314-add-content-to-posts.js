'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("posts", "reviewTitle", { // ✅ 리뷰 제목 컬럼 추가
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn("posts", "content", { // ✅ 책 게시글 내용 컬럼 추가
      type: Sequelize.TEXT,  // ✅ 긴 글을 저장할 수 있도록 TEXT로 변경
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("posts", "reviewTitle"); // ✅ 롤백 시 reviewTitle 삭제
    await queryInterface.removeColumn("posts", "content"); // ✅ 롤백 시 content 삭제
  }
};
