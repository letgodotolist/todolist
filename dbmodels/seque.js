//sequelize 재사용을 위한 파일
const Sequelize = require('sequelize');
require("dotenv").config();


const sequelize = new Sequelize('unsplash', 'root', process.env.MYSQL_PASSWORD, {
	host: '127.0.0.1',
	dialect: 'mysql',
	logging: false,
	define: {
		charset: 'utf8',
		collate: 'utf8_general_ci',
	},
	pool: {
		max: 5, 	//db 접속자 최대 숫자
		min: 0,
		acquire: 30000,
		idle: 5000,
	},
}); //sequelize 정의

// UserLogin Table 생성 함수 정의
const UserLoginTable = (sequelize, DataTypes) => {
	return sequelize.define('user', {
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
        
	
	},
	//sequelize table 설정 및 등등
	{
		classMethods: {},
		tablesName: "user",
		freezeTableName: true,
		underscored: true,
		timesettamps: false,
        
	});
};

// UserLogin Table 생성 함수 정의

const User = UserLoginTable(sequelize, Sequelize.DataTypes);

sequelize
	.sync({ force: true })
	.then(() => {
		console.log(' MYSQL sequelize running ');
	})
	.catch((err) => {
		console.log('fail');
		console.log(err);
	});

module.exports = {User}