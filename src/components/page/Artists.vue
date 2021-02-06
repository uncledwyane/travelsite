<template>
  <div id="artists">
      Artists
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
    @import '../scss/mixins.scss';
    #artists{
        @include display-center;
        width: 88%;
        position: absolute;
        left: 12%;
        z-index: 0;
        height: 100%;
        background: pink;
    }
</style>