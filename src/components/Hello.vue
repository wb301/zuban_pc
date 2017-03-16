<template>
    <div>
        <div class="container-body">
            <h1>欢迎使用租伴网后台管理系统V1.0</h1>
        </div>
        <div class="container-qrCode" v-if="isManager" id="qrCode"></div>
    </div>
</template>
<script>
export default {
    name: 'hello',
    data() {
        return {
            userInfo: NormalHelper.userInfo(),
            isManager: false
        }
    },
    mounted() {
        // this.isManager = this.userInfo.manager_type == 1 ? false : true;
        this.isManager = true;
        if(this.isManager){
            this.$nextTick(function () {
                require ('../lib/common/jquery.qrcode.min.js');
                this.qrcode();
            })
        }
    },
    methods: {
        qrcode() {
            $("#qrCode").qrcode({
                text: "https://weixin.zuban8.com/zuban_web/console/#/registered?region="+JSON.stringify([this.userInfo["region_code"],this.userInfo["region_name"]]),
                width:200,
                height:200
            })
        }
    },
}
</script>
<style lang="less" scoped>
.container-body {
    h1 {
        text-align: center;
    }
}
.container-qrCode {
    width: 100%;
    text-align: center;
    position: fixed;
    top: 200px;
    bottom: 300px;
    margin-left: -100px;
}
</style>
