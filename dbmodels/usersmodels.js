const { Sequelize, DataTypes } = require("sequelize/types");

const {dbUser} = require('../dbmodels/seque');

module.exports = (Sequelize, DataTypes) => {
    
    const dbUsers = Sequelize.define("Users", {

        id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			comment: 'proper id',
		},
		name: {
			type: DataTypes.STRING(40),
			allowNull: false,
			comment: 'name',
		},
		email: {
			type: DataTypes.STRING(40),
			allowNull: false,
			comment: 'user email',
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: false,
			comment: 'password',
		},
        
	
	},//sequelize table 설정 및 등등
	{
		classMethods: {},
		tablesName: "user",
		freezeTableName: true,
		underscored: true,
		timesettamps: false,
        
	});
    
    return dbUsers;
};