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
    }
}