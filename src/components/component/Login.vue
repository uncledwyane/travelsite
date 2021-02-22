<template>
    <div id="login-wrap">
        <div id="login" class="form" v-show="state == 'login'">
            <div class="title title-login">{{ title.login }}</div>
            <el-input v-model="account" placeholder="请输入用户名" class="form-input"></el-input>
            <el-input v-model="password" placeholder="请输入密码" show-password class="form-input"></el-input>
            <el-button type="primary" class="action-button" @click="login">登录</el-button>
        </div>
        <div id="registe" class="form" v-show="state == 'registe'">
            <div class="title title-registe" >{{ title.registe }}</div>
            <el-input v-model="username" placeholder="请输入用户名" class="form-input"></el-input>
            <el-input v-model="account" placeholder="请输入账户名称" class="form-input"></el-input>
            <el-input v-model="password" placeholder="请输入密码" class="form-input"></el-input>
            <el-date-picker
                v-model="birthday"
                type="date"
                placeholder="请选择生日"
                class="form-input">
            </el-date-picker>
            <el-button type="success" class="action-button" @click="registe">注册</el-button>
    </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
    data () {
        return {
            state: 'login',
            username: '',
            password: '',
            account: '',
            birthday: '',
            title: {
                login: '登录',
                registe: '注册 '
            }
        }
    },
    computed: {
        ...mapState([
            'isLogin'
        ])
    },
    methods: {
        ...mapMutations([
            'setLoginState'
        ]),
        login(){
            var self = this;
            if(!self.account || !self.password){
                self.$message.error('必要信息为空，请重新输入！')
            }else{
                var params = {
                    account: self.account,
                    password: self.password
                }
                self.$axios.post('/login', params).then(function (res){
                    var data = res.data;
                    if(data.code == 2001){
                        // 没有这个用户
                        self.$message.error('没有这个账户，请重新输入！');
                    }else if(data.code == 2002){
                        console.log('is esist data', data);
                        if(self.password !== data.data[0].password){
                            self.$message.error('密码错误，请重新输入！');
                        }else if(self.password === data.data[0].password){
                            self.setLoginState(true);
                            localStorage.setItem('isLogin', true);
                            localStorage.setItem('currentUser', JSON.stringify(res.data.data[0]));
                            self.$message({
                                message: '登录成功，即将跳转',
                                type: 'success'
                            })
                        }else{}
                    }
                })
            }
        },
        registe(){
            var self = this;
        }
    }
}
</script>

<style lang='scss' scoped>
    #login-wrap{
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,.2);
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2;
    }
    .form{
        width: 400px;
        background: #fff;
        box-sizing: border-box;
        padding: 20px;
        border-radius: 10px;
    }
    .form-input{
        margin-bottom: 15px;
        width: 100% !important;
    }
    .title{
        text-align: center;
        font-size: 20px;
        margin-bottom: 15px;
    }
    .action-button{
        width: 100%;
    }
</style>