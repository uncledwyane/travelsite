<template>
    <div id="login-wrap">
        <div id="login" class="form" v-show="state == 'login'">
            <div class="title title-login">{{ title.login }}</div>
            <el-input
                v-model="account"
                placeholder="请输入用户名"
                class="form-input"
            ></el-input>
            <el-input
                v-model="password"
                placeholder="请输入密码"
                show-password
                class="form-input"
            ></el-input>
            <el-button type="primary" class="action-button" @click="login"
                >登录</el-button
            >
            <span class="state-change" style="color: grey" @click="changeState('registe')"
                >注册</span
            >
        </div>
        <div id="registe" class="form" v-show="state == 'registe'">
            <div class="title title-registe">{{ title.registe }}</div>
            <el-input
                v-model="username"
                placeholder="请输入用户名"
                class="form-input"
            ></el-input>
            <el-input
                v-model="account"
                placeholder="请输入账户名称"
                class="form-input"
            ></el-input>
            <el-input
                v-model="password"
                placeholder="请输入密码"
                class="form-input"
            ></el-input>
            <el-date-picker
                v-model="birthday"
                type="date"
                placeholder="请选择生日"
                class="form-input"
            >
            </el-date-picker>
            <el-button type="success" class="action-button" @click="registe"
                >注册</el-button
            >
            <span class="state-change" style="color: grey" @click="changeState('login')"
                >登录</span
            >
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import bus from "@/components/bus";
export default {
    data() {
        return {
            state: "login",
            username: "",
            password: "",
            account: "",
            birthday: "",
            title: {
                login: "登录",
                registe: "注册 ",
            },
        };
    },
    computed: {
        ...mapState(["isLogin"]),
    },
    methods: {
        ...mapMutations(["setLoginState"]),
        login() {
            var self = this;
            if (!self.account || !self.password) {
                self.$message.error("必要信息为空，请重新输入！");
            } else {
                var params = {
                    account: self.account,
                    password: self.password,
                };
                self.$axios.post("/login", params).then(function (res) {
                    var data = res.data;
                    if (data.code == 2001) {
                        // 没有这个用户
                        self.$message.error("没有这个账户，请重新输入！");
                    } else if (data.code == 2002) {
                        console.log("is esist data", data);
                        if (self.password !== data.data[0].password) {
                            self.$message.error("密码错误，请重新输入！");
                        } else if (self.password === data.data[0].password) {
                            self.setLoginState(true);
                            localStorage.setItem("isLogin", true);
                            localStorage.setItem(
                                "currentUser",
                                JSON.stringify(res.data.data[0])
                            );
                            bus.$emit("loginStateChange", true);
                            bus.$emit("username", data.data[0].username);
                            self.$message({
                                message: "登录成功",
                                type: "success",
                            });
                            self.$router.push("/home");
                        } else {
                        }
                    }
                });
            }
        },
        registe() {
            var self = this;
            var params = {
                username: self.username,
                account: self.account,
                password: self.password,
                age: 0,
                birthday: self.getCurrentTime(self.birthday).split(" ")[0],
                createtime: self.getCurrentTime(),
            };
            params.age =
                new Date().getFullYear() - parseInt(params.birthday.split("-")[0]);
            console.log(params);
            if (params.username && params.account && params.password) {
                self.$axios.post("/registe", params).then(function (res) {
                    if (res.data.code == 3000) {
                        self.$message({
                            message: "注册成功，请登录！",
                            type: "success",
                        });
                        self.state = "login";
                    }
                });
            } else {
                self.$message.error("请输入必要信息！");
            }
        },
        changeState(state) {
            var self = this;
            self.state = state;
        },
        getCurrentTime(date) {
            if (!date) {
                var date = new Date();
            }
            var year = date.getFullYear();
            var month =
                date.getMonth() + 1 < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1;
            var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var minutes =
                date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var seconds =
                date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

            return (
                year +
                "-" +
                month +
                "-" +
                day +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds
            );
        },
    },
};
</script>

<style lang="scss" scoped>
#login-wrap {
    width: 100vw;
    height: 100vh;
    background: rgb(42, 47, 66);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
}
.form {
    width: 400px;
    background: #fff;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 10px;
}
.form-input {
    margin-bottom: 15px;
    width: 100% !important;
}
.title {
    text-align: center;
    font-size: 20px;
    margin-bottom: 15px;
}
.action-button {
    width: 100%;
    margin-left: 0 !important;
}
.state-change:hover {
    color: #000;
    cursor: pointer;
}
</style>
