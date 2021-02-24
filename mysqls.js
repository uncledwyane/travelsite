const fs = require('fs');
const mysql = require('mysql');
const statusCodeEnum = require('./status_code')
const conf = require('./conf');
const connection = mysql.createConnection(conf);
const chalk = require('chalk');

connection.connect();

module.exports = {
    /**
     * 用户相关查询
     */
    // 获取所有用户
    getAllUsers: function (){
        var querySentence = 'SELECT * FROM users';
        var statusCodeSuccess = statusCodeEnum.SUCCESS;
        return this.generalGet(querySentence, statusCodeSuccess);
    },
    // 通过账号查找，可用于注册或者登录
    findByAccount: function(account){
        var querySentence = 'SELECT * FROM users WHERE account = \'' + account + '\'';
        var statusCodeSuccess = statusCodeEnum.USER_HAS_EXISTED;
        var statusCodeFaild = statusCodeEnum.USER_NO_EXSIT;
        return this.generalGet(querySentence, statusCodeSuccess, statusCodeFaild);
    },

    // 注册，写入数据库
    registeUser: function (user){
        let userObj = user;
        let randomUserId = 'userId_' + parseInt((Math.random(10) * 100000000000000000000));
        Object.setPrototypeOf(userObj, new Object());
        console.log('mysql registe recived params: ', userObj);
        var querySentence = `INSERT INTO users(user_id, username, account, password, age, birthday, createtime)
                            VALUES(${'\'' + randomUserId + '\''}, 
                                   ${'\'' + userObj.username + '\''}, 
                                   ${'\'' + userObj.account + '\''}, 
                                   ${'\'' + userObj.password + '\''}, 
                                   ${userObj.age}, 
                                   ${'\'' + userObj.birthday + '\''}, 
                                   ${'\'' + userObj.createtime + '\''})`;
        var statusCodeSuccess = statusCodeEnum.INSERT_SUCCESS;
        return this.generalGet(querySentence, statusCodeSuccess);
    },

    getUserByUserId: function (user_id){
        let userId = user_id;
        var querySentence = `SELECT username FROM users WHERE user_id=${'\'' + userId + '\''}`;
        var statusCodeSuccess = statusCodeEnum.USER_HAS_EXISTED;
        return this.generalGet(querySentence, statusCodeSuccess);
    },

    deleteUserById: function (user_id){
        let userId = user_id;        
        var querySentence = `DELETE FROM users WHERE user_id=${'\'' + userId + '\''}`;
        var statusCodeSuccess = statusCodeEnum.SUCCESS;
        return this.generalGet(querySentence, statusCodeSuccess);
    },

    updateUser: function (newUserObj){
        let userObj = newUserObj;
    },


    /**
     * 帖子相关查询
     */
    pushPost: function (post){
        let postObj = post;
        let postTime = this.getCurrentTime();
        let randomPostId = 'postId_' + parseInt((Math.random(10) * 100000000000000000000));
        console.log('put post: post body is: ', post);
        var querySentence = `INSERT INTO posts(user_id, post_id, post_title, post_body, post_time, post_coverimg)
                            VALUES(
                                ${'\'' + postObj.user_id + '\''},
                                ${'\'' + randomPostId + '\''},
                                ${'\'' + postObj.post_title + '\''},
                                ${'\'' + postObj.post_body + '\''},
                                ${'\'' + postTime + '\''},
                                ${'\'' + postObj.post_cover + '\''}
                                )`;
        console.log('pust post, post query sentence: ', querySentence);
        var statusCodeSuccess = statusCodeEnum.PUSH_SUCCESS;
        return this.generalGet(querySentence, statusCodeSuccess);
    },

    getAllPosts(){
        var querySentence = `SELECT * FROM posts`;
        var statusCodeSuccess = statusCodeEnum.GET_SUCCESS;
        return this.generalGet(querySentence, statusCodeSuccess);
    },

    generalGet: function (querySentence, statusCodeSuccess, statusCodeFaild){
        console.log(chalk.magentaBright('recived query: ', querySentence));
        return new Promise(function (resolve, reject){
            connection.query(querySentence, function (error, results, fields){
                if(error){
                    reject(error);
                }
                if(results && results.length > 0){
                    resolve({
                        code: statusCodeSuccess.code,
                        msg: statusCodeSuccess.msg,
                        data: results
                    })
                }else{
                    if(statusCodeFaild){
                        resolve({
                            code: statusCodeFaild.code,
                            msg: statusCodeFaild.msg
                        })
                    }
                }
                resolve();
            })
        })
    },
    getCurrentTime(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

        return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }
}