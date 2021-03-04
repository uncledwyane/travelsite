<template>
    <div id="home">
        <el-carousel height="500px">
            <el-carousel-item v-for="(imgUrl, index) in bannerImgs" :key="index">
                <img :src="imgUrl" class="bannerImg" />
            </el-carousel-item>
        </el-carousel>
        <div class="youji-choose">
            <div class="youji-options">
                <div
                    class="youji-item"
                    v-for="option in youji"
                    :key="option.name"
                    :class="{
                        'youji-post': option.name == 'post',
                        'youji-active': option.name == currentOption,
                    }"
                    @click="selectOption(option)"
                >
                    {{ option.showName }}
                </div>
            </div>
        </div>
        <post v-show="currentOption == 'hot'"></post>
        <new v-show="currentOption == 'new'"></new>
        <push v-show="currentOption == 'post'"></push>
    </div>
</template>

<script>
import Post from "@/components/component/Post";
import New from "@/components/component/New";
import Push from "@/components/component/Push";

export default {
    data() {
        return {
            showLogin: true,
            currentOption: "hot",
            bannerImgs: [
                "https://s3.ax1x.com/2021/02/19/y4PkXF.jpg",
                "https://s3.ax1x.com/2021/02/19/y4PZ79.jpg",
                "https://s3.ax1x.com/2021/02/19/y4PmkR.jpg",
                "https://s3.ax1x.com/2021/02/19/y4PMp6.jpg",
            ],
            youji: [
                {
                    name: "hot",
                    showName: "全部攻略",
                },
                {
                    name: "new",
                    showName: "最新攻略",
                },
                {
                    name: "post",
                    showName: "发表攻略",
                },
            ],
        };
    },
    methods: {
        selectOption(option) {
            var self = this;
            self.currentOption = option.name;
        },
    },
    components: {
        Post,
        New,
        Push,
    },
};
</script>

<style lang="scss" scoped>
#home {
    width: 100%;
    height: auto;
    background: #fff;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
.youji-choose {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.youji-options {
    width: 30%;
    display: flex;
}
.youji-item {
    width: 33.3333%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.youji-item:hover {
    color: rgb(255, 123, 0);
    cursor: pointer;
}
.youji-active {
    color: rgb(255, 123, 0);
}
.bannerImg {
    width: 100%;
    position: relative;
    z-index: 0;
}
</style>
