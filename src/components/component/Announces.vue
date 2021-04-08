<template>
    <div class="announce">
        <el-input
            type="textarea"
            v-model="newAnnounceBody"
            :rows="5"
            style="width: 500px; margin-bottom: 20px"
        ></el-input>
        <el-button
            type="primary"
            style="width: 100px"
            :disabled="newAnnounceBody ? false : true"
            @click="modifyAnnounce"
            >修改公告</el-button
        >
    </div>
</template>

<script>
export default {
    data() {
        return {
            announces: null,
            newAnnounceBody: "",
        };
    },
    created() {
        var self = this;
        self.getAllAnnounces();
    },
    methods: {
        getAllAnnounces() {
            var self = this;
            self.$axios.get("/allannounces").then(function (res) {
                console.log("/allannounces", res.data.data);
                self.announces = res.data.data[0];
                self.newAnnounceBody = self.announces.announce_body;
            });
        },
        modifyAnnounce() {
            var self = this;
            if (!self.announces) {
                var params = {
                    announceBody: self.newAnnounceBody,
                };
                self.$axios.post("/pushannounce", params).then(function (res) {
                    console.log(res);
                });
                self.getAllAnnounces();
            } else {
                var params = {
                    announceBody: self.newAnnounceBody,
                    id: self.announces.announce_id,
                };
                self.$axios.post("/modifyannounce", params).then(function (res) {
                    console.log(res);
                    self.getAllAnnounces();
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.announce {
    width: 500px;
    display: flex;
    height: 500px;
    flex-direction: column;
}
</style>
