<template>
  <div>
      <div id="search_tool">
          <input type="text" name="search" id="search_com" placeholder="Search for song,artists etc...">
          <i class="fa fa-search searchicon"></i>
      </div>
      <div id="notice_and_setting">
          <span class="notice"><i class="fa fa-bell" style="color: #9ea8c4;"></i></span>
          <span class="setting"><i class="fa fa-cog" style="color: #9ea8c4;"></i></span>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
    @import '../scss/theme.scss';
    #notice_and_setting{
        position: absolute;
        right: 20px;
    }
    .fa{
        font-size: 17px;
        transition: all ease .3s;
    }
    .fa:hover{
        cursor: pointer;
        color: $font-highlight-color-dark !important;
    }
    #search_com{
        width: 400px;
        border: 1px solid #616161;
        border-radius: 20px;
        padding: 5px 10px;
        background: rgb(117 117 117 / 10%);
        color: $font-highlight-color-dark;
        margin-left: 30px;
        height: 25px;
    }
    #search_com:focus{
        border-radius: 20px;
        color: $font-highlight-color-dark;
        outline-style: none;
        border: 1px solid#666666;
    }
    .searchicon{
        position: relative;
        right: 30px;
        color: #656565;
    }
    .notice{
        margin-right: 10px;
    }
</style>