const express = require('express');
const bodyParser = require('body-parser');
const app = new express();
const cors = require('express-cors');
const mysqls = require('./mysqls');
const chalk = require('chalk');
// 导入状态码
const statusCodeEnum = require('./status_code');
const codeEnum = require('./status_code');

// 导入sql查询

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cors({
    allowedOrigins: [
        'github.com', 'google.com', 'http://localhost:3000'
    ]
}))

//设置跨域访问
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})


app.get('/alluser', function(req, res){
    console.log(chalk.yellow('+++ api: /alluser'));
    mysqls.getAllUsers().then(function (result){
        res.send(new Result(result))
    })
})


app.post('/login', function (req, res){
    console.log(chalk.yellow('+++ api: /login , params', JSON.stringify(req.body)));
    // TODO 拿到请求参数，查询users表中是否有这个用户，没有就返回2001，有就2002
    if(req.body){
        let params = req.body;
        mysqls.findByAccount(params.account).then(function (result){
            res.send(new Result(result));
        })
    }
})

app.post('/registe', function (req, res){
    console.log(chalk.yellow('+++ api: /registe, req.body', JSON.stringify(req.body)));
    if(req.body){
        let params = req.body;
        mysqls.findByAccount(params.account).then(function (result){
            let code = result.code;
            if(code == 2001){
                mysqls.registeUser(params).then(function (){
                    res.send(new Result(statusCodeEnum.INSERT_SUCCESS));
                })
            }else if(code == 2002){
                res.send(new Result(statusCodeEnum.INSERT_FAILD));
            }else{
                res.send('nothing')
            }
        }).catch(function (err){
            console.error(chalk.red(err));
        })
    }
})



app.listen(3000, function (){
    console.log('app listen on port 3000...')
})

function Result({code=1,msg='',data={}}){
    this.code=code;
    this.msg=msg;
    this.data=data;
}