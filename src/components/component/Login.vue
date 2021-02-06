<template>
  <div>
      <div class="login_box">
          <div class="login_category">
              <div class="login_with_phone category_name" :class="{category_active: category == 'phone'}">手机</div>
              <div class="login_with_email category_name" :class="{category_active: category == 'email'}">邮箱</div>
          </div>
          <div class="login_phone" v-show="category == 'phone'">
              <div class="phonenumber">
                    <i class="fa phone_icon"></i>
                    <input type="number" name="phonenumber" id="phone_input" class="form_data_input">
              </div>
              <div class="password">
                  <i class="fa password_icon"></i>
                  <input type="password" id="phone_password_input" class="form_data_input">
              </div>
          </div>
          <div class="login_email" v-show="category == 'email'">
              <div class="email">
                    <i class="fa email_icon"></i>
                    <input type="email" name="email" id="email_input" class="form_data_input">
              </div>
              <div class="password">
                  <i class="fa password_icon"></i>
                  <input type="password" id="email_password_input" class="form_data_input">
              </div>
          </div>
          <div class="excute_login">
              <button class="excute_login_btn">登录</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            category: 'phone'
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../scss/theme.scss';
.login_box{
    width: 400px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $background-color-dark;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 20px;
}
.login_category {
    display: flex;
    width: 40%;
    height: 20%;
}
.login_with_phone {
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: center;
    height: 60%;
}
.login_with_email {
    display: flex;
    width: 50%;
    height: 60%;
    align-items: center;
    justify-content: center;
}
.login_phone , .login_email{
    display: flex;
    flex-direction: column;
    width: 85%;
}
.form_data_input{
    width: 100%;
    height: 40px;
    border-radius: 20px;
    outline: none;
    border: none;
    box-sizing: border-box;
    padding: 0 20px;
    background: $front-color-dark;
    color: $font-highlight-color-dark;
    font-size: 20px;
}
.excute_login{
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20%;
}
button.excute_login_btn {
    width: 40%;
    height: 40px;
    border-radius: 30px;
    border: none;
    outline: none;
    font-size: 18px;
    color: #fff;
    background: $font-highlight-color-dark;
    transition: all ease .2s;
}
button.excute_login_btn:hover{
    cursor: pointer;
}
button.excute_login_btn:active{
    border: none;
    outline: none;
    box-shadow: 0 0 15px $font-highlight-color-dark;
}
.category_name{
    color: $font-highlight-color-dark;
    height: 30px;
    border-radius: 5px;
}
.category_active{
    color: #fff;
    // background:  $font-highlight-color-dark;
    border: 2px dotted $font-highlight-color-dark;
}
</style>