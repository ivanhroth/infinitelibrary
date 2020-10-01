'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.Book, { foreignKey: "bookId" });
    Review.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Review;
};
