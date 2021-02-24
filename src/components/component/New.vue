<template>
  <div id="post-wrap">
      <div id="post-item">
          <div class="post-img">
              <img src="https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00447-50.jpg" class="post-image">
          </div>
          <div class="post-info">
              <div class="post-title">
                  <h3>标题</h3>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis voluptas, optio quas fuga sunt deserunt obcaecati. Minima praesentium totam itaque repellat obcaecati est facere explicabo delectus! Esse veniam dolorem unde.</p>
              </div>
              <div class="post-by">
                  <div class="location">
                      <i class="el-icon-location-outline"></i>
                      <span>上海</span>
                  </div>
                  <div class="username">
                      <span>昵称</span>
                  </div>
                  <div class="collect">
                      <img src="../../../assets/icon/star_off.png" alt="" class="collect-star" :class="{'star-on': isSelect == true}" @click="collect">
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            isSelect: false
        }
    },
    methods: {
        collect(){
            
        }
    }
}
</script>

<style lang='scss' scoped>
    #post-wrap{
        width: 70%;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 0 0 20px 0;
    }
    #post-item{
        display: flex;
        width: 100%;
        height:200px;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 10px;
        border: 1px dotted rgb(255, 123, 0);
    }
    .post-img{
        width: 40%;
    }
    .post-image{
        width: 100%;
    }
    .post-title{
        height: 150px;
    }
    .post-info{
        width: 60%;
        display: flex;
        flex-direction: column;
    }
    .post-by{
        height: 50px;
        display: flex;
    }
    .location{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 20%;
    }
    .username{
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .collect{
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
</style>