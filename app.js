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

/**
 * 用户相关接口
 */

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
            console.log(result);
            if(result.code == 2001){
                res.send(new Result(statusCodeEnum.USER_NO_EXSIT))
            }else{
                mysqls.checkIsForze(params.account).then(function(isForze){
                    if(isForze == 'false'){
                        res.send(new Result(result));
                    }else{
                        res.send(new Result(statusCodeEnum.USER_HAS_FORZED))
                    }
                })
            }
        })
    }
})

app.post('/forzeuser', function(req, res){
    console.log(chalk.yellow('+++ api: /forzeuser , params', JSON.stringify(req.body)));
    var user_id = req.body.user_id;
    var isForze = req.body.is_forze;
    mysqls.isForzeUser(user_id, isForze).then(function(result){
        res.send(result);
    })
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

app.post('/deleteuser', function (req, res){
    console.log(chalk.yellow('+++ api: /deleteuser, req.body', JSON.stringify(req.body)));
    mysqls.deleteUserById(req.body.user_id).then(function (result){
        res.send(result);
    })
})

app.post('/modifyuser', function (req, res){
    console.log(chalk.yellow('+++ api: /modifyuser, req.body', JSON.stringify(req.body)));
})


/**
 * @description 通过user_id获取用户名
 */
app.get('/getuser', function (req, res){    
    console.log(chalk.yellow('+++ api: /getuser, req.body', JSON.stringify(req.query)));
    if(req.query){
        let params = req.query;
        mysqls.getUserByUserId(params.user_id).then(function(result){
            res.send(result);
        })
    }
})

app.get('/finduser', function (req, res){    
    console.log(chalk.yellow('+++ api: /getuser, req.body', JSON.stringify(req.query)));
    if(req.query){
        let params = req.query;
        mysqls.findByAccount(params.account).then(function(result){
            res.send(result);
        })
    }
})

app.get('/getpass', function(req, res){
    console.log(chalk.yellow('+++ api: /getpass, req.query', JSON.stringify(req.query)));
    mysqls.getPasswordByAccount(req.query.account).then(function(result){
        res.send(result);
    })
})

/**
 * @description 更改用户信息
 */
app.post('/updateuser', function (req, res){
    console.log(chalk.yellow('+++ api: /updateuser, req.body', JSON.stringify(req.body)));
    if(req.body){
        let newObj = req.body;
        console.log(newObj);
        mysqls.updateUser(newObj).then(function (result){
            res.send(result);
        })
    }
})

app.post('/adduser', function (req, res){
    console.log(chalk.yellow('+++ api: /adduser, req.body', JSON.stringify(req.body)));
    if(req.body){
        let params = req.body;
        mysqls.findByAccount(params.account).then(function (result){
            let code = result.code;
            if(code == 2001){
                mysqls.addUser(params).then(function (){
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


/**
 * 帖子相关接口
 */
app.post('/pushpost', function (req, res){
    console.log(chalk.yellow('+++ api: /pushpost, req.body', JSON.stringify(req.body)));
    if(req.body){
        let params = req.body;
        mysqls.pushPost(params).then(function (result){
            res.send(result);
        })
    }
})

app.get('/allposts', function (req, res){
    console.log(chalk.yellow('+++ api: /allposts, req.body', JSON.stringify(req.body)));
    mysqls.getAllPosts().then(function (result) {
        res.send(result);
    })
})

app.get('/allpostslatest', function(req, res){
    console.log(chalk.yellow('+++ api: /allpostslatest, req.body', JSON.stringify(req.body)));
    mysqls.getAllPostsLatest().then(function(result){
        res.send(result);
    })
})

app.get('/postswithuser', function (req, res){
    console.log(chalk.yellow('+++ api: /postswithuser, req.body', JSON.stringify(req.query)));
    mysqls.getPostsByUserId(req.query.user_id).then(function (result) {
        res.send(result);
    })
})

app.post('/deletepost', function (req, res){
    console.log(chalk.yellow('+++ api: /deletepost, req.body', JSON.stringify(req.body)));
    mysqls.deletePostByPostId(req.body.post_id).then(function (result){
        res.send(result);
    })
})


app.post('/updatepost', function (req, res){
    console.log(chalk.yellow('+++ api: /updatepost, req.body', JSON.stringify(req.body)));
    mysqls.modifyPost(req.body).then(function (result){
        res.send(result);
    })
})

/**
 * 评论xiangg
 */
app.post('/pushcomment', function (req, res){
    console.log(chalk.yellow('+++ api: /pushcomment, req.body', JSON.stringify(req.body)));
    if(req.body){
        mysqls.pushComment(req.body).then(function (result){
            res.send(result);
        })
    }
})

app.get('/getcomment', function(req, res){
    console.log(chalk.yellow('+++ api: /getcomment, req.body', JSON.stringify(req.query)));
    mysqls.getCommentByPostId(req.query.post_id).then(function (result){
        res.send(result);
    })
})

app.get('/getcommentwithuser', function(req, res){
    console.log(chalk.yellow('+++ api: /getcommentwithuser, req.body', JSON.stringify(req.query)));
    mysqls.getCommentByUserId(req.query.user_id).then(function (result){
        res.send(result);
    })
})

app.post('/updatecomment', function(req, res){
    console.log(chalk.yellow('+++ api: /updatecomment, req.body', JSON.stringify(req.body)));
    mysqls.modifyComment(req.body).then(function (result){
        res.send(result);
    })
})

/**
 * 获取所有评论
 */
app.get('/allcomments', function(req, res){
    console.log(chalk.yellow('+++ api: /allcomments, req.body', JSON.stringify(req.query)));
    mysqls.getAllComments().then(function (result){
        res.send(result);
    })
})


app.post('/deletecomment', function(req, res){
    console.log(chalk.yellow('+++ api: /deletecomment, req.body', JSON.stringify(req.body)));
    mysqls.deleteComment(req.body.comment_id).then(function (result){
        res.send(result);
    })
})

app.get('/allstars', function(req, res){    
    console.log(chalk.yellow('+++ api: /allstars, req.body', JSON.stringify(req.query)));
    var user_id = req.query.user_id;
    mysqls.getAllStarsByUserId(user_id).then(function(result){
        res.send(result);
    })
})

app.get('/allcollects', function(req, res){
    console.log(chalk.yellow('+++ api: /allcollects, req.body', JSON.stringify(req.query)));
    var user_id = req.query.user_id;
    mysqls.getAllCollectsByUserId(user_id).then(function(result){
        res.send(result);
    })
})

app.post('/star', function(req, res){
    console.log(chalk.yellow('+++ api: /star, req.body', JSON.stringify(req.body)));
    var starObj = {
        post_id: req.body.post_id,
        user_id: req.body.user_id
    }
    var querySentence = `SELECT * FROM stars WHERE post_id=${'\'' + starObj.post_id + '\''}`;
    if(!mysqls.checkIsExsist(querySentence)){
        mysqls.excuteStar(starObj).then(function(result){
            res.send(result);
        })
    }
})

app.post('/collect', function(req, res){
    console.log(chalk.yellow('+++ api: /collect, req.body', JSON.stringify(req.body)));
    var collectObj = {
        post_id: req.body.post_id,
        user_id: req.body.user_id
    }
    mysqls.excuteCollect(collectObj).then(function(result){
        res.send(result);
    })
})

app.post('/cancelstar', function (req, res){
    console.log(chalk.yellow('+++ api: /cancelstar, req.body', JSON.stringify(req.body)));
    mysqls.cancelStar(req.body.post_id).then(function(result){
        res.send(result);
    })
})

app.post('/cancelcollect', function (req, res){
    console.log(chalk.yellow('+++ api: /cancelcollect, req.body', JSON.stringify(req.body)));
    mysqls.cancelCollect(req.body.post_id).then(function(result){
        res.send(result);
    })
})

app.get('/allcarousel', function(req, res){
    console.log(chalk.yellow('+++ api: /allcarousel, req.body', JSON.stringify(req.body)));
    mysqls.getAllCarousel().then(function (result){
        res.send(result);
    })
})

app.post('/addcarousel', function(req, res){
    console.log(chalk.yellow('+++ api: /addcarousel, req.body', JSON.stringify(req.body)));
    var imgUrl = req.body.imgUrl;
    mysqls.addCarousel(imgUrl).then(function (result){
        res.send(result);
    })
})

app.post('/deletecarousel', function(req, res){
    console.log(chalk.yellow('+++ api: /deletecarousel, req.body', JSON.stringify(req.body)));
    var imgUrl = req.body.imgUrl;
    mysqls.deleteCarousel(imgUrl).then(function (result){
        res.send(result);
    })
})

app.get('/allannounces', function(req, res){
    console.log(chalk.yellow('+++ api: /allannounces, req.body', JSON.stringify(req.body)));
    mysqls.getAllAnnounces().then(function(result){
        res.send(result)
    })
})

app.post('/modifyannounce', function(req, res){
    var announce_id = req.body.id;
    var announce_body = req.body.announceBody;
    mysqls.modifyAnnounce(announce_body, announce_id).then(function(result){
        res.send(result);
    })
})

app.post('/pushannounce', function(req, res){
    var announceBody = req.body.announceBody;
    mysqls.pushAnnounce(announceBody).then(function (result){
        res.send(result);
    })
})

app.listen(3000, function (){
    console.log('app listen on port 3000...')
})

function Result({code=1,msg='',data={}}){
    this.code=code;
    this.msg=msg;
    this.data=data;
}