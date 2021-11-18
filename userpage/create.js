// 회원가입
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const {User} = require('./seque');


router.use(bodyParser.urlencoded({ extended:false })); 
router.use(bodyParser.json());



// db에 사용자 데이터를 넣는다 (회원가입)
router.post('/createusers', async (req, res) => {

	console.log("create user");

	const { email, password, name } = req.body;

    const exUser = await User.findOne({
		where : {
			email : req.body.email
		}

	});
		if( exUser) {
			console.log("이메일이 이미 있습니다. email : "+ req.body.email );
			res.status(412) ;
			var data = { success: false, msg: '이메일이 이미 있습니다'};

			res.json(data);
			
		}else{
            var users = User.create({
                email, password, name,

            });
                // 유저 생성이 완료된 경우
                console.log('유저가 생성되었습니다.'+ req.body.email);
                res.status(201).json(users);
                // json으로 회원 하는 아이디 비번 이름이 json으로 안나옴 오류 

            
            
				
		}
	
});



module.exports = router;