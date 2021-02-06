<template>
  <div id="album">
      Album
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
    @import '../scss/mixins.scss';
    #album{
        @include display-center;
        width: 88%;
        position: absolute;
        height: 100%;
        z-index: 0;
        left: 12%;
        background: lightblue;
    }
</style>