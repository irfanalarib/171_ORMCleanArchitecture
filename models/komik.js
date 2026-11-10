const { type } = require("node:os")

module.exports = (sequelize, DataTypes) => {
  const Komik = sequelize.define('Komik', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    judul: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    author: {
        type: DataTypes.STRING,
    }
    });
    return Komik;
}