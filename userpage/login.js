var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var secretObj = require("../jwt");
const bcrypt = require('bcrypt');
require("dotenv").config();
const {User} = require('./seque');


router.use(bodyParser.urlencoded({ extended:false })); 
router.use(bodyParser.json());

router.post('/login', (req, res) => {

	console.log("login page open");

	// 로그인 되었다고 사용자에게 알려줌
	var reqemail = req.body.email;
	var reqpassword = req.body.password;

	User.findOne({
		where : {
			email : reqemail,
		
		}
	}).then(function(users)
	{
		if( users == null || users == undefined ) {
			console.log("아이디 또는 비밀번호가 잘못 입력 되었습니다.");
			res.status(412)
			var errormsg = { success: false, msg: '아이디 또는 비밀번호가 잘못 입력 되었습니다.'};

			res.json(errormsg);
			
		}
        bcrypt.compare(reqpassword, users.password).then((isMatch) => {
            if (isMatch) {
                const payload = {
                    email: users.email,
                    password: users.password,
                };
                let token = jwt.sign({
                    payload,
                },
                    secretObj.secret, //비밀키
                    {
                        expiresIn: '1m' //유지 시간
                    })
                res.cookie("User", token);
                console.log("로그인 성공 email: " + reqemail);
                var data = { success: true, msg: ' 로그인 되었습니다. ' };
                res.status(200).json({
                    data,
                    payload,
                    token: token
                });
            };

        });
    });	
		
});

router.post('/userdelete/:email', (req, res) => {
	//email 과 일치하는 row를 삭제 할것
	var reqemail = req.body.email;
    var reqpassword = req.body.password;

	User.findOne({
		where : {
			email : reqemail,
            password : reqpassword
		}

	}).then(function(data)
	{
		if( data == null || data == undefined ) {
			console.log("이메일이 존재하지 않습니다. email : "+ reqemail );
			res.status(412) ;
			var data = { success: false, msg: '이메일이 존재 하지 않습니다.'};

			res.json(data);
			
		}else{
				console.log("유저 삭제 완료 email: " + reqemail);
				res.status(200);

				User.destroy({where : {email : reqemail }})
				.then(result => {
					res.json({});
				 }).catch(err => {
					console.error(err);
				 });

				
			}
	})
});

router.get('/login', function(req, res){
	res.sendFile(__dirname + "/loginpage.html");
	console.log('login page opening!');
});

module.exports = router;