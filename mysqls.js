const fs = require('fs');
const mysql = require('mysql');
const statusCodeEnum = require('./status_code')
const conf = require('./conf');
const connection = mysql.createConnection(conf);
const randomUserId = 'userId_' + parseInt((Math.random(10) * 100000000000000000000)); 
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
    registeUser: function (obj){
        //先查询
        var result = this.findByAccount(obj.account);
        let {code, msg, data} = result;
        console.log(chalk.grey('code', code, msg, data));
        return result;
    },

    generalGet: function (querySentence, statusCodeSuccess, statusCodeFaild){
        console.log(chalk.magentaBright('recived query: ', querySentence));
        return new Promise(function (resolve, reject){
            connection.query(querySentence, function (error, results, fields){
                if(error){
                    reject(error);
                }
                if(results.length > 0){
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
            })
        })
    }
}