<template>
  <div id="my_info">
      MyInfo
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
    @import '../scss/mixins.scss';
    #my_info{
        @include display-center;        
        width: 88%;
        position: absolute;
        height: 100%;
        z-index: 0;
        left: 12%;
        background: cyan;
    }
</style>