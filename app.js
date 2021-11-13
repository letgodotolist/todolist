var express = require('express');
var bodyParser = require('body-parser');
var userlogin = require('./userpage/login');
var todolist = require('./todopage/todo');

var app = express();


app.use(bodyParser.urlencoded({ extended:false })); 
app.use(bodyParser.json());
app.use('/todomain', userlogin);
app.use('/todolist', todolist);


// 찾을 수 없는 홈페이지에 접속 했을 때 호출 되는 404 미들웨어
app.use(function(req, res, next) {
	res.status(404).send('can not found 404');
});

// 에러가 나면 호출되는 에러 미들웨어
app.use(function(err, req, res, next) {
	console.error(err.stack)
	res.status(500).send('Something broken');
});

app.listen(process.env.PORT, function() {
    console.log("server running");
});