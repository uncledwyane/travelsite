<template>
    <div>
        <div class="all-carousel">
            <el-table :data="carousels" style="width: 100%" border stripe>
                <el-table-column label="图片链接">
                    <template slot-scope="scope">
                        <span>{{ scope.row.imgurl }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="160">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="add-carousel">
            <div class="items">
                <el-input v-model="newImgUrl" placeholder="请输入图片链接"></el-input>
                <div class="buttons">
                    <el-button type="primary" :disabled='newImgUrl? false : true' plain  @click="uploadImg">添加图片</el-button>
                    <el-button type="success" plain data-chevereto-pup-trigger=""  data-chevereto-pup-id="8c5970c8-bb94-4001-aa35-1a9d924a408d">上传图片</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            carousels: null,
            newImgUrl: ''
        };
    },
    created() {
        var self = this;
        self.getCarousels();
    },
    methods: {
        getCarousels(){
             var self = this;
            self.$axios.get("/allcarousel").then(function (res) {
                console.log("/allcarousel", res);
                self.carousels = res.data.data;
            });
        },
        handleDelete(index, row) {
            var self = this;
            console.log("handleDelete,", index, row);
            self.$confirm("此操作将永久删除该图片链接, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                    var params = {
                        imgUrl: row.imgurl,
                    };
                    self.$axios
                        .post("/deletecarousel", params)
                        .then(function (result) {
                            console.log("deletecarousel", result);
                            self.carousels.splice(index, 1);
                            self.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                        });
                })
                .catch(() => {
                    self.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        uploadImg(){
            var self = this;
            var params = {
                imgUrl: self.newImgUrl
            }
            self.$axios.post('/addcarousel', params).then(function (result){
                console.log('add carousel success!', result);
                self.getCarousels();
                self.newImgUrl = '';
            })
        }
    },
};
</script>

<style lang='scss' scoped>
    .add-carousel{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        height: 150px;
        margin-top: 30px;
        box-sizing: border-box;
        padding: 20px;
    }
    .items{
        width: 80%;
        height: 70%;
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    .buttons{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
    }
</style>
