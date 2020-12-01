'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    authorFirstName: DataTypes.STRING,
    authorLastName: DataTypes.STRING,
    publicationYear: DataTypes.INTEGER,
    coverImageUrl: DataTypes.STRING,
  }, {});
  Book.associate = function(models) {
    Book.hasMany(models.Review, { foreignKey: "bookId" });
  };
  return Book;
};
