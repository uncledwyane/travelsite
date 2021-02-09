const codeEnum = {
    SUCCESS: {
        code: 200,
        msg: 'succsss'
    },
    SOURCE_NO_EXSIT: {
        code: 404,
        msg: 'source is not exist'
    },
    SERVER_ERROR: {
        code: 500,
        msg: 'server error'
    },
    
    /* 用户错误 */
    USER_NO_EXSIT: {
        code: 2001,
        msg: 'user not exsit'
    },
    USER_HAS_EXISTED: {
        code: 2002,
        msg: 'user has exsited'
    }
}

module.exports =  codeEnum;